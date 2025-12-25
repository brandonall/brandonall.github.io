document.addEventListener('DOMContentLoaded', () => {
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

  // Display formatted date
  dateEl.textContent = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Fetch the JSON from repo
  fetch(`readings/${dateStr}.json`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} - File not found or inaccessible`);
      }
      return response.json();
    })
    .then(data => {
      // Display readings
      readingsContent.innerHTML = data.readingContent || '<p>Readings content not available in JSON.</p>';

      // Display questions
      questionsList.innerHTML = '';
      if (data.output && Array.isArray(data.output.questions)) {
        data.output.questions.forEach(q => {
          const li = document.createElement('li');
          li.textContent = q;
          questionsList.appendChild(li);
        });
      } else {
        questionsList.innerHTML = '<li>No questions found in JSON.</li>';
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
      console.error('Fetch error:', err);
      readingsContent.innerHTML = `<p>Error loading today's content: \( {err.message}. Check if readings/ \){dateStr}.json exists in the repo.</p>`;
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
