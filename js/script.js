document.addEventListener('DOMContentLoaded', () => {
    const dateEl = document.getElementById('date');
    const readingsContent = document.getElementById('readings-content');
    const questionsList = document.getElementById('questions-list');

    // Set today's date
    const today = new Date();
    dateEl.textContent = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    // Hardcoded readings for December 21, 2025 – Fourth Sunday of Advent (quotes escaped)
    function loadReadings() {
        const html = `
            <h3>Fourth Sunday of Advent</h3>
            
            <div class="reading">
                <h4>Reading 1: Isaiah 7:10-14</h4>
                <p>The LORD spoke to Ahaz, saying:<br>
                Ask for a sign from the LORD, your God;<br>
                let it be deep as the netherworld, or high as the sky!<br>
                But Ahaz answered,<br>
                &quot;I will not ask! I will not tempt the LORD!&quot;<br>
                Then Isaiah said:<br>
                Listen, O house of David!<br>
                Is it not enough for you to weary people,<br>
                must you also weary my God?<br>
                Therefore the Lord himself will give you this sign:<br>
                the virgin shall conceive, and bear a son,<br>
                and shall name him Emmanuel.</p>
            </div>
            
            <div class="reading">
                <h4>Responsorial Psalm: Psalm 24:1-2, 3-4, 5-6</h4>
                <p>The LORD's are the earth and its fullness;<br>
                the world and those who dwell in it.<br>
                For he founded it upon the seas<br>
                and established it upon the rivers.<br><br>
                
                Who can ascend the mountain of the LORD?<br>
                or who may stand in his holy place?<br>
                One whose hands are sinless, whose heart is clean,<br>
                who desires not what is vain.<br><br>
                
                He shall receive a blessing from the LORD,<br>
                a reward from God his savior.<br>
                Such is the race that seeks for him,<br>
                that seeks the face of the God of Jacob.</p>
            </div>
            
            <div class="reading">
                <h4>Reading 2: Romans 1:1-7</h4>
                <p>Paul, a slave of Christ Jesus,<br>
                called to be an apostle and set apart for the gospel of God,<br>
                which he promised previously through his prophets in the holy Scriptures,<br>
                the gospel about his Son, descended from David according to the flesh,<br>
                but established as Son of God in power<br>
                according to the Spirit of holiness<br>
                through resurrection from the dead, Jesus Christ our Lord.<br>
                Through him we have received the grace of apostleship,<br>
                to bring about the obedience of faith,<br>
                for the sake of his name, among all the Gentiles,<br>
                among whom are you also, who are called to belong to Jesus Christ;<br>
                to all the beloved of God in Rome, called to be holy.<br>
                Grace to you and peace from God our Father<br>
                and the Lord Jesus Christ.</p>
            </div>
            
            <div class="reading">
                <h4>Alleluia</h4>
                <p>The virgin shall conceive, and bear a son,<br>
                and they shall name him Emmanuel.</p>
            </div>
            
            <div class="reading">
                <h4>Gospel: Matthew 1:18-24</h4>
                <p>This is how the birth of Jesus Christ came about.<br>
                When his mother Mary was betrothed to Joseph,<br>
                but before they lived together,<br>
                she was found with child through the Holy Spirit.<br>
                Joseph her husband, since he was a righteous man,<br>
                yet unwilling to expose her to shame,<br>
                decided to divorce her quietly.<br>
                Such was his intention when, behold,<br>
                the angel of the Lord appeared to him in a dream and said,<br>
                &quot;Joseph, son of David,<br>
                do not be afraid to take Mary your wife into your home.<br>
                For it is through the Holy Spirit<br>
                that this child has been conceived in her.<br>
                She will bear a son and you are to name him Jesus,<br>
                because he will save his people from their sins.&quot;<br>
                All this took place to fulfill<br>
                what the Lord had said through the prophet:<br>
                Behold, the virgin shall conceive and bear a son,<br>
                and they shall name him Emmanuel,<br>
                which means &quot;God is with us.&quot;<br>
                When Joseph awoke,<br>
                he did as the angel of the Lord had commanded him<br>
                and took his wife into his home.</p>
            </div>
        `;

        readingsContent.innerHTML = html;
    }

    // Reflection questions
    function loadQuestions() {
        const questions = [
            "Joseph planned to divorce Mary quietly to spare her shame, yet he obeyed the angel. Where might God be asking me to change my plans out of trust in Him?",
            "The angel tells Joseph 'do not be afraid.' What fears am I carrying today, and how can I entrust them to God?",
            "Today's readings repeatedly proclaim 'Emmanuel — God with us.' How have I sensed God's closeness in my life this Advent?",
            "Paul describes himself as 'called to belong to Jesus Christ.' How do I experience my own calling and belonging to Christ?",
            "The sign of the virgin conceiving points to God's initiative. How does this remind me that God often acts first in my life, even when I don't ask?",
            "Joseph awoke and did what the angel commanded. What is one concrete way I can respond more promptly to God's promptings today?"
        ];

        questionsList.innerHTML = '';
        questions.forEach(q => {
            const li = document.createElement('li');
            li.textContent = q;
            questionsList.appendChild(li);
        });
    }

    // Load everything
    loadReadings();
    loadQuestions();
});
    // New reflection questions – personal and faith-centered
    function loadQuestions() {
        const questions = [
            "Joseph planned to divorce Mary quietly to spare her shame, yet he obeyed the angel. Where might God be asking me to change my plans out of trust in Him?",
            "The angel tells Joseph 'do not be afraid.' What fears am I carrying today, and how can I entrust them to God?",
            "Today's readings repeatedly proclaim 'Emmanuel — God with us.' How have I sensed God's closeness in my life this Advent?",
            "Paul describes himself as 'called to belong to Jesus Christ.' How do I experience my own calling and belonging to Christ?",
            "The sign of the virgin conceiving points to God's initiative. How does this remind me that God often acts first in my life, even when I don't ask?",
            "Joseph awoke and did what the angel commanded. What is one concrete way I can respond more promptly to God's promptings today?"
        ];

        questionsList.innerHTML = '';
        questions.forEach(q => {
            const li = document.createElement('li');
            li.textContent = q;
            questionsList.appendChild(li);
        });
    }

    // Load everything on page load
    loadReadings();
    loadQuestions();
});
