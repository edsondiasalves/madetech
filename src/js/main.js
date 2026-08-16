import { translations } from './i18n/translations.js';
import { initGymMockup } from './mockups/gym-mockup.js';
import { initPollMockup } from './mockups/poll-mockup.js';

let currentLang = localStorage.getItem('madetech_lang') || 'pt-PT';
let currentTheme = localStorage.getItem('madetech_theme') || 'dark';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initI18n();
  initNavbarScroll();
  initModals();
});

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
  document.documentElement.setAttribute('lang', lang === 'en' ? 'en' : 'pt');
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

  // Contact Form Submission Simulation
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = '✓ Mensagem Enviada!';
        setTimeout(() => {
          contactForm.reset();
          submitBtn.disabled = false;
          const dict = translations[currentLang] || translations['pt-PT'];
          submitBtn.innerText = dict['contact.send'] || 'Enviar Mensagem';
          if (contactModal) contactModal.classList.remove('active');
        }, 1800);
      }
    });
  }
}
