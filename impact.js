(function() {
  // Variável de controle para ativar/desativar o parar movimento
  let pararMovimentoAtivo = false;

  // Função para verificar colisão entre dois elementos
  function colisao(elem1, elem2) {
    const rect1 = elem1.getBoundingClientRect();
    const rect2 = elem2.getBoundingClientRect();
    
    return !(rect1.right < rect2.left || 
             rect1.left > rect2.right || 
             rect1.bottom < rect2.top || 
             rect1.top > rect2.bottom);
  }

  // Função para detectar colisões entre múltiplos elementos
  function detectar(elementos, callback, parar = false) {
    let colisoes = [];

    // Atualiza a flag para controlar se deve parar o movimento
    pararMovimentoAtivo = parar;

    for (let i = 0; i < elementos.length; i++) {
      for (let j = i + 1; j < elementos.length; j++) {
        const elem1 = elementos[i];
        const elem2 = elementos[j];

        if (colisao(elem1, elem2)) {
          colisoes.push([elem1, elem2]);
          console.log(`${elem1.id} colidiu com ${elem2.id}`);

          // Chama a função de callback para cada colisão detectada
          callback(elem1, elem2);

          // Se a flag estiver ativa, para o movimento
          if (pararMovimentoAtivo) {
            pararMovimento(elem1);
            pararMovimento(elem2);
          }
        }
      }
    }
  }

  // Função para parar o movimento de um elemento (remove qualquer movimentação CSS)
  function pararMovimento(elemento) {
    elemento.style.animation = 'none';
    elemento.style.transition = 'none';
    // Caso o elemento esteja usando a propriedade 'transform', também é possível parar o movimento.
    elemento.style.transform = elemento.style.transform;
  }

  // Função para verificar colisão entre dois elementos específicos
  function colisaoIndependente(elem1, elem2) {
    return colisao(elem1, elem2);
  }

  // Função para ativar/desativar a interrupção de movimento dinamicamente
  function setPararMovimento(ativo) {
    pararMovimentoAtivo = ativo;
  }

  // Expor as funções para o uso
  window.detectar = detectar;
  window.colisaoIndependente = colisaoIndependente;
  window.setPararMovimento = setPararMovimento;  // Função que permite ativar/desativar dinamicamente
})();