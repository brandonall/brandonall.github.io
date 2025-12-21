const https = require('https');
const fs = require('fs');
const path = require('path');

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const GROK_API_KEY = process.env.GROK_API_KEY;

const VOICE_ID = 'JBFqnCBsd6RMkjVDRZzb';  // Deep, resonant Brian voice

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'Accept': 'application/json' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function postJSON(url, body, apiKey) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname,
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + apiKey,
        'Content-Type': 'application/json'
      }
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.write(JSON.stringify(body));
    req.end();
  });
}

function fetchAudio(url, body) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      method: 'POST',
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg'
      }
    };
    const req = https.request(options, (res) => {
      if (res.statusCode !== 200) return reject(new Error(`ElevenLabs HTTP ${res.statusCode}`));
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    });
    req.on('error', reject);
    req.write(JSON.stringify(body));
    req.end();
  });
}

(async () => {
  try {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const dateStr = year + '-' + month + '-' + day;
    const audioFilename = 'audio-' + dateStr + '.mp3';

    console.log('Updating for ' + dateStr);

    const baseApi = 'https://cpbjr.github.io/catholic-readings-api/readings/';
    const datePath = year + '/' + month + '-' + day + '.json';
    const apiUrl = baseApi + datePath;
    console.log('Fetching from: ' + apiUrl);

    const data = await fetchJSON(apiUrl);

    let readingsHTML = '<h3>' + (data.title || 'Daily Readings') + '</h3>';

    const addReading = (citation, text) => {
      if (text) {
        const cleanedText = text.replace(/\n/g, '<br>');
        readingsHTML += '<div class="reading"><h4>' + citation + '</h4><p>' + cleanedText + '</p></div>';
      }
    };

    addReading('Reading 1: ' + (data.readings.firstReadingCitation || ''), data.readings.firstReading);
    if (data.readings.psalm) {
      const verses = data.readings.psalm.split('\n').filter(l => !l.trim().startsWith('R.')).join('<br>');
      addReading('Responsorial Psalm: ' + (data.readings.psalmCitation || ''), verses);
    }
    addReading('Reading 2: ' + (data.readings.secondReadingCitation || ''), data.readings.secondReading);
    addReading('Alleluia', data.readings.alleluia);
    addReading('Gospel: ' + (data.readings.gospelCitation || ''), data.readings.gospel);

    const fullText = Object.values(data.readings).filter(Boolean).join('\n\n');

    // Generate questions using Grok API
    const grokData = await postJSON('https://api.x.ai/v1/chat/completions', {
      model: 'grok-beta',
      messages: [{ role: 'user', content: 'Generate 6 short, personal reflection questions for individual faith growth based on these Catholic Mass readings. Focus on trust, God's presence, gratitude, and personal response. Number them 1-6:\n\n' + fullText.substring(0, 6000) }],
      max_tokens: 300,
      temperature: 0.7
    }, GROK_API_KEY);

    const questionsText = grokData.choices && grokData.choices[0] ? grokData.choices[0].message.content : '';
    const questions = questionsText.split('\n')
      .map(q => q.replace(/^\d+\.\s*/, '').trim())
      .filter(q => q.endsWith('?'));

    // Fallback if Grok fails (rare)
    if (questions.length < 4) {
      questions = [
        "How does today's Gospel speak to my heart?",
        "What is God inviting me to trust Him with today?",
        "Where do I see 'God with us' in my life?",
        "How can I respond to God's call like Joseph or Mary?",
        "What fear is the angel telling me 'do not be afraid' about?",
        "How can I prepare my heart more for Christmas?"
      ];
    }

    const audioBuffer = await fetchAudio('https://api.elevenlabs.io/v1/text-to-speech/' + VOICE_ID, {
      text: fullText,
      model_id: 'eleven_multilingual_v2',
      voice_settings: { stability: 0.75, similarity_boost: 0.85 }
    });
    const audioPath = path.join(__dirname, '..', 'audio', audioFilename);
    fs.writeFileSync(audioPath, audioBuffer);

    const escapedTitle = (data.title || '').replace(/"/g, '\\"');
    const escapedHTML = readingsHTML.replace(/`/g, '\\`');
    const dataJS = 'const dailyData = {\n  title: "' + escapedTitle + '",\n  readingsHTML: `' + escapedHTML + '`,\n  questions: ' + JSON.stringify(questions) + ',\n  audioSrc: "audio/' + audioFilename + '"\n};';

    const dataPath = path.join(__dirname, '..', 'data', 'readings.js');
    fs.writeFileSync(dataPath, dataJS);

    console.log('Daily update complete!');
  } catch (err) {
    console.error('Error:', err.message || err);
    process.exit(1);
  }
})();
