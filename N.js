(function () {
  const unidades = [
    { valor: 1e15, sufixo: "QUA" },
    { valor: 1e12, sufixo: "TRI" },
    { valor: 1e9,  sufixo: "BI" },
    { valor: 1e6,  sufixo: "MI" },
    { valor: 1e3,  sufixo: "K" },
  ];

  function formatarNumero(num) {
    for (let i = 0; i < unidades.length; i++) {
      if (num >= unidades[i].valor) {
        return (num / unidades[i].valor).toFixed(1).replace(".0", "") + unidades[i].sufixo;
      }
    }
    return num.toString();
  }

  function atualizarNumeros() {
    const elementos = document.querySelectorAll("[data-formatar-numero]");
    elementos.forEach(el => {
      const numeroOriginal = parseFloat(el.getAttribute("data-numero-original")) || parseFloat(el.textContent);
      if (!isNaN(numeroOriginal)) {
        el.setAttribute("data-numero-original", numeroOriginal);
        el.textContent = formatarNumero(numeroOriginal);
      }
    });
  }

  const observer = new MutationObserver(atualizarNumeros);
  observer.observe(document.body, { childList: true, subtree: true });

  document.addEventListener("DOMContentLoaded", atualizarNumeros);
  window.formatarNumeros = atualizarNumeros;
})();