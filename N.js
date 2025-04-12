(function () {
  const unidades = [
    { valor: 1e24, sufixo: "SEX" }, // 1 septilhão
    { valor: 1e21, sufixo: "QUI" }, // 1 sextilhão
    { valor: 1e18, sufixo: "HEX" }, // 1 quintilhão
    { valor: 1e15, sufixo: "QUA" },
    { valor: 1e12, sufixo: "TRI" },
    { valor: 1e9,  sufixo: "BI" },
    { valor: 1e6,  sufixo: "MI" },
    { valor: 1e3,  sufixo: "K" },
  ];

  function formatarNumero(num) {
    if (!isFinite(num)) return num.toString();

    for (let i = 0; i < unidades.length; i++) {
      if (num >= unidades[i].valor) {
        const resultado = num / unidades[i].valor;
        return resultado.toFixed(1).replace(".0", "") + unidades[i].sufixo;
      }
    }

    return num.toString();
  }

  function formatarTexto(texto) {
    return texto.replace(/(\d+(?:[\d,. ]*\d+)?(?:e\+\d+)?)/gi, match => {
      let num;
      try {
        num = Number(match.replace(/[, ]/g, ""));
      } catch {
        return match;
      }
      if (isNaN(num) || num < 1000) return match;
      return formatarNumero(num);
    });
  }

  function percorrerElementos(el) {
    if (el.nodeType === 3) {
      const original = el.nodeValue;
      const novo = formatarTexto(original);
      if (original !== novo) el.nodeValue = novo;
    } else if (el.nodeType === 1 && !["SCRIPT", "STYLE", "IFRAME", "NOSCRIPT", "CODE", "PRE"].includes(el.tagName)) {
      el.childNodes.forEach(percorrerElementos);
    }
  }

  function formatarPagina() {
    percorrerElementos(document.body);
  }

  document.addEventListener("DOMContentLoaded", formatarPagina);

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === 1) percorrerElementos(node);
      });
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });

  window.formatarNumerosAutomaticamente = formatarPagina;
})();