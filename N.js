(function () {
  const unidades = [
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
        return (resultado.toFixed(1).replace(".0", "") + unidades[i].sufixo);
      }
    }

    return num.toString();
  }

  function formatarTexto(texto) {
    return texto.replace(/\b\d{1,3}(?:[\d,. ]*\d)?\b/g, match => {
      const limpo = match.replace(/[,. ]/g, "");
      if (limpo.includes("e+")) return match; // já é notação científica, não mexe
      const numero = parseFloat(limpo);
      if (isNaN(numero) || numero < 1000 || !isFinite(numero)) return match;
      return formatarNumero(numero);
    });
  }

  function percorrerElementos(el) {
    if (el.nodeType === 3) {
      const textoOriginal = el.nodeValue;
      const textoFormatado = formatarTexto(textoOriginal);
      if (textoOriginal !== textoFormatado) {
        el.nodeValue = textoFormatado;
      }
    } else if (el.nodeType === 1 && !["SCRIPT", "STYLE", "NOSCRIPT", "IFRAME", "CODE", "PRE"].includes(el.tagName)) {
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