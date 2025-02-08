class DarkZuni {
  constructor() {
    this.darkClass = 'dark-mode';
    this.mutationObserver = null;
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
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      z-index: 1000;
      padding: 10px 15px;
      background-color: #333;
      color: white;
      border: none;
      border-radius: 50px;
      cursor: pointer;
    `;

    // Alterna o tema ao clicar
    button.addEventListener('click', () => this.toggleDarkMode(button));

    // Adiciona o botão ao corpo do documento
    document.body.appendChild(button);

    // Habilita a funcionalidade de arrastar o botão
    this.enableButtonDrag(button);
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
    this.startMutationObserver();
  }

  disableDarkMode() {
    this.resetElementStyles();
    this.resetBodyBackground();
    this.stopMutationObserver();
  }

  // Aplica os estilos dark a um elemento individual
  _applyDarkStylesToElement(el) {
    const computedStyle = window.getComputedStyle(el);

    // Salva os estilos originais se ainda não estiverem salvos
    if (!el.dataset.originalBackground) el.dataset.originalBackground = computedStyle.backgroundColor;
    if (!el.dataset.originalColor) el.dataset.originalColor = computedStyle.color;
    if (!el.dataset.originalBorderColor) el.dataset.originalBorderColor = computedStyle.borderColor;
    if (!el.dataset.originalBoxShadow) el.dataset.originalBoxShadow = computedStyle.boxShadow;
    if (!el.dataset.originalBackgroundImage) el.dataset.originalBackgroundImage = computedStyle.backgroundImage;

    // Aplica os estilos dark
    el.style.backgroundColor = '#121212';
    el.style.color = '#FFF';

    if (computedStyle.borderColor !== 'transparent') {
      el.style.borderColor = '#FFF';
    }
    if (computedStyle.boxShadow && computedStyle.boxShadow !== 'none') {
      el.style.boxShadow = '0 0 5px 2px rgba(255, 255, 255, 0.3)';
    }
    if (computedStyle.backgroundImage !== 'none') {
      el.style.backgroundImage = 'none';
    }
  }

  // Aplica os estilos dark a todos os elementos existentes
  applyDarkStylesToAllElements() {
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => this._applyDarkStylesToElement(el));
  }

  // Aplica os estilos dark a um elemento e seus descendentes
  applyDarkStylesToElementAndDescendants(element) {
    if (element.nodeType !== Node.ELEMENT_NODE) return;
    this._applyDarkStylesToElement(element);
    const descendants = element.querySelectorAll('*');
    descendants.forEach(el => this._applyDarkStylesToElement(el));
  }

  applyDarkBackgroundToBody() {
    const bodyComputedStyle = window.getComputedStyle(document.body);
    if (!document.body.dataset.originalBackground) {
      document.body.dataset.originalBackground = bodyComputedStyle.backgroundColor;
    }
    if (!document.body.dataset.originalBackgroundImage) {
      document.body.dataset.originalBackgroundImage = bodyComputedStyle.backgroundImage;
    }
    document.body.style.backgroundColor = '#121212';
    document.body.style.backgroundImage = 'none';
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

  // Inicia o MutationObserver para detectar novos elementos no DOM
  startMutationObserver() {
    if (this.mutationObserver) return; // Já está observando
    this.mutationObserver = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length) {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              this.applyDarkStylesToElementAndDescendants(node);
            }
          });
        }
      });
    });
    this.mutationObserver.observe(document.body, { childList: true, subtree: true });
  }

  // Interrompe o MutationObserver
  stopMutationObserver() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
      this.mutationObserver = null;
    }
  }

  enableButtonDrag(button) {
    let isDragging = false;
    let offsetX = 0, offsetY = 0;

    button.addEventListener('mousedown', (e) => {
      isDragging = true;
      offsetX = e.clientX - button.getBoundingClientRect().left;
      offsetY = e.clientY - button.getBoundingClientRect().top;
      button.style.transition = 'none'; // Remove transições durante o arraste
    });

    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        button.style.left = `${e.clientX - offsetX}px`;
        button.style.top = `${e.clientY - offsetY}px`;
      }
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
      button.style.transition = 'left 0.1s ease, top 0.1s ease'; // Restaura transições
    });
  }
}

// Ativa a biblioteca
new DarkZuni();