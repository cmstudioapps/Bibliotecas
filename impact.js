(function() {
  let pararMovimentoAtivo = false;

  function colisao(elem1, elem2) {
    const rect1 = elem1.getBoundingClientRect();
    const rect2 = elem2.getBoundingClientRect();
    
    return !(rect1.right < rect2.left || 
             rect1.left > rect2.right || 
             rect1.bottom < rect2.top || 
             rect1.top > rect2.bottom);
  }

  function detectar(elementos, callback, parar = false) {
    let colisoes = [];
    pararMovimentoAtivo = parar;

    for (let i = 0; i < elementos.length; i++) {
      for (let j = i + 1; j < elementos.length; j++) {
        const elem1 = elementos[i];
        const elem2 = elementos[j];

        if (colisao(elem1, elem2)) {
          colisoes.push([elem1, elem2]);
          console.log(`${elem1.id} colidiu com ${elem2.id}`);
          callback(elem1, elem2);

          if (pararMovimentoAtivo) {
            pararMovimento(elem1);
            pararMovimento(elem2);
          }
        }
      }
    }
  }

  function pararMovimento(elemento) {
    elemento.style.animation = 'none';
    elemento.style.transition = 'none';
    elemento.style.transform = elemento.style.transform;
  }

  function colisaoIndependente(elem1, elem2) {
    return colisao(elem1, elem2);
  }

  function setPararMovimento(ativo) {
    pararMovimentoAtivo = ativo;
  }

  window.detectar = detectar;
  window.colisaoIndependente = colisaoIndependente;
  window.setPararMovimento = setPararMovimento;
})();