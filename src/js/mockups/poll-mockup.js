export function initPollMockup(lang = 'pt-PT') {
  const container = document.getElementById('poll-mockup-container');
  if (!container) return;

  const pollTranslations = {
    'pt-PT': {
      tag: '🔥 Pergunta do Dia #482',
      question: 'O trabalho remoto total devia ser um direito garantido por lei em funções digitais?',
      optionA: 'Sim, sem dúvida',
      optionB: 'Não, decide a empresa',
      registered: 'votos registados globalmente',
      breakdownTitle: '📊 Divisão Demográfica:',
      filters: [
        { id: 'all', label: 'Geral' },
        { id: 'gender', label: 'Género' },
        { id: 'age', label: 'Idade' },
        { id: 'continent', label: 'Continente' }
      ],
      demographics: {
        all: [
          { label: 'Homens', percent: '65%' },
          { label: 'Mulheres', percent: '71%' },
          { label: 'Jovens (18-29)', percent: '84%' },
          { label: 'Europa', percent: '72%' }
        ],
        gender: [
          { label: 'Feminino (A)', percent: '71%' },
          { label: 'Masculino (A)', percent: '65%' },
          { label: 'Não-binário (A)', percent: '88%' }
        ],
        age: [
          { label: '18 - 24 Anos (A)', percent: '86%' },
          { label: '25 - 40 Anos (A)', percent: '74%' },
          { label: '+41 Anos (A)', percent: '52%' }
        ],
        continent: [
          { label: 'Europa (A)', percent: '72%' },
          { label: 'América do Sul (A)', percent: '79%' },
          { label: 'América do Norte (A)', percent: '61%' }
        ]
      }
    },
    'pt-BR': {
      tag: '🔥 Pergunta do Dia #482',
      question: 'O trabalho remoto total deveria ser um direito garantido por lei em funções digitais?',
      optionA: 'Sim, sem dúvida',
      optionB: 'Não, decide a empresa',
      registered: 'votos registrados globalmente',
      breakdownTitle: '📊 Divisão Demográfica:',
      filters: [
        { id: 'all', label: 'Geral' },
        { id: 'gender', label: 'Gênero' },
        { id: 'age', label: 'Idade' },
        { id: 'continent', label: 'Continente' }
      ],
      demographics: {
        all: [
          { label: 'Homens', percent: '65%' },
          { label: 'Mulheres', percent: '71%' },
          { label: 'Jovens (18-29)', percent: '84%' },
          { label: 'Europa', percent: '72%' }
        ],
        gender: [
          { label: 'Feminino (A)', percent: '71%' },
          { label: 'Masculino (A)', percent: '65%' },
          { label: 'Não-binário (A)', percent: '88%' }
        ],
        age: [
          { label: '18 - 24 Anos (A)', percent: '86%' },
          { label: '25 - 40 Anos (A)', percent: '74%' },
          { label: '+41 Anos (A)', percent: '52%' }
        ],
        continent: [
          { label: 'Europa (A)', percent: '72%' },
          { label: 'América do Sul (A)', percent: '79%' },
          { label: 'América do Norte (A)', percent: '61%' }
        ]
      }
    },
    'en': {
      tag: '🔥 Question of the Day #482',
      question: 'Should 100% remote work be a legally guaranteed right for digital roles?',
      optionA: 'Yes, absolutely',
      optionB: "No, employer's choice",
      registered: 'votes registered globally',
      breakdownTitle: '📊 Demographic Breakdown:',
      filters: [
        { id: 'all', label: 'Overview' },
        { id: 'gender', label: 'Gender' },
        { id: 'age', label: 'Age' },
        { id: 'continent', label: 'Continent' }
      ],
      demographics: {
        all: [
          { label: 'Men', percent: '65%' },
          { label: 'Women', percent: '71%' },
          { label: 'Youth (18-29)', percent: '84%' },
          { label: 'Europe', percent: '72%' }
        ],
        gender: [
          { label: 'Female (A)', percent: '71%' },
          { label: 'Male (A)', percent: '65%' },
          { label: 'Non-binary (A)', percent: '88%' }
        ],
        age: [
          { label: '18 - 24 Yrs (A)', percent: '86%' },
          { label: '25 - 40 Yrs (A)', percent: '74%' },
          { label: '41+ Yrs (A)', percent: '52%' }
        ],
        continent: [
          { label: 'Europe (A)', percent: '72%' },
          { label: 'South America (A)', percent: '79%' },
          { label: 'North America (A)', percent: '61%' }
        ]
      }
    }
  };

  const t = pollTranslations[lang] || pollTranslations['pt-PT'];

  const pollData = {
    question: t.question,
    totalVotes: 142850,
    optionA: t.optionA,
    optionB: t.optionB,
    votesA: 95710,
    votesB: 47140,
    userVoted: null, // 'A' or 'B'
    currentFilter: 'all'
  };

  const render = () => {
    const total = pollData.totalVotes + (pollData.userVoted ? 1 : 0);
    const votesA = pollData.votesA + (pollData.userVoted === 'A' ? 1 : 0);
    const votesB = pollData.votesB + (pollData.userVoted === 'B' ? 1 : 0);

    const percentA = Math.round((votesA / total) * 100);
    const percentB = 100 - percentA;

    const currentDemoList = t.demographics[pollData.currentFilter] || t.demographics.all;

    container.innerHTML = `
      <div class="phone-frame">
        <div class="phone-notch"><div class="phone-notch-camera"></div></div>
        <div class="phone-status-bar">
          <span>12:00</span>
          <span>5G ⚡</span>
        </div>
        <div class="phone-content poll-app-screen">
          <div class="poll-tag-header">
            <span>${t.tag}</span>
          </div>

          <div class="poll-question-box">
            "${pollData.question}"
          </div>

          <div class="poll-options">
            <button class="poll-option-btn ${pollData.userVoted === 'A' ? 'selected' : ''}" data-option="A">
              <div class="poll-progress-fill" style="width: ${percentA}%;"></div>
              <span class="poll-option-text">A. ${pollData.optionA}</span>
              <span class="poll-percent">${percentA}%</span>
            </button>

            <button class="poll-option-btn ${pollData.userVoted === 'B' ? 'selected' : ''}" data-option="B">
              <div class="poll-progress-fill" style="width: ${percentB}%;"></div>
              <span class="poll-option-text">B. ${pollData.optionB}</span>
              <span class="poll-percent">${percentB}%</span>
            </button>
          </div>

          <div style="font-size: 0.7rem; color: #9ca3af; text-align: center; margin-top: 2px;">
            🗳️ ${total.toLocaleString()} ${t.registered}
          </div>

          <div style="margin-top: 6px; font-weight: 700; font-size: 0.75rem; color: #ffffff;">
            ${t.breakdownTitle}
          </div>

          <div class="demographics-filter-bar">
            ${t.filters.map(f => `
              <button class="demo-filter-btn ${pollData.currentFilter === f.id ? 'active' : ''}" data-filter="${f.id}">
                ${f.label}
              </button>
            `).join('')}
          </div>

          <div class="demo-breakdown-chart">
            ${currentDemoList.map(item => `
              <div class="demo-row">
                <span class="demo-label">${item.label}</span>
                <div class="demo-bar-wrap">
                  <div class="demo-bar-fill" style="width: ${item.percent};"></div>
                </div>
                <strong style="color: #84cc16; width: 32px; text-align: right;">${item.percent}</strong>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    // Add voting click handlers
    container.querySelectorAll('.poll-option-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const option = e.currentTarget.getAttribute('data-option');
        pollData.userVoted = option;
        render();
      });
    });

    // Add demographic filter handlers
    container.querySelectorAll('.demo-filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        pollData.currentFilter = e.currentTarget.getAttribute('data-filter');
        render();
      });
    });
  };

  render();
}
