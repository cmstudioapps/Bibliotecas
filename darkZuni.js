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

      // Salvando o estado original para poder restaurá-lo depois
      el.dataset.originalBackground = computedStyle.backgroundColor;
      el.dataset.originalColor = computedStyle.color;
      el.dataset.originalBorderColor = computedStyle.borderColor;
      el.dataset.originalBoxShadow = computedStyle.boxShadow;
      el.dataset.originalBackgroundImage = computedStyle.backgroundImage;

      // Aplicando novos estilos
      el.style.backgroundColor = '#121212'; // Cor de fundo escura
      el.style.color = '#FFF'; // Cor do texto clara

      // Mudando borda e sombra para um tema mais escuro
      if (computedStyle.borderColor !== 'transparent') {
        el.style.borderColor = '#FFF';
      }
      if (computedStyle.boxShadow && computedStyle.boxShadow !== 'none') {
        el.style.boxShadow = '0 0 5px 2px rgba(255, 255, 255, 0.3)';
      }

      // Mudando imagens de fundo para uma cor de fundo escura ou sombra
      if (computedStyle.backgroundImage !== 'none') {
        el.style.backgroundImage = 'none'; // Desabilita as imagens de fundo
      }
    });
  }

  applyDarkBackgroundToBody() {
    const bodyComputedStyle = window.getComputedStyle(document.body);
    document.body.dataset.originalBackground = bodyComputedStyle.backgroundColor;
    document.body.dataset.originalBackgroundImage = bodyComputedStyle.backgroundImage;
    document.body.style.backgroundColor = '#121212'; // Fundo escuro
    document.body.style.backgroundImage = 'none'; // Desabilita a imagem de fundo
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
      if (el.dataset.originalBorderColor) {
        el.style.borderColor = el.dataset.originalBorderColor;
      }
      if (el.dataset.originalBoxShadow) {
        el.style.boxShadow = el.dataset.originalBoxShadow;
      }
      if (el.dataset.originalBackgroundImage) {
        el.style.backgroundImage = el.dataset.originalBackgroundImage;
      }
    });
  }

  resetBodyBackground() {
    if (document.body.dataset.originalBackground) {
      document.body.style.backgroundColor = document.body.dataset.originalBackground;
    }
    if (document.body.dataset.originalBackgroundImage) {
      document.body.style.backgroundImage = document.body.dataset.originalBackgroundImage;
    }
  }
}

// Ativa a biblioteca
new DarkZuni();