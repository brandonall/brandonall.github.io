document.addEventListener('DOMContentLoaded', () => {
    const dateEl = document.getElementById('date');
    const readingsContent = document.getElementById('readings-content');
    const generateBtn = document.getElementById('generate-btn');
    const questionsList = document.getElementById('questions-list');

    // Set today's date
    const today = new Date();
    dateEl.textContent = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    // Better: Use a free JSON API for USCCB readings (no CORS issues!)
    async function loadReadings() {
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const year = today.getFullYear();
    const apiUrl = `https://cpbjr.github.io/catholic-readings-api/readings/\( {year}/ \){month}-${day}.json`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Not found');
        const data = await response.json();

        // Improved display with better formatting
        let html = `<h3>${data.title || 'Daily Readings'}</h3>`;
        
        if (data.readings.firstReadingCitation && data.readings.firstReading) {
            html += `<div class="reading"><h4>First Reading: \( {data.readings.firstReadingCitation}</h4><p> \){data.readings.firstReading.replace(/\n/g, '<br>')}</p></div>`;
        }
        if (data.readings.psalmCitation && data.readings.psalm) {
            html += `<div class="reading"><h4>Responsorial Psalm: \( {data.readings.psalmCitation}</h4><p> \){data.readings.psalm.replace(/\n/g, '<br>')}</p></div>`;
        }
        if (data.readings.alleluia) {
            html += `<div class="reading"><h4>Alleluia</h4><p>${data.readings.alleluia.replace(/\n/g, '<br>')}</p></div>`;
        }
        if (data.readings.gospelCitation && data.readings.gospel) {
            html += `<div class="reading"><h4>Gospel: \( {data.readings.gospelCitation}</h4><p> \){data.readings.gospel.replace(/\n/g, '<br>')}</p></div>`;
        }

        readingsContent.innerHTML = html;
    } catch (error) {
        // Fallback: Link directly to USCCB with a nicer message
        readingsContent.innerHTML = `
            <p>Having trouble loading the readings automatically today. No worries!</p>
            <p><strong><a href="https://bible.usccb.org/bible/readings/\( {month} \){day}${String(year).slice(-2)}.cfm" target="_blank">Click here to open today's readings on USCCB.org</a></strong></p>
            <p>We'll keep improving the auto-load – thanks for your patience! 🙏</p>
        `;
        console.error('Readings load error:', error);
    }
    }

    // Generate questions (placeholder – replace with real LLM later)
    async function generateQuestions() {
        questionsList.innerHTML = '<li>Loading thoughtful questions...</li>';

        // Extract text from readings for prompt (simple)
        const readingsText = readingsContent.textContent.substring(0, 3000);

        // Hardcoded great questions for today's Annunciation-themed readings (Dec 20, 2025)
        const questions = [
            "Mary responds with a total 'yes' to God despite not understanding everything. How can we practice saying 'yes' to God in our relationship, even when His plan feels uncertain?",
            "The reading calls Jesus 'Emmanuel – God with us.' How have we experienced God being 'with us' when we're together?",
            "The angel says 'Do not be afraid.' What fears (about dating, commitment, the future) might we be carrying, and how can we bring them to God together?",
            "Mary ponders everything in her heart. What from today's readings is God inviting us to ponder or treasure as a couple?",
            "The Psalm speaks of clean hands and a pure heart to ascend God's mountain. How can we support each other in growing in purity and holiness?",
            "God asks for a sign but gives one anyway out of love. How does this show God's initiative in our relationship – that He pursues us first?"
        ];

        questionsList.innerHTML = '';
        questions.forEach(q => {
            const li = document.createElement('li');
            li.textContent = q;
            questionsList.appendChild(li);
        });

        // Future: Uncomment for real OpenAI call (hide key in backend later)
        // const apiKey = 'YOUR_OPENAI_KEY';
        // const prompt = `Generate 6 open-ended, encouraging discussion questions for a young dating Catholic couple based on these readings: ${readingsText}. Focus on discernment, chastity, trust in God, and Christ-centered love.`;
        // fetch('https://api.openai.com/v1/chat/completions', { ... })
    }

    loadReadings();

    generateBtn.addEventListener('click', generateQuestions);
});
