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
        const url = `https://cpbjr.github.io/catholic-readings-api/readings/2025/\( {month}- \){day}.json`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            let html = `
                <h3>${data.title || 'Saturday of the Third Week of Advent'}</h3>
                <div class="reading"><h4>First Reading: \( {data.readings.firstReadingCitation}</h4><p> \){data.readings.firstReading}</p></div>
                <div class="reading"><h4>Responsorial Psalm: \( {data.readings.psalmCitation}</h4><p> \){data.readings.psalm}</p></div>
                <div class="reading"><h4>Alleluia</h4><p>${data.readings.alleluia}</p></div>
                <div class="reading"><h4>Gospel: \( {data.readings.gospelCitation}</h4><p> \){data.readings.gospel}</p></div>
            `;
            readingsContent.innerHTML = html;
        } catch (error) {
            readingsContent.innerHTML = '<p>Unable to load readings today. Visit <a href="https://bible.usccb.org/daily-bible-reading">USCCB.org</a> directly.</p>';
            console.error(error);
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
