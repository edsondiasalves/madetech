export function initGymMockup(lang = 'pt-PT') {
  const container = document.getElementById('gym-mockup-container');
  if (!container) return;

  const mockTranslations = {
    'pt-PT': {
      status1: 'Aberto agora (até às 23:00)',
      status2: 'Aberto 24 Horas',
      status3: 'Fecha em breve (às 22:00)',
      filters: ['Todos', 'Limpeza', 'Equipamentos', 'Vestiários', 'Preço'],
      sub: '✨ Comunidade Best Gym + Google Reviews',
      reviewsText: 'avaliações',
      keys: {
        'Limpeza': 'Limpeza',
        'Equipamentos': 'Equipamentos',
        'Vestiários': 'Vestiários',
        'Simpatia': 'Simpatia',
        'Preço': 'Preço',
        'Estacionamento': 'Estacionamento'
      }
    },
    'pt-BR': {
      status1: 'Aberto agora (até às 23:00)',
      status2: 'Aberto 24 Horas',
      status3: 'Fecha em breve (às 22:00)',
      filters: ['Todos', 'Limpeza', 'Equipamentos', 'Vestiários', 'Preço'],
      sub: '✨ Comunidade Best Gym + Google Reviews',
      reviewsText: 'avaliações',
      keys: {
        'Limpeza': 'Limpeza',
        'Equipamentos': 'Equipamentos',
        'Vestiários': 'Vestiários',
        'Simpatia': 'Simpatia',
        'Preço': 'Preço',
        'Estacionamento': 'Estacionamento'
      }
    },
    'en': {
      status1: 'Open now (until 11:00 PM)',
      status2: 'Open 24/7',
      status3: 'Closing soon (at 10:00 PM)',
      filters: ['All', 'Cleanliness', 'Equipment', 'Lockers', 'Pricing'],
      sub: '✨ Best Gym Community + Google Reviews',
      reviewsText: 'reviews',
      keys: {
        'Limpeza': 'Cleanliness',
        'Equipamentos': 'Equipment',
        'Vestiários': 'Lockers',
        'Simpatia': 'Staff Vibe',
        'Preço': 'Pricing',
        'Estacionamento': 'Parking'
      }
    }
  };

  const t = mockTranslations[lang] || mockTranslations['pt-PT'];

  const gymsData = [
    {
      id: 'gym1',
      name: 'Fitness Club Central',
      status: t.status1,
      rating: '4.9',
      reviewsCount: '342',
      scores: {
        [t.keys['Limpeza']]: '4.9/5',
        [t.keys['Equipamentos']]: '5.0/5',
        [t.keys['Vestiários']]: '4.8/5',
        [t.keys['Simpatia']]: '4.9/5',
        [t.keys['Preço']]: '4.6/5',
        [t.keys['Estacionamento']]: '4.7/5'
      },
      pinPos: { top: '35%', left: '45%' }
    },
    {
      id: 'gym2',
      name: 'Metro Gym Premium',
      status: t.status2,
      rating: '4.8',
      reviewsCount: '512',
      scores: {
        [t.keys['Limpeza']]: '4.8/5',
        [t.keys['Equipamentos']]: '4.9/5',
        [t.keys['Vestiários']]: '4.7/5',
        [t.keys['Simpatia']]: '4.8/5',
        [t.keys['Preço']]: '4.5/5',
        [t.keys['Estacionamento']]: '4.2/5'
      },
      pinPos: { top: '65%', left: '75%' }
    },
    {
      id: 'gym3',
      name: 'Olympus Performance',
      status: t.status3,
      rating: '4.7',
      reviewsCount: '219',
      scores: {
        [t.keys['Limpeza']]: '4.7/5',
        [t.keys['Equipamentos']]: '4.8/5',
        [t.keys['Vestiários']]: '4.6/5',
        [t.keys['Simpatia']]: '4.7/5',
        [t.keys['Preço']]: '4.8/5',
        [t.keys['Estacionamento']]: '4.9/5'
      },
      pinPos: { top: '50%', left: '25%' }
    }
  ];

  let selectedGym = gymsData[0];
  let activeFilter = t.filters[0];

  const render = () => {
    container.innerHTML = `
      <div class="phone-frame">
        <div class="phone-notch"><div class="phone-notch-camera"></div></div>
        <div class="phone-status-bar">
          <span>09:41</span>
          <span>5G ⚡</span>
        </div>
        <div class="phone-content gym-app-screen">
          <div class="gym-map-viewport">
            <div class="gym-map-grid-bg"></div>
            ${gymsData.map(gym => `
              <div class="map-pin ${gym.id === selectedGym.id ? 'active' : ''}" 
                   style="top: ${gym.pinPos.top}; left: ${gym.pinPos.left};"
                   data-gym-id="${gym.id}">
                <div class="map-pin-inner">
                  📍 ${gym.rating}★
                </div>
              </div>
            `).join('')}
          </div>

          <div class="gym-app-controls">
            ${t.filters.map(c => `
              <button class="criteria-tag ${activeFilter === c ? 'active' : ''}" data-criteria="${c}">
                ${c}
              </button>
            `).join('')}
          </div>

          <div class="gym-card-detail">
            <div class="gym-card-header">
              <div class="gym-name">${selectedGym.name}</div>
              <div class="gym-status-badge">${selectedGym.status}</div>
            </div>

            <div class="gym-rating-bar">
              <span class="stars">★★★★★</span>
              <strong>${selectedGym.rating}</strong>
              <span style="color: #9ca3af; font-size: 0.7rem;">(${selectedGym.reviewsCount} ${t.reviewsText})</span>
            </div>

            <div style="font-size: 0.7rem; color: #818cf8; margin-top: 2px;">
              ${t.sub}
            </div>

            <div class="criteria-scores-grid">
              ${Object.entries(selectedGym.scores).map(([key, val]) => `
                <div class="score-mini">
                  <span style="color: #9ca3af;">${key}</span>
                  <strong style="color: #84cc16;">${val}</strong>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    // Add click listeners to map pins
    container.querySelectorAll('.map-pin').forEach(pin => {
      pin.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-gym-id');
        const found = gymsData.find(g => g.id === id);
        if (found) {
          selectedGym = found;
          render();
        }
      });
    });

    // Add click listeners to criteria filters
    container.querySelectorAll('.criteria-tag').forEach(tag => {
      tag.addEventListener('click', (e) => {
        activeFilter = e.currentTarget.getAttribute('data-criteria');
        render();
      });
    });
  };

  render();
}
