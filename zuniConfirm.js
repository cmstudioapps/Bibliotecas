(function() {
  // Função para criar o alert customizado
  function createAlert(message, buttonText1, buttonText2, onButtonClick1, onButtonClick2) {
    // Criação do container do alerta
    const alertContainer = document.createElement('div');
    alertContainer.style.position = 'fixed';
    alertContainer.style.top = '50%';
    alertContainer.style.left = '50%';
    alertContainer.style.transform = 'translate(-50%, -50%)';
    alertContainer.style.backgroundColor = '#fff';
    alertContainer.style.borderRadius = '10px';
    alertContainer.style.padding = '20px';
    alertContainer.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    alertContainer.style.zIndex = '1000';

    // Adiciona a mensagem
    const messageElement = document.createElement('p');
    messageElement.innerText = message;
    messageElement.style.fontSize = '18px';
    messageElement.style.marginBottom = '20px';
    alertContainer.appendChild(messageElement);

    // Criação dos botões
    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.justifyContent = 'space-between';

    const button1 = document.createElement('button');
    button1.innerText = buttonText1;
    button1.style.backgroundColor = '#8e44ad'; // Roxo
    button1.style.color = '#fff';
    button1.style.padding = '10px 20px';
    button1.style.border = 'none';
    button1.style.borderRadius = '5px';
    button1.style.cursor = 'pointer';
    button1.style.transition = 'background-color 0.3s';
    button1.addEventListener('click', function() {
      onButtonClick1();
      document.body.removeChild(alertContainer);
    });
    button1.addEventListener('mouseenter', () => {
      button1.style.backgroundColor = '#9b59b6';
    });
    button1.addEventListener('mouseleave', () => {
      button1.style.backgroundColor = '#8e44ad';
    });

    const button2 = document.createElement('button');
    button2.innerText = buttonText2;
    button2.style.backgroundColor = '#3498db'; // Azul
    button2.style.color = '#fff';
    button2.style.padding = '10px 20px';
    button2.style.border = 'none';
    button2.style.borderRadius = '5px';
    button2.style.cursor = 'pointer';
    button2.style.transition = 'background-color 0.3s';
    button2.addEventListener('click', function() {
      onButtonClick2();
      document.body.removeChild(alertContainer);
    });
    button2.addEventListener('mouseenter', () => {
      button2.style.backgroundColor = '#2980b9';
    });
    button2.addEventListener('mouseleave', () => {
      button2.style.backgroundColor = '#3498db';
    });

    buttonContainer.appendChild(button1);
    buttonContainer.appendChild(button2);

    alertContainer.appendChild(buttonContainer);
    document.body.appendChild(alertContainer);
  }

  // Expõe a função para o desenvolvedor
  window.alertConfirm = createAlert;
})();