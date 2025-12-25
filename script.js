document.addEventListener('DOMContentLoaded', () => {
  console.log('Script started running');

  const dateEl = document.getElementById('date');
  const readingsContent = document.getElementById('readings-content');
  const questionsList = document.getElementById('questions-list');
  const themeBtn = document.getElementById('themeBtn');

  if (!dateEl || !readingsContent || !questionsList || !themeBtn) {
    console.error('CRITICAL: One or more DOM elements are missing. Check index.html IDs.');
    readingsContent.innerHTML = '<p>Error: Page structure broken. Missing required elements.</p>';
    return;
  }

  // Get today's date in YYYY-MM-DD
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const dateStr = `\( {year}- \){month}-${day}`;

  console.log('Calculated date string:', dateStr);

  // Display formatted date
  dateEl.textContent = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Fetch the JSON from repo
  const jsonUrl = `readings/${dateStr}.json`;
  console.log('Attempting to fetch:', jsonUrl);

  fetch(jsonUrl)
    .then(response => {
      console.log('Fetch response status:', response.status);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} - ${response.statusText}. File may not exist or repo path is wrong.`);
      }
      return response.json();
    })
    .then(data => {
      console.log('JSON loaded successfully:', data);

      // Display readings
      if (data.readingContent) {
        readingsContent.innerHTML = data.readingContent;
      } else {
        readingsContent.innerHTML = '<p>Readings content missing from JSON (no "readingContent" key).</p>';
      }

      // Display questions
      questionsList.innerHTML = '';
      if (data.output && Array.isArray(data.output.questions)) {
        data.output.questions.forEach(q => {
          const li = document.createElement('li');
          li.textContent = q;
          questionsList.appendChild(li);
        });
      } else {
        questionsList.innerHTML = '<li>No questions found (missing "output.questions" array in JSON).</li>';
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
      console.error('Fetch failed:', err.message);
      readingsContent.innerHTML = `
        <p><strong>Error loading today's content:</strong> ${err.message}</p>
        <p><strong>Expected file:</strong> readings/${dateStr}.json</p>
        <p><strong>Possible causes:</strong></p>
        <ul>
          <li>The file doesn't exist in the repo yet (n8n may not have pushed it).</li>
          <li>Wrong folder/path (check repo for exact location, e.g., data/ or root).</li>
          <li>GitHub Pages cache delay (try incognito or wait 5-10 min).</li>
          <li>Network issue (try mobile data vs Wi-Fi).</li>
        </ul>
        <p><strong>Debug tip:</strong> Open https://brandonall.github.io/readings/${dateStr}.json directly in a new tab.</p>
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
