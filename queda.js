class ItensCaindo {
  constructor(opcoes) {
    this.itens = opcoes.itens || []; // Lista de seletores CSS ou elementos HTML
    this.area = document.querySelector(opcoes.area) || document.body; // Área de queda
    this.tempoQueda = opcoes.tempoQueda || 3000; // Tempo de queda em ms
    this.animacaoGiratoria = opcoes.animacaoGiratoria || false; // Ativar animação de giro
    this.quantidade = opcoes.quantidade || 1; // Quantidade de itens que irão cair por vez
    this.intervaloQueda = opcoes.intervaloQueda || 1000; // Intervalo entre as quedas
    this.iniciarQueda();
  }
  
  iniciarQueda() {
    // Se os itens forem apenas seletores, converta-os para elementos
    if (this.itens[0] instanceof HTMLElement) {
      this.itens = this.itens.map(item => item); // Já são elementos
    } else {
      this.itens = this.itens.map(seletor => document.querySelector(seletor)); // Converte seletores em elementos
    }
    
    // Para cada item, cria-se um intervalo específico
    this.itens.forEach((item) => {
      let intervaloItem = item.intervaloQueda || this.intervaloQueda; // Intervalo personalizado ou padrão
      let distanciaItem = item.distancia || this.area.clientHeight; // Distância personalizada ou padrão
      
      this.criarItensPeriodicamente(item, intervaloItem, distanciaItem);
    });
  }
  
  // Método para criar os itens periodicamente com o intervalo definido
  criarItensPeriodicamente(item, intervaloItem, distanciaItem) {
    setInterval(() => {
      // Garante que a quantidade de itens seja respeitada
      for (let i = 0; i < this.quantidade; i++) {
        this.criarItem(item, intervaloItem, distanciaItem);
      }
    }, intervaloItem);
  }
  
  criarItem(item, intervaloItem, distanciaItem) {
    // Clona o item
    let itemCaindo = item.cloneNode(true);
    
    // Define posição inicial aleatória dentro da área
    let areaRect = this.area.getBoundingClientRect();
    itemCaindo.style.position = "absolute";
    itemCaindo.style.left = Math.random() * (areaRect.width - 50) + "px";
    itemCaindo.style.top = "-50px"; // Começa fora da tela
    itemCaindo.style.transition = `transform ${this.tempoQueda}ms linear, top ${this.tempoQueda}ms linear`;
    this.area.appendChild(itemCaindo);
    
    // Aplica rotação se ativado
    if (this.animacaoGiratoria) {
      itemCaindo.style.transform = "rotate(0deg)";
    }
    
    // Inicia a animação de queda
    setTimeout(() => {
      itemCaindo.style.top = distanciaItem + "px"; // Usa a distância personalizada ou padrão
      if (this.animacaoGiratoria) {
        itemCaindo.style.transform = "rotate(720deg)";
      }
    }, 10);
    
    // Remove o item após a queda
    setTimeout(() => {
      itemCaindo.remove();
    }, this.tempoQueda);
  }
}