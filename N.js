(function () {
  const unidades = [
    { valor: 1e24, sufixo: "SEX" }, // 1 septilhão
    { valor: 1e21, sufixo: "QUI" }, // 1 sextilhão
    { valor: 1e18, sufixo: "HEX" }, // 1 quintilhão
    { valor: 1e15, sufixo: "QUA" },
    { valor: 1e12, sufixo: "TRI" },
    { valor: 1e9,  sufixo: "BI" }, // A partir daqui (índice 5) aplicamos a regra dos 5 dígitos
    { valor: 1e6,  sufixo: "MI" },
    { valor: 1e3,  sufixo: "K" },
  ];

  function formatarNumeroGrande(num, divisor, sufixo) {
    const valor = num / divisor;
    let str = valor.toString();
    
    // Se tiver notação científica, converter para decimal
    if (str.includes('e')) {
      str = valor.toFixed(20).replace(/\.?0+$/, '');
    }
    
    // Separar parte inteira e decimal
    let [inteiro, decimal = ''] = str.split('.');
    decimal = decimal.replace(/0+$/, '');
    
    // Calcular quantos dígitos podemos usar para a parte decimal
    const digitosDisponiveis = Math.max(0, 5 - inteiro.length);
    
    // Se tivermos espaço para decimais e eles forem significativos
    if (digitosDisponiveis > 0 && decimal.length > 0) {
      // Limitar casas decimais
      decimal = decimal.substring(0, digitosDisponiveis);
      str = inteiro + (decimal ? '.' + decimal : '');
    } else {
      // Sem decimais ou sem espaço para eles
      str = inteiro;
    }
    
    // Se ainda tivermos mais que 5 dígitos, truncar
    if (str.replace('.', '').length > 5) {
      str = str.substring(0, 5 + (str.includes('.') ? 1 : 0));
    }
    
    // Remover . no final se houver
    if (str.endsWith('.')) {
      str = str.slice(0, -1);
    }
    
    return str + sufixo;
  }

  function formatarNumero(num) {
    if (!isFinite(num)) return num.toString();

    for (let i = 0; i < unidades.length; i++) {
      if (num >= unidades[i].valor) {
        // Aplicar regra dos 5 dígitos apenas para BI ou maior (índices 0-5)
        if (i <= 5) {
          return formatarNumeroGrande(num, unidades[i].valor, unidades[i].sufixo);
        }
        // Para MI e K, manter a formatação original
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