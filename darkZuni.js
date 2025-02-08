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
    button.innerText = '🌓';

    button.style.cssText = `
      position: fixed;
      bottom: 10px;
      right: 10px;
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: bold;
      background-color: #333;
      color: white;
      border: none;
      border-radius: 50%;
      cursor: grab;
      touch-action: none;
      user-select: none;
      z-index: 1000;
    `;

    button.addEventListener('click', (e) => {
      if (!button.classList.contains('dragging')) {
        this.toggleDarkMode(button);
      }
    });

    document.body.appendChild(button);
    this.enableButtonDrag(button);
  }

  toggleDarkMode(button) {
    const isDarkMode = document.body.classList.toggle(this.darkClass);
    if (isDarkMode) {
      this.enableDarkMode();
      localStorage.setItem('darkZuniTheme', 'dark');
      button.innerText = '🌞';
    } else {
      this.disableDarkMode();
      localStorage.setItem('darkZuniTheme', 'light');
      button.innerText = '🌓';
    }
  }

  enableDarkMode() {
    document.body.classList.add(this.darkClass);
  }

  disableDarkMode() {
    document.body.classList.remove(this.darkClass);
  }

  enableButtonDrag(button) {
    let isDragging = false;
    let offsetX = 0, offsetY = 0;

    function startDrag(e) {
      isDragging = true;
      button.classList.add('dragging');
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
      button.classList.remove('dragging');
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