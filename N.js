(function () {
  const unidades = [
    { valor: 1e15, sufixo: "QUA" },
    { valor: 1e12, sufixo: "TRI" },
    { valor: 1e9, sufixo: "BI" },
    { valor: 1e6, sufixo: "MI" },
    { valor: 1e3, sufixo: "K" },
  ];

  function formatarNumero(num) {
    for (let i = 0; i < unidades.length; i++) {
      if (num >= unidades[i].valor) {
        return (num / unidades[i].valor).toFixed(1).replace(".0", "") + unidades[i].sufixo;
      }
    }
    return num.toString();
  }

  function formatarTexto(texto) {
    return texto.replace(/(\d{1,3}(?:[\d,. ]*\d)?)/g, match => {
      const numero = parseFloat(match.replace(/[,. ]/g, ""));
      if (isNaN(numero) || numero < 1000) return match;
      return formatarNumero(numero);
    });
  }

  function percorrerElementos(el) {
    if (el.nodeType === 3) { // nó de texto
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

  // Executa ao carregar
  document.addEventListener("DOMContentLoaded", formatarPagina);

  // Observa conteúdo dinâmico
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === 1) percorrerElementos(node);
      });
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // Expõe função manual, se quiser forçar
  window.formatarNumerosAutomaticamente = formatarPagina;
})();