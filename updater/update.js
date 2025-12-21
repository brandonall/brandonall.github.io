const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const { ElevenLabsClient } = require('@elevenlabs/elevenlabs-js');

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

// Use a nice, deep male voice – you can change this later if you find a better ID
const VOICE_ID = 'JBFqnCBsd6RMkjVDRZzb';  // "Brian" – deep, resonant, comforting (common default; works well)

async function run() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const dateStr = `\( {year}- \){month}-${day}`;

  console.log(`Generating content for ${dateStr}`);

  // 1. Fetch readings
  const apiUrl = `https://cpbjr.github.io/catholic-readings-api/readings/\( {year}/ \){month}-${day}.json`;
  const res = await fetch(apiUrl);
  if (!res.ok) {
    console.error('Failed to fetch readings');
    return;
  }
  const data = await res.json();

  // Build clean HTML for readings
  let readingsHTML = `<h3>${data.title || 'Daily Readings'}</h3>`;

  if (data.readings.firstReading) {
    readingsHTML += `<div class="reading"><h4>Reading 1: \( {data.readings.firstReadingCitation}</h4><p> \){data.readings.firstReading.replace(/\n/g, '<br>')}</p></div>`;
  }
  if (data.readings.psalm) {
    const verses = data.readings.psalm.split('\n').filter(line => !line.trim().startsWith('R.')).join('<br>');
    readingsHTML += `<div class="reading"><h4>Responsorial Psalm: \( {data.readings.psalmCitation}</h4><p> \){verses}</p></div>`;
  }
  if (data.readings.secondReading) {
    readingsHTML += `<div class="reading"><h4>Reading 2: \( {data.readings.secondReadingCitation}</h4><p> \){data.readings.secondReading.replace(/\n/g, '<br>')}</p></div>`;
  }
  if (data.readings.alleluia) {
    readingsHTML += `<div class="reading"><h4>Alleluia</h4><p>${data.readings.alleluia.replace(/\n/g, '<br>')}</p></div>`;
  }
  if (data.readings.gospel) {
    readingsHTML += `<div class="reading"><h4>Gospel: \( {data.readings.gospelCitation}</h4><p> \){data.readings.gospel.replace(/\n/g, '<br>')}</p></div>`;
  }

  // Full text for audio and questions
  const fullText = [
    data.title,
    data.readings.firstReading,
    data.readings.psalm,
    data.readings.secondReading || '',
    data.readings.alleluia,
    data.readings.gospel
  ].filter(Boolean).join('\n\n');

  // 2. Generate reflection questions using Groq
  const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama3-8b-8192',
      messages: [{
        role: 'user',
        content: `Generate 6 short, personal, open-ended reflection questions for individual faith growth based on these Catholic Mass readings. Focus on trust, God's presence, gratitude, and personal response. Number them 1-6:\n\n${fullText.substring(0, 6000)}`
      }],
      max_tokens: 300
    })
  });
  const groqData = await groqRes.json();
  let questionsText = groqData.choices[0].message.content.trim();
  const questions = questionsText.split('\n').map(q => q.replace(/^\d+\.\s*/, '').trim()).filter(q => q.endsWith('?'));

  // 3. Generate ElevenLabs audio
  const eleven = new ElevenLabsClient({ apiKey: ELEVENLABS_API_KEY });
  const audioStream = await eleven.textToSpeech.stream(VOICE_ID, {
    text: fullText,
    modelId: 'eleven_multilingual_v2',
    optimizeStreamingLatency: 3
  });

  const audioPath = path.join(__dirname, '..', 'audio', `audio-${dateStr}.mp3`);
  const writeStream = fs.createWriteStream(audioPath);
  audioStream.pipe(writeStream);

  await new Promise((resolve, reject) => {
    writeStream.on('finish', resolve);
    writeStream.on('error', reject);
  });

  console.log('Audio saved');

  // 4. Write data/readings.js for client-side loading
  const dataJS = `
// Auto-generated on ${new Date().toISOString()}
const dailyData = {
  title: "${(data.title || 'Daily Readings').replace(/"/g, '\\"')}",
  readingsHTML: \`${readingsHTML.replace(/`/g, '\\`')}\`,
  questions: ${JSON.stringify(questions)},
  audioSrc: "audio/audio-${dateStr}.mp3"
};
`;

  fs.writeFileSync(path.join(__dirname, '..', 'data', 'readings.js'), dataJS);

  console.log('Daily update complete!');
}

run().catch(console.error);
