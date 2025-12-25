document.addEventListener('DOMContentLoaded', () => {
    const dateEl = document.getElementById('date');
    const readingsContent = document.getElementById('readings-content');
    const questionsList = document.getElementById('questions-list');
    const themeBtnHeader = document.getElementById('themeBtnHeader');
    const themeIconHeader = document.getElementById('themeIconHeader');
    const audioSource = document.getElementById('audioSource');

    // Set today's date
    const today = new Date();
    dateEl.textContent = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    // Today's audio file (update this line each day)
    const dailyAudioSrc = 'audio/ElevenLabs_2025-12-24T12_15_38_Brian_eleven_v3.mp3';

    // Set audio source dynamically
    if (audioSource) {
        audioSource.src = dailyAudioSrc;
        document.querySelector('audio').load();
    }

    // Load readings for December 24, 2025 – Christmas Eve
    function loadReadings() {
        const html = `
            <h3>Christmas Eve</h3>
            
            <div class="reading">
                <h4>Reading 1: 2 Samuel 7:1-5, 8b-12, 14a, 16</h4>
                <p>When King David was settled in his palace,<br>
                and the LORD had given him rest from his enemies on every side,<br>
                he said to Nathan the prophet,<br>
                “Here I am living in a house of cedar,<br>
                while the ark of God dwells in a tent!”<br>
                Nathan answered the king,<br>
                “Go, do whatever you have in mind,<br>
                for the LORD is with you.”<br>
                But that night the LORD spoke to Nathan and said:<br>
                “Go, tell my servant David, ‘Thus says the LORD:<br>
                Should you build me a house to dwell in?<br>
                I took you from the pasture, from following the sheep,<br>
                to be commander of my people Israel.<br>
                I have been with you wherever you went,<br>
                and I have destroyed all your enemies before you.<br>
                I will fix a place for my people Israel;<br>
                I will plant them so that they may dwell in their place<br>
                without further disturbance.<br>
                Neither shall the wicked continue to afflict them as they did of old,<br>
                since the time I first appointed judges over my people Israel.<br>
                I will give you rest from all your enemies.<br>
                The LORD also reveals to you<br>
                that he will establish a house for you.<br>
                I will raise up your heir after you, sprung from your loins,<br>
                and I will make firm his kingdom.<br>
                I will be a father to him,<br>
                and he shall be a son to me.<br>
                Your house and your kingdom shall endure forever before me;<br>
                your throne shall stand firm forever.’”</p>
            </div>
            
            <div class="reading">
                <h4>Responsorial Psalm: Psalm 89:2-3, 4-5, 27 and 29</h4>
                <p>R. Forever I will sing the goodness of the Lord.<br><br>
                The favors of the LORD I will sing forever;<br>
                through all generations my mouth shall proclaim your faithfulness.<br>
                For you have said, “My kindness is established forever”;<br>
                in heaven you have confirmed your faithfulness.<br><br>
                R. Forever I will sing the goodness of the Lord.<br><br>
                “I have made a covenant with my chosen one,<br>
                I have sworn to David my servant:<br>
                Forever will I confirm your posterity<br>
                and establish your throne for all generations.”<br><br>
                R. Forever I will sing the goodness of the Lord.<br><br>
                “He shall say of me, ‘You are my father,<br>
                my God, the rock, my savior.’<br>
                Forever I will maintain my kindness toward him,<br>
                and establish my covenant with him.”<br><br>
                R. Forever I will sing the goodness of the Lord.</p>
            </div>
            
            <div class="reading">
                <h4>Alleluia</h4>
                <p>O Radiant Dawn,<br>
                splendor of eternal light and sun of justice:<br>
                come and shine on those who sit in darkness<br>
                and in the shadow of death.</p>
            </div>
            
            <div class="reading">
                <h4>Gospel: Luke 1:67-79</h4>
                <p>Zechariah his father, filled with the Holy Spirit, prophesied, saying:<br>
                “Blessed be the Lord, the God of Israel;<br>
                for he has come to his people and set them free.<br>
                He has raised up for us a mighty savior,<br>
                born of the house of his servant David.<br>
                Through his prophets he promised of old<br>
                that he would save us from our enemies,<br>
                from the hands of all who hate us.<br>
                He promised to show mercy to our fathers<br>
                and to remember his holy covenant.<br>
                This was the oath he swore to our father Abraham:<br>
                to set us free from the hand of our enemies,<br>
                free to worship him without fear,<br>
                holy and righteous in his sight<br>
                all the days of our life.<br>
                You, my child, shall be called the prophet of the Most High,<br>
                for you will go before the Lord to prepare his way,<br>
                to give his people knowledge of salvation<br>
                by the forgiveness of their sins.<br>
                In the tender compassion of our God<br>
                the dawn from on high shall break upon us,<br>
                to shine on those who dwell in darkness and the shadow of death,<br>
                and to guide our feet into the way of peace.”</p>
            </div>
        `;

        readingsContent.innerHTML = html;
    }

    // Reflection questions for today
    function loadQuestions() {
        const questions = [
            "David wanted to build a house for God, but God promised to build a house for David. How does God often turn our plans around to give us something greater?",
            "The psalm sings of God's eternal covenant with David. How do I see God's faithfulness and promises at work in my own life?",
            "Zechariah's prophecy praises God for raising up a savior. In what ways has God brought salvation or freedom to me this Advent?",
            "The Benedictus speaks of guiding our feet into the way of peace. What steps can I take today to walk more closely in God's path of peace?",
            "God promises to be a father to His people. How can I open my heart more to God's fatherly love and care?",
            "The dawn from on high shall break upon us. What darkness in my life is God inviting me to let His light shine into this Christmas?"
        ];

        questionsList.innerHTML = '';
        questions.forEach(q => {
            const li = document.createElement('li');
            li.textContent = q;
            questionsList.appendChild(li);
        });
    }

    // Theme toggle (main button in header)
    themeBtn.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            themeBtn.textContent = 'Dark Mode';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeBtn.textContent = 'Light Mode';
        }
    });

    // Load content
    loadReadings();
    loadQuestions();
});
