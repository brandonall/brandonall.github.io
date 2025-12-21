document.addEventListener('DOMContentLoaded', function() {
    const dateEl = document.getElementById('date');
    const readingsContent = document.getElementById('readings-content');
    const questionsList = document.getElementById('questions-list');
    const audioSource = document.querySelector('audio source');

    const today = new Date();
    dateEl.textContent = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    // Load auto-generated daily content
    const script = document.createElement('script');
    script.src = 'data/readings.js?v=' + Date.now();  // cache bust
    script.onload = function() {
        readingsContent.innerHTML = dailyData.readingsHTML;
        audioSource.src = dailyData.audioSrc;
        document.querySelector('audio').load();  // reload audio player

        dailyData.questions.forEach(q => {
            const li = document.createElement('li');
            li.textContent = q;
            questionsList.appendChild(li);
        });
    };
    document.head.appendChild(script);
});
