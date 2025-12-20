document.addEventListener('DOMContentLoaded', () => {
    const dateEl = document.getElementById('date');
    const readingsContent = document.getElementById('readings-content');
    const questionsList = document.getElementById('questions-list');

    // Set today's date
    const today = new Date();
    dateEl.textContent = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    // Hardcoded readings for December 20, 2025
    function loadReadings() {
        const html = `
            <h3>Saturday of the Third Week of Advent</h3>
            
            <div class="reading">
                <h4>Reading 1: Isaiah 7:10-14</h4>
                <p>The LORD spoke to Ahaz:<br>
                Ask for a sign from the LORD, your God;<br>
                let it be deep as the nether world, or high as the sky!<br>
                But Ahaz answered,<br>
                “I will not ask! I will not tempt the LORD!”<br>
                Then Isaiah said:<br>
                Listen, O house of David!<br>
                Is it not enough for you to weary men,<br>
                must you also weary my God?<br>
                Therefore the Lord himself will give you this sign:<br>
                the virgin shall conceive and bear a son,<br>
                and shall name him Emmanuel.</p>
            </div>
            
            <div class="reading">
                <h4>Responsorial Psalm: Psalm 24:1-2, 3-4ab, 5-6</h4>
                <p><strong>R. (see 7c and 10b) Let the Lord enter; he is the king of glory.</strong><br><br>
                The LORD’s are the earth and its fullness;<br>
                the world and those who dwell in it.<br>
                For he founded it upon the seas<br>
                and established it upon the rivers.<br><br>
                <strong>R. Let the Lord enter; he is the king of glory.</strong><br><br>
                Who can ascend the mountain of the LORD?<br>
                or who may stand in his holy place?<br>
                He whose hands are sinless, whose heart is clean,<br>
                who desires not what is vain.<br><br>
                <strong>R. Let the Lord enter; he is the king of glory.</strong><br><br>
                He shall receive a blessing from the LORD,<br>
                a reward from God his savior.<br>
                Such is the race that seeks for him,<br>
                that seeks the face of the God of Jacob.<br><br>
                <strong>R. Let the Lord enter; he is the king of glory.</strong></p>
            </div>
            
            <div class="reading">
                <h4>Alleluia</h4>
                <p><strong>R. Alleluia, alleluia.</strong><br><br>
                O Key of David,<br>
                opening the gates of God's eternal Kingdom:<br>
                come and free the prisoners of darkness!<br><br>
                <strong>R. Alleluia, alleluia.</strong></p>
            </div>
            
            <div class="reading">
                <h4>Gospel: Luke 1:26-38</h4>
                <p>In the sixth month,<br>
                the angel Gabriel was sent from God<br>
                to a town of Galilee called Nazareth,<br>
                to a virgin betrothed to a man named Joseph,<br>
                of the house of David,<br>
                and the virgin’s name was Mary.<br>
                And coming to her, he said,<br>
                “Hail, full of grace! The Lord is with you.”<br>
                But she was greatly troubled at what was said<br>
                and pondered what sort of greeting this might be.<br>
                Then the angel said to her,<br>
                “Do not be afraid, Mary,<br>
                for you have found favor with God.<br>
                Behold, you will conceive in your womb and bear a son,<br>
                and you shall name him Jesus.<br>
                He will be great and will be called Son of the Most High,<br>
                and the Lord God will give him the throne of David his father,<br>
                and he will rule over the house of Jacob forever,<br>
                and of his Kingdom there will be no end.”<br><br>
                But Mary said to the angel,<br>
                “How can this be,<br>
                since I have no relations with a man?”<br>
                And the angel said to her in reply,<br>
                “The Holy Spirit will come upon you,<br>
                and the power of the Most High will overshadow you.<br>
                Therefore the child to be born<br>
                will be called holy, the Son of God.<br>
                And behold, Elizabeth, your relative,<br>
                has also conceived a son in her old age,<br>
                and this is the sixth month for her who was called barren;<br>
                for nothing will be impossible for God.”<br><br>
                Mary said, “Behold, I am the handmaid of the Lord.<br>
                May it be done to me according to your word.”<br>
                Then the angel departed from her.</p>
            </div>
        `;

        readingsContent.innerHTML = html;
    }

    // Reflection questions – general, focused on personal faith growth
    function loadQuestions() {
        const questions = [
            "What does Mary's response—'May it be done to me according to your word'—teach me about trusting God's will in my own life?",
            "The angel says 'Do not be afraid.' Where in my life right now might God be inviting me to greater trust and less fear?",
            "The reading speaks of 'Emmanuel—God with us.' How have I experienced God's presence recently?",
            "Mary 'pondered what sort of greeting this might be.' How can I make more space to ponder God's word in silence?",
            "The Psalm speaks of ascending the Lord's mountain with clean hands and a pure heart. What is one area where God might be calling me to greater purity or integrity?",
            "The Lord gives a sign even when Ahaz refuses to ask for one. How does this reveal God's initiative and generosity toward me?"
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
