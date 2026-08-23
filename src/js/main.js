import { translations } from './i18n/translations.js';
import { initGymMockup } from './mockups/gym-mockup.js';
import { initPollMockup } from './mockups/poll-mockup.js';

const CONTACT_EMAIL = 'suporte@madetech.app';
const FORM_ENDPOINT = '';

let currentLang = localStorage.getItem('madetech_lang') || 'pt-PT';
let currentTheme = localStorage.getItem('madetech_theme') || 'dark';

document.addEventListener('DOMContentLoaded', () => {
  initIconSprite();
  initTheme();
  initI18n();
  initNavbarScroll();
  initModals();
});

/* Inline SVG Icon Sprite */
const ICON_PATHS = {
  map: '<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>',
  chart: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
  trophy: '<circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>',
  star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  globe: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  flame: '<path d="M12 2c1 4-4 6-4 10a4 4 0 0 0 8 0c0-1-.5-2-1-3 3 1 5 3.5 5 7a8 8 0 1 1-16 0C4 9 10 7 12 2z"/>',
  trend: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
  bulb: '<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.4 1 2.3h6c0-.9.4-1.8 1-2.3A7 7 0 0 0 12 2z"/>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  scale: '<line x1="12" y1="3" x2="12" y2="21"/><path d="M5 7l-3 6a3.5 3.5 0 0 0 6 0L5 7zM19 7l-3 6a3.5 3.5 0 0 0 6 0l-3-6z"/><line x1="4" y1="21" x2="20" y2="21"/><line x1="2" y1="7" x2="22" y2="7"/>',
  sparkle: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z"/><path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15z"/>',
  key: '<path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>',
  gem: '<path d="M6 3h12l4 6-10 12L2 9z"/><path d="M2 9h20M12 3l-3 6 3 12 3-12-3-6z"/>',
  drop: '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>'
};

function initIconSprite() {
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('style', 'position:absolute;width:0;height:0;overflow:hidden');
  svg.setAttribute('aria-hidden', 'true');
  svg.innerHTML = Object.entries(ICON_PATHS)
    .map(([id, p]) => `<symbol id="i-${id}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${p}</symbol>`)
    .join('');
  document.body.prepend(svg);
}

function icon(name) {
  return `<svg class="icon-svg" aria-hidden="true"><use href="#i-${name}"></use></svg>`;
}

/* Theme Switcher Engine */
function initTheme() {
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon();

  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', currentTheme);
      localStorage.setItem('madetech_theme', currentTheme);
      updateThemeIcon();
    });
  }
}

function updateThemeIcon() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.innerHTML = currentTheme === 'dark' ? '🌙' : '☀️';
  }
}

/* i18n Switcher Engine */
function initI18n() {
  applyTranslations(currentLang);

  const langBtn = document.getElementById('lang-btn');
  const langDropdown = document.getElementById('lang-dropdown');

  if (langBtn && langDropdown) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle('show');
    });

    document.addEventListener('click', () => {
      langDropdown.classList.remove('show');
    });

    langDropdown.querySelectorAll('.lang-option').forEach(opt => {
      opt.addEventListener('click', (e) => {
        const lang = e.currentTarget.getAttribute('data-lang');
        if (lang && translations[lang]) {
          currentLang = lang;
          localStorage.setItem('madetech_lang', currentLang);
          applyTranslations(currentLang);
          updateLangButtonLabel(lang);
        }
        langDropdown.classList.remove('show');
      });
    });
  }
}

function updateLangButtonLabel(lang) {
  const langBtn = document.getElementById('lang-btn-label');
  if (langBtn) {
    const labels = { 'pt-PT': '🇵🇹 PT', 'pt-BR': '🇧🇷 BR', 'en': '🇬🇧 EN' };
    langBtn.innerText = labels[lang] || lang;
  }
}

function applyTranslations(lang) {
  const dict = translations[lang] || translations['pt-PT'];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = dict[key];
      } else {
        el.innerText = dict[key];
      }
    }
  });

  // Update HTML lang attribute
  document.documentElement.setAttribute('lang', currentLang === 'pt-BR' ? 'pt-BR' : currentLang === 'en' ? 'en' : 'pt-PT');
  updateLangButtonLabel(lang);

  // Update interactive phone mockups to match selected language
  initGymMockup(lang);
  initPollMockup(lang);
}

/* Navbar Scroll Effect */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* Modals & Contact Form */
function initModals() {
  // Privacy Modal
  const privacyTrigger = document.querySelectorAll('[data-modal-trigger="privacy"]');
  const privacyModal = document.getElementById('privacy-modal');

  // Contact Modal
  const contactTrigger = document.querySelectorAll('[data-modal-trigger="contact"]');
  const contactModal = document.getElementById('contact-modal');

  const closeBtns = document.querySelectorAll('.modal-close-btn, .modal-overlay');

  privacyTrigger.forEach(t => t.addEventListener('click', (e) => {
    e.preventDefault();
    if (privacyModal) privacyModal.classList.add('active');
  }));

  contactTrigger.forEach(t => t.addEventListener('click', (e) => {
    e.preventDefault();
    if (contactModal) contactModal.classList.add('active');
  }));

  closeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (e.target === btn || btn.classList.contains('modal-close-btn')) {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
      }
    });
  });

  // Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const data = Object.fromEntries(new FormData(contactForm).entries());
      const dict = translations[currentLang] || translations['pt-PT'];
      const sending = dict['contact.sending'] || 'A enviar…';
      const sent = dict['contact.sent'] || '✓ Mensagem Enviada!';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = sending;
      }

      let ok = false;
      try {
        if (FORM_ENDPOINT) {
          const res = await fetch(FORM_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(data)
          });
          ok = res.ok;
        } else {
          const subject = encodeURIComponent(`[madetech.pt] ${data.name || 'Contacto'}`);
          const body = encodeURIComponent(`${data.message || ''}\n\n—\n${data.name || ''}\n${data.email || ''}`);
          window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
          ok = true;
        }
      } catch (err) {
        ok = false;
      }

      if (ok) {
        contactForm.reset();
        if (contactModal) contactModal.classList.remove('active');
      }
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerText = ok ? sent : (dict['contact.send'] || 'Enviar Mensagem');
        setTimeout(() => {
          submitBtn.innerText = dict['contact.send'] || 'Enviar Mensagem';
        }, 2500);
      }
    });
  }
}
