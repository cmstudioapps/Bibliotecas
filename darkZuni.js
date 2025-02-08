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
    button.id = 'darkToggleButton';
    button.setAttribute('data-ignore-dark', 'true');
    button.innerText = '🌓 Tema';

    button.style.cssText = `
      position: fixed;
      top: auto;
      bottom: 10px;
      left: auto;
      right: 10px;
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

  _applyDarkStylesToElement(el) {
    if (el.hasAttribute('data-ignore-dark')) return;
    const computedStyle = window.getComputedStyle(el);

    if (!el.dataset.originalBackground) el.dataset.originalBackground = computedStyle.backgroundColor;
    if (!el.dataset.originalColor) el.dataset.originalColor = computedStyle.color;
    if (!el.dataset.originalBorderColor) el.dataset.originalBorderColor = computedStyle.borderColor;
    if (!el.dataset.originalBoxShadow) el.dataset.originalBoxShadow = computedStyle.boxShadow;
    if (!el.dataset.originalBackgroundImage) el.dataset.originalBackgroundImage = computedStyle.backgroundImage;

    el.style.backgroundColor = '#121212';
    el.style.color = '#FFF';

    if (computedStyle.borderColor !== 'transparent') el.style.borderColor = '#FFF';
    if (computedStyle.boxShadow && computedStyle.boxShadow !== 'none') el.style.boxShadow = '0 0 5px 2px rgba(255, 255, 255, 0.3)';
    if (computedStyle.backgroundImage !== 'none') el.style.backgroundImage = 'none';
  }

  applyDarkStylesToAllElements() {
    document.querySelectorAll('*').forEach(el => this._applyDarkStylesToElement(el));
  }

  applyDarkStylesToElementAndDescendants(element) {
    if (element.nodeType !== Node.ELEMENT_NODE) return;
    this._applyDarkStylesToElement(element);
    element.querySelectorAll('*').forEach(el => this._applyDarkStylesToElement(el));
  }

  applyDarkBackgroundToBody() {
    const bodyComputedStyle = window.getComputedStyle(document.body);
    if (!document.body.dataset.originalBackground) document.body.dataset.originalBackground = bodyComputedStyle.backgroundColor;
    if (!document.body.dataset.originalBackgroundImage) document.body.dataset.originalBackgroundImage = bodyComputedStyle.backgroundImage;
    document.body.style.backgroundColor = '#121212';
    document.body.style.backgroundImage = 'none';
  }

  resetElementStyles() {
    document.querySelectorAll('*').forEach(el => {
      if (el.dataset.originalBackground) el.style.backgroundColor = el.dataset.originalBackground;
      if (el.dataset.originalColor) el.style.color = el.dataset.originalColor;
      if (el.dataset.originalBorderColor) el.style.borderColor = el.dataset.originalBorderColor;
      if (el.dataset.originalBoxShadow) el.style.boxShadow = el.dataset.originalBoxShadow;
      if (el.dataset.originalBackgroundImage) el.style.backgroundImage = el.dataset.originalBackgroundImage;
    });
  }

  resetBodyBackground() {
    if (document.body.dataset.originalBackground) document.body.style.backgroundColor = document.body.dataset.originalBackground;
    if (document.body.dataset.originalBackgroundImage) document.body.style.backgroundImage = document.body.dataset.originalBackgroundImage;
  }

  startMutationObserver() {
    if (this.mutationObserver) return;
    this.mutationObserver = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length) {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) this.applyDarkStylesToElementAndDescendants(node);
          });
        }
      });
    });
    this.mutationObserver.observe(document.body, { childList: true, subtree: true });
  }

  stopMutationObserver() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
      this.mutationObserver = null;
    }
  }

  enableButtonDrag(button) {
    let isDragging = false;
    let offsetX = 0, offsetY = 0;

    function startDrag(e) {
      isDragging = true;
      let touch = e.touches ? e.touches[0] : e;
      offsetX = touch.clientX - button.getBoundingClientRect().left;
      offsetY = touch.clientY - button.getBoundingClientRect().top;
      button.style.transition = 'none';
    }

    function moveButton(e) {
      if (!isDragging) return;
      let touch = e.touches ? e.touches[0] : e;

      let screenWidth = window.innerWidth;
      let screenHeight = window.innerHeight;
      let buttonWidth = button.offsetWidth;
      let buttonHeight = button.offsetHeight;

      let newLeft = touch.clientX - offsetX;
      let newTop = touch.clientY - offsetY;

      newLeft = Math.max(0, Math.min(screenWidth - buttonWidth, newLeft));
      newTop = Math.max(0, Math.min(screenHeight - buttonHeight, newTop));

      button.style.left = `${newLeft}px`;
      button.style.top = `${newTop}px`;
    }

    function endDrag() {
      isDragging = false;
      button.style.transition = 'left 0.1s ease, top 0.1s ease';
    }

    button.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', moveButton);
    document.addEventListener('mouseup', endDrag);

    button.addEventListener('touchstart', startDrag);
    document.addEventListener('touchmove', moveButton);
    document.addEventListener('touchend', endDrag);
  }
}

new DarkZuni();