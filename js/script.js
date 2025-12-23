document.addEventListener('DOMContentLoaded', () => {
    const dateEl = document.getElementById('date');
    const readingsContent = document.getElementById('readings-content');
    const questionsList = document.getElementById('questions-list');
    const themeBtn = document.getElementById('themeBtn');
    const audioSource = document.getElementById('audioSource');

    // Set today's date
    const today = new Date();
    dateEl.textContent = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    // Today's audio (update this line daily)
    const dailyAudioSrc = 'audio/ElevenLabs_2025-12-23T17_44_00_Brian_eleven_v3.mp3';

    // Set audio source
    if (audioSource) {
        audioSource.src = dailyAudioSrc;
        document.querySelector('audio').load();
    }

    // Load readings for December 23, 2025
    function loadReadings() {
        const html = `
            <h3>Tuesday of the Fourth Week of Advent</h3>
            
            <div class="reading">
                <h4>Reading 1: Malachi 3:1-4, 23-24</h4>
                <p>Thus says the Lord GOD:<br>
                Lo, I am sending my messenger<br>
                to prepare the way before me;<br>
                And suddenly there will come to the temple<br>
                the LORD whom you seek,<br>
                And the messenger of the covenant whom you desire.<br>
                Yes, he is coming, says the LORD of hosts.<br>
                But who will endure the day of his coming?<br>
                And who can stand when he appears?<br>
                For he is like the refiner’s fire,<br>
                or like the fuller’s lye.<br>
                He will sit refining and purifying silver,<br>
                and he will purify the sons of Levi,<br>
                Refining them like gold or like silver<br>
                that they may offer due sacrifice to the LORD.<br>
                Then the sacrifice of Judah and Jerusalem<br>
                will please the LORD,<br>
                as in the days of old, as in years gone by.<br><br>
                
                Lo, I will send you<br>
                Elijah, the prophet,<br>
                Before the day of the LORD comes,<br>
                the great and terrible day,<br>
                To turn the hearts of the fathers to their children,<br>
                and the hearts of the children to their fathers,<br>
                Lest I come and strike the land with doom.</p>
            </div>
            
            <div class="reading">
                <h4>Responsorial Psalm: Psalm 25:4-5ab, 8-9, 10 and 14</h4>
                <p>R. Teach me your paths, O Lord.<br><br>
                Your ways, O LORD, make known to me;<br>
                teach me your paths,<br>
                Guide me in your truth and teach me,<br>
                for you are God my savior.<br><br>
                R. Teach me your paths, O Lord.<br><br>
                Good and upright is the LORD;<br>
                thus he shows sinners the way.<br>
                He guides the humble to justice,<br>
                he teaches the humble his way.<br><br>
                R. Teach me your paths, O Lord.<br><br>
                All the paths of the LORD are kindness and constancy<br>
                toward those who keep his covenant and his decrees.<br>
                The friendship of the LORD is with those who fear him,<br>
                and his covenant, for their instruction.<br><br>
                R. Teach me your paths, O Lord.</p>
            </div>
            
            <div class="reading">
                <h4>Alleluia</h4>
                <p>O Radiant Dawn,<br>
                splendor of eternal light and sun of justice:<br>
                come and shine on those who sit in darkness<br>
                and in the shadow of death.</p>
            </div>
            
            <div class="reading">
                <h4>Gospel: Luke 1:57-66</h4>
                <p>When the time arrived for Elizabeth to have her child<br>
                she gave birth to a son.<br>
                Her neighbors and relatives heard<br>
                that the Lord had shown his great mercy toward her,<br>
                and they rejoiced with her.<br>
                When they came on the eighth day to circumcise the child,<br>
                they were going to call him Zechariah after his father,<br>
                but his mother said in reply,<br>
                “No. He will be called John.”<br>
                But they answered her,<br>
                “There is no one among your relatives who has this name.”<br>
                So they made signs, asking his father what he wished him to be called.<br>
                He asked for a tablet and wrote, “John is his name,”<br>
                and all were amazed.<br>
                Immediately his mouth was opened, his tongue freed,<br>
                and he spoke blessing God.<br>
                Then fear came upon all their neighbors,<br>
                and all these matters were discussed<br>
                throughout the hill country of Judea.<br>
                All who heard these things took them to heart, saying,<br>
                “What, then, will this child be?”<br>
                For surely the hand of the Lord was with him.</p>
            </div>
        `;

        readingsContent.innerHTML = html;
    }

    // Reflection questions for today
    function loadQuestions() {
        const questions = [
            "The Lord promises to send a messenger to prepare the way. How is God preparing my heart this Advent for His coming?",
            "Malachi speaks of God as a refiner’s fire. What impurities in my life might God be inviting me to let Him purify?",
            "The psalm asks God to teach us His paths. What path is God showing me today, and how can I follow it more closely?",
            "The birth of John the Baptist brings joy and wonder. Where in my life am I experiencing God's mercy and new beginnings?",
            "Zechariah's tongue is freed when he obeys God. How does obedience to God's word bring freedom in my own life?",
            "The people wonder, 'What, then, will this child be?' What great things might God be calling me to in the future?"
        ];

        questionsList.innerHTML = '';
        questions.forEach(q => {
            const li = document.createElement('li');
            li.textContent = q;
            questionsList.appendChild(li);
        });
    }

    // Theme toggle
    themeBtn.addEventListener('click', () => {
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
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
