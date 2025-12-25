document.addEventListener('DOMContentLoaded', () => {
    const dateEl = document.getElementById('date');
    const readingsContent = document.getElementById('readings-content');
    const questionsList = document.getElementById('questions-list');
    const themeBtn = document.getElementById('themeBtn');

    // Set today's date
    const today = new Date();
    dateEl.textContent = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    // Load readings for December 25, 2025 – Christmas Day (Mass During the Day)
    function loadReadings() {
        const html = `
            <h3>The Nativity of the Lord – Christmas Day (Mass During the Day)</h3>
            
            <div class="reading">
                <h4>Reading 1: Isaiah 52:7-10</h4>
                <p>How beautiful upon the mountains<br>
                are the feet of him who brings glad tidings,<br>
                announcing peace, bearing good news,<br>
                announcing salvation, and saying to Zion,<br>
                “Your God is King!”<br><br>
                
                Hark! Your sentinels raise a cry,<br>
                together they shout for joy,<br>
                for they see directly, before their eyes,<br>
                the LORD restoring Zion.<br>
                Break out together in song,<br>
                O ruins of Jerusalem!<br>
                For the LORD comforts his people,<br>
                he redeems Jerusalem.<br>
                The LORD has bared his holy arm<br>
                in the sight of all the nations;<br>
                all the ends of the earth will behold<br>
                the salvation of our God.</p>
            </div>
            
            <div class="reading">
                <h4>Responsorial Psalm: Psalm 98:1, 2-3, 3-4, 5-6</h4>
                <p>R. All the ends of the earth have seen the salvation of our God.<br><br>
                Sing to the LORD a new song,<br>
                for he has done wondrous deeds;<br>
                His right hand has won victory for him,<br>
                his holy arm.<br><br>
                R. All the ends of the earth have seen the salvation of our God.<br><br>
                The LORD has made his salvation known:<br>
                in the sight of the nations he has revealed his justice.<br>
                He has remembered his kindness and his faithfulness<br>
                toward the house of Israel.<br><br>
                R. All the ends of the earth have seen the salvation of our God.<br><br>
                All the ends of the earth have seen<br>
                the salvation by our God.<br>
                Sing joyfully to the LORD, all you lands;<br>
                break into song; sing praise.<br><br>
                R. All the ends of the earth have seen the salvation of our God.<br><br>
                Sing praise to the LORD with the harp,<br>
                with the harp and melodious song.<br>
                With trumpets and the sound of the horn<br>
                sing joyfully before the King, the LORD.<br><br>
                R. All the ends of the earth have seen the salvation of our God.</p>
            </div>
            
            <div class="reading">
                <h4>Reading 2: Hebrews 1:1-6</h4>
                <p>Brothers and sisters:<br>
                In times past, God spoke in partial and various ways<br>
                to our ancestors through the prophets;<br>
                in these last days, he has spoken to us through the Son,<br>
                whom he made heir of all things<br>
                and through whom he created the universe,<br>
                who is the refulgence of his glory,<br>
                the very imprint of his being,<br>
                and who sustains all things by his mighty word.<br>
                When he had accomplished purification from sins,<br>
                he took his seat at the right hand of the Majesty on high,<br>
                as far superior to the angels<br>
                as the name he has inherited is more excellent than theirs.<br><br>
                
                For to which of the angels did God ever say:<br>
                You are my son; this day I have begotten you?<br>
                Or again:<br>
                I will be a father to him, and he shall be a son to me?<br>
                And again, when he leads the firstborn into the world, he says:<br>
                Let all the angels of God worship him.</p>
            </div>
            
            <div class="reading">
                <h4>Alleluia</h4>
                <p>A holy day has dawned upon us.<br>
                Come, you nations, and adore the Lord.<br>
                For today a great light has come upon the earth.</p>
            </div>
            
            <div class="reading">
                <h4>Gospel: John 1:1-18</h4>
                <p>In the beginning was the Word,<br>
                and the Word was with God,<br>
                and the Word was God.<br>
                He was in the beginning with God.<br>
                All things came to be through him,<br>
                and without him nothing came to be.<br>
                What came to be through him was life,<br>
                and this life was the light of the human race;<br>
                the light shines in the darkness,<br>
                and the darkness has not overcome it.<br><br>
                
                A man named John was sent from God.<br>
                He came for testimony, to testify to the light,<br>
                so that all might believe through him.<br>
                He was not the light,<br>
                but came to testify to the light.<br>
                The true light, which enlightens everyone, was coming into the world.<br><br>
                
                He was in the world,<br>
                and the world came to be through him,<br>
                but the world did not know him.<br>
                He came to what was his own,<br>
                but his own people did not accept him.<br><br>
                
                But to those who did accept him<br>
                he gave power to become children of God,<br>
                to those who believe in his name,<br>
                who were born not by natural generation<br>
                nor by human choice nor by a man’s decision<br>
                but of God.<br><br>
                
                And the Word became flesh<br>
                and made his dwelling among us,<br>
                and we saw his glory,<br>
                the glory as of the Father’s only Son,<br>
                full of grace and truth.<br><br>
                
                John testified to him and cried out, saying,<br>
                “This was he of whom I said,<br>
                ‘The one who is coming after me ranks ahead of me<br>
                because he existed before me.’”<br>
                From his fullness we have all received,<br>
                grace in place of grace,<br>
                because while the law was given through Moses,<br>
                grace and truth came through Jesus Christ.<br>
                No one has ever seen God.<br>
                The only Son, God, who is at the Father’s side,<br>
                has revealed him.</p>
            </div>
        `;

        readingsContent.innerHTML = html;
    }

    // Reflection questions for Christmas Day
    function loadQuestions() {
        const questions = [
            "The Word became flesh and dwelt among us. How does the Incarnation make God's love feel more real and personal to me today?",
            "Isaiah proclaims the good news of salvation. What 'glad tidings' of hope or peace is God speaking into my life this Christmas?",
            "The psalm calls all nations to see God's salvation. How can I share the joy of Christ's birth with others this season?",
            "Hebrews describes Jesus as the exact imprint of God's being. In what ways do I see God's nature reflected in Jesus' life and actions?",
            "The light shines in the darkness, and the darkness has not overcome it. What darkness in my life is God inviting His light to overcome this Christmas?",
            "The Gospel ends with 'grace and truth came through Jesus Christ.' How can I embrace both grace and truth more deeply in my daily walk with God?"
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
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
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
