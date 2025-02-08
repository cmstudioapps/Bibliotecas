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
    // Identifica o botão para que ele não seja afetado pelos estilos dark
    button.id = 'darkToggleButton';
    button.setAttribute('data-ignore-dark', 'true');
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

    // Adiciona o botão ao documento
    document.body.appendChild(button);

    // Habilita a funcionalidade de arrastar o botão (mouse e toque)
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

  // Aplica os estilos dark a um elemento individual (exceto aos que devem ser ignorados)
  _applyDarkStylesToElement(el) {
    if (el.hasAttribute('data-ignore-dark')) return;
    const computedStyle = window.getComputedStyle(el);

    // Salva os estilos originais se ainda não estiverem salvos
    if (!el.dataset.originalBackground)
      el.dataset.originalBackground = computedStyle.backgroundColor;
    if (!el.dataset.originalColor)
      el.dataset.originalColor = computedStyle.color;
    if (!el.dataset.originalBorderColor)
      el.dataset.originalBorderColor = computedStyle.borderColor;
    if (!el.dataset.originalBoxShadow)
      el.dataset.originalBoxShadow = computedStyle.boxShadow;
    if (!el.dataset.originalBackgroundImage)
      el.dataset.originalBackgroundImage = computedStyle.backgroundImage;

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

  // Aplica os estilos dark a todos os elementos já existentes
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

  // Inicia o MutationObserver para detectar novos elementos adicionados ao DOM
  startMutationObserver() {
    if (this.mutationObserver) return;
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

  // Permite arrastar o botão com suporte para mouse e dispositivos móveis (touch)
  enableButtonDrag(button) {
    let isDragging = false;
    let offsetX = 0, offsetY = 0;

    // Função para iniciar o arraste (mouse e toque)
    const dragStart = (e) => {
      isDragging = true;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      offsetX = clientX - button.getBoundingClientRect().left;
      offsetY = clientY - button.getBoundingClientRect().top;
      button.style.transition = 'none';
    };

    // Função para mover o botão (mouse e toque)
    const dragMove = (e) => {
      if (!isDragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      button.style.left = `${clientX - offsetX}px`;
      button.style.top = `${clientY - offsetY}px`;
      // Previne o scroll durante o toque
      if (e.touches) {
        e.preventDefault();
      }
    };

    // Função para finalizar o arraste (mouse e toque)
    const dragEnd = () => {
      isDragging = false;
      button.style.transition = 'left 0.1s ease, top 0.1s ease';
    };

    // Eventos para mouse
    button.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', dragMove);
    document.addEventListener('mouseup', dragEnd);

    // Eventos para toque
    button.addEventListener('touchstart', dragStart, { passive: false });
    document.addEventListener('touchmove', dragMove, { passive: false });
    document.addEventListener('touchend', dragEnd);
  }
}

// Ativa a biblioteca
new DarkZuni();