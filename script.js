document.addEventListener('DOMContentLoaded', () => {
  console.log('Script loaded and running');

  const dateEl = document.getElementById('date');
  const readingsContent = document.getElementById('readings-content');
  const questionsList = document.getElementById('questions-list');
  const themeBtn = document.getElementById('themeBtn');

  // Get today's date in YYYY-MM-DD
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const dateStr = `\( {year}- \){month}-${day}`;

  console.log('Today's date string:', dateStr);

  // Display formatted date
  dateEl.textContent = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Fetch the JSON from repo
  const jsonUrl = `readings/${dateStr}.json`;
  console.log('Fetching from:', jsonUrl);

  fetch(jsonUrl, { cache: 'no-store' })  // Bypass cache
    .then(response => {
      console.log('Response status:', response.status);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} - ${response.statusText}. File may not exist or path is incorrect.`);
      }
      return response.json();
    })
    .then(data => {
      console.log('JSON data loaded:', data);

      // Display readings
      readingsContent.innerHTML = data.readingContent || '<p>No readingContent found in JSON.</p>';

      // Display questions
      questionsList.innerHTML = '';
      if (data.output && Array.isArray(data.output.questions)) {
        data.output.questions.forEach(q => {
          const li = document.createElement('li');
          li.textContent = q;
          questionsList.appendChild(li);
        });
      } else {
        questionsList.innerHTML = '<li>No questions found (missing output.questions array).</li>';
      }

      // Weekly review (if present)
      if (data.output && data.output.weeklyReview) {
        const weeklyDiv = document.createElement('div');
        weeklyDiv.innerHTML = `
          <h3>Weekly Bible Study</h3>
          <p><strong>Liturgical Context:</strong> ${data.output.weeklyReview.liturgicalContext || 'N/A'}</p>
          <p><strong>Interesting Facts:</strong> ${data.output.weeklyReview.interestingFacts?.join(', ') || 'N/A'}</p>
          <p><strong>Weekly Themes:</strong> ${data.output.weeklyReview.weeklyThemes?.join(', ') || 'N/A'}</p>
          <p><strong>Upcoming Week:</strong> ${data.output.weeklyReview.upcomingWeek || 'N/A'}</p>
          <p><strong>Scripture Connections:</strong> ${data.output.weeklyReview.scriptureConnections || 'N/A'}</p>
        `;
        document.querySelector('#readings').appendChild(weeklyDiv);
      }
    })
    .catch(err => {
      console.error('Full fetch error:', err);
      readingsContent.innerHTML = `
        <p><strong>Error loading today's content:</strong> ${err.message}</p>
        <p><strong>Expected URL:</strong> https://brandonall.github.io/readings/${dateStr}.json</p>
        <p><strong>Debug steps:</strong></p>
        <ul>
          <li>Open the URL above in a new tab — does it show JSON?</li>
          <li>If 404: n8n may have pushed to a different folder (e.g., data/ or root). Check repo.</li>
          <li>If blank/error: GitHub Pages delay — wait 5-10 min or hard refresh.</li>
          <li>Try incognito mode or different network (Wi-Fi vs mobile data).</li>
        </ul>
      `;
    });

  // Theme toggle
  themeBtn.addEventListener('click', () => {
    const html = document.documentElement;
    if (html.getAttribute('data-theme') === 'dark') {
      html.removeAttribute('data-theme');
      themeBtn.textContent = 'Dark Mode';
    } else {
      html.setAttribute('data-theme', 'dark');
      themeBtn.textContent = 'Light Mode';
    }
  });
});
