(function () {
  const LONG_PRESS_DURATION = 600;
  let tooltip, timer, targetEl;

  function createTooltip() {
    tooltip = document.createElement('div');
    tooltip.id = 'longpress-tooltip';
    Object.assign(tooltip.style, {
      position: 'absolute',
      background: 'rgba(0, 0, 0, 0.85)',
      color: '#fff',
      padding: '6px 10px',
      borderRadius: '6px',
      fontSize: '14px',
      maxWidth: '220px',
      zIndex: 9999,
      pointerEvents: 'none',
      display: 'none',
      transition: 'opacity 0.2s ease',
    });
    document.body.appendChild(tooltip);
  }

  function showTooltip(el, x, y) {
    const msg = el.getAttribute('data-longpress');
    if (!msg) return;
    tooltip.textContent = msg;
    tooltip.style.left = `${x + 10}px`;
    tooltip.style.top = `${y + 10}px`;
    tooltip.style.display = 'block';
    tooltip.style.opacity = '1';
  }

  function hideTooltip() {
    clearTimeout(timer);
    timer = null;
    if (tooltip) {
      tooltip.style.opacity = '0';
      tooltip.style.display = 'none';
    }
  }

  function startPress(e) {
    e.preventDefault();
    targetEl = e.currentTarget;
    const x = (e.touches ? e.touches[0].clientX : e.clientX);
    const y = (e.touches ? e.touches[0].clientY : e.clientY);

    timer = setTimeout(() => {
      showTooltip(targetEl, x, y);
    }, LONG_PRESS_DURATION);
  }

  function cancelPress() {
    setTimeout(()=> {
    hideTooltip();
    targetEl = null;
    },2000)
  }

  function setupLongPress() {
    createTooltip();
    const targets = document.querySelectorAll('[data-longpress]');
    targets.forEach(el => {
      el.addEventListener('touchstart', startPress);
      el.addEventListener('touchend', cancelPress);
      el.addEventListener('touchmove', cancelPress);
      el.addEventListener('mousedown', startPress);
      el.addEventListener('mouseup', cancelPress);
      el.addEventListener('mouseleave', cancelPress);
    });
  }

  document.addEventListener('DOMContentLoaded', setupLongPress);
})();