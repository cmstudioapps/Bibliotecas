class DarkZuni {
  constructor() {
    this.darkClass = 'dark-mode';
    this.init();
  }

  init() {
    this.applySavedTheme();
    this.createToggleButton();
  }

  applySavedTheme() {
    const savedTheme = localStorage.getItem('darkZuniTheme') || 'light';
    if (savedTheme === 'dark') {
      this.enableDarkMode();
    }
  }

  createToggleButton() {
    const button = document.createElement('button');
    button.innerText = '🌓 Tema';
    button.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 1000;
      padding: 10px 15px;
      background-color: #333;
      color: white;
      border: none;
      border-radius: 50px;
      cursor: pointer;
    `;

    button.addEventListener('click', () => this.toggleDarkMode(button));
    document.body.appendChild(button);
  }

  toggleDarkMode(button) {
    const isDarkMode = document.body.classList.toggle(this.darkClass);
    if (isDarkMode) {
      this.enableDarkMode();
      localStorage.setItem('darkZuniTheme', 'dark');
      button.innerText = '🌞 Tema Claro';
    } else {
      this.disableDarkMode();
      localStorage.setItem('darkZuniTheme', 'light');
      button.innerText = '🌓 Tema Escuro';
    }
  }

  enableDarkMode() {
    this.applyDarkStylesToAllElements();
    this.applyDarkBackgroundToBody();
  }

  disableDarkMode() {
    this.resetElementStyles();
    this.resetBodyBackground();
  }

  applyDarkStylesToAllElements() {
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
      const computedStyle = window.getComputedStyle(el);

      el.dataset.originalBackground = computedStyle.backgroundColor;
      el.dataset.originalColor = computedStyle.color;

      el.style.backgroundColor = '#000';
      el.style.color = '#FFF';
      if (computedStyle.borderColor !== 'transparent') {
        el.style.borderColor = '#FFF';
      }
    });
  }

  applyDarkBackgroundToBody() {
    const bodyComputedStyle = window.getComputedStyle(document.body);
    document.body.dataset.originalBackground = bodyComputedStyle.backgroundColor;
    document.body.style.backgroundColor = '#121212'; // Fundo escuro
  }

  resetElementStyles() {
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
      if (el.dataset.originalBackground) {
        el.style.backgroundColor = el.dataset.originalBackground;
      }
      if (el.dataset.originalColor) {
        el.style.color = el.dataset.originalColor;
      }
      el.style.borderColor = '';
    });
  }

  resetBodyBackground() {
    if (document.body.dataset.originalBackground) {
      document.body.style.backgroundColor = document.body.dataset.originalBackground;
    }
  }
}

// Ativa a biblioteca
new DarkZuni();