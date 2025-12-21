const https = require('https');
const fs = require('fs');
const path = require('path');

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

const VOICE_ID = 'JBFqnCBsd6RMkjVDRZzb';  // Deep, comforting Brian voice

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'Accept': 'application/json' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode !== 200) reject(new Error(`HTTP ${res.statusCode}`));
        resolve(JSON.parse(data));
      });
    }).on('error', reject);
  });
}

function postJSON(url, body) {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      }
    };
    const req = https.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    });
    req.on('error', reject);
    req.write(JSON.stringify(body));
    req.end();
  });
}

function fetchAudio(url, body) {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json'
      }
    };
    const req = https.request(url, options, (res) => {
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
    const dateStr = `\( {year}- \){month}-${day}`;
    const audioFilename = `audio-${dateStr}.mp3`;

    console.log(`Updating for ${dateStr}`);

    // Fetch readings
    const data = await fetchJSON(`https://cpbjr.github.io/catholic-readings-api/readings/\( {year}/ \){month}-${day}.json`);

    let readingsHTML = `<h3>${data.title || 'Daily Readings'}</h3>`;

    const addReading = (citation, text) => {
      if (text) readingsHTML += `<div class="reading"><h4>\( {citation}</h4><p> \){text.replace(/\n/g, '<br>')}</p></div>`;
    };

    addReading(`Reading 1: ${data.readings.firstReadingCitation || ''}`, data.readings.firstReading);
    if (data.readings.psalm) {
      const verses = data.readings.psalm.split('\n').filter(l => !l.trim().startsWith('R.')).join('<br>');
      addReading(`Responsorial Psalm: ${data.readings.psalmCitation || ''}`, verses);
    }
    addReading(`Reading 2: ${data.readings.secondReadingCitation || ''}`, data.readings.secondReading);
    addReading('Alleluia', data.readings.alleluia);
    addReading(`Gospel: ${data.readings.gospelCitation || ''}`, data.readings.gospel);

    const fullText = Object.values(data.readings).filter(Boolean).join('\n\n');

    // Generate questions
    const groqData = await postJSON('https://api.groq.com/openai/v1/chat/completions', {
      model: 'llama3-8b-8192',
      messages: [{ role: 'user', content: `Generate 6 short, personal reflection questions for faith growth based on these readings. Number them 1-6:\n\n${fullText.substring(0, 6000)}` }],
      max_tokens: 300
    });
    const questionsText = groqData.choices[0]?.message?.content || '';
    const questions = questionsText.split('\n').map(q => q.replace(/^\d+\.\s*/, '').trim()).filter(q => q.endsWith('?'));

    // Generate audio
    const audioBuffer = await fetchAudio(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
      text: fullText,
      model_id: 'eleven_multilingual_v2',
      voice_settings: { stability: 0.75, similarity_boost: 0.85 }
    });
    fs.writeFileSync(path.join(__dirname, '..', 'audio', audioFilename), audioBuffer);

    // Write data/readings.js
    const dataJS = `const dailyData = { title: "\( {(data.title || '').replace(/"/g, '\\"')}", readingsHTML: \` \){readingsHTML.replace(/`/g, '\\`')}\`, questions: \( {JSON.stringify(questions)}, audioSrc: "audio/ \){audioFilename}" };`;
    fs.writeFileSync(path.join(__dirname, '..', 'data', 'readings.js'), dataJS);

    console.log('Daily update complete!');
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
})();
