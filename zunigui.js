
/*
zunigui.js
e um conjunto de módulos inicialmente feita pela CM Studio 

a zunigui.js apenas junta esses módulos
em uma biblioteca para facilitar o uso

site oficial das bibliotecas
alert zuni
https://caiolibs.vercel.app/AlertZuni.html

zuni confirm
https://caiolibs.vercel.app/zuniConfirm.html
 input zuni
https://caiolibs.vercel.app/inputZuni.html

 

*/

function customPrompt(message, placeholder = '', inputType = 'text') {
  return new Promise((resolve, reject) => {
    // Criação do contêiner do prompt
    const promptContainer = document.createElement('div');
    promptContainer.className = 'custom-prompt-container';
    promptContainer.innerHTML = `
      <div class="custom-prompt-box">
        <p>${message}</p>
        <input type="${inputType}" placeholder="${placeholder}" class="custom-prompt-input" />
        <button class="custom-prompt-confirm">Confirmar</button>
        <button class="custom-prompt-cancel">Cancelar</button>
      </div>
    `;

    // Adiciona o prompt ao body
    document.body.appendChild(promptContainer);

    // Seleciona os elementos
    const inputField = promptContainer.querySelector('.custom-prompt-input');
    const confirmButton = promptContainer.querySelector('.custom-prompt-confirm');
    const cancelButton = promptContainer.querySelector('.custom-prompt-cancel');

    // Evento de confirmação
    confirmButton.addEventListener('click', () => {
      resolve(inputField.value);
      promptContainer.remove();
    });

    // Evento de cancelamento
    cancelButton.addEventListener('click', () => {
      reject();
      promptContainer.remove();
    });
  });
}

// Função para criar um alerta personalizado
function customAlert(message, buttonText1, buttonText2, onButtonClick1, onButtonClick2) {
  const alertContainer = document.createElement('div');
  alertContainer.className = 'custom-alert-container';
  alertContainer.innerHTML = `
    <div class="custom-alert-box">
      <p>${message}</p>
      <div class="custom-alert-buttons">
        <button class="custom-alert-button-1">${buttonText1}</button>
        <button class="custom-alert-button-2">${buttonText2}</button>
      </div>
    </div>
  `;

  // Adiciona o alerta ao body
  document.body.appendChild(alertContainer);

  // Seleciona os botões
  const button1 = alertContainer.querySelector('.custom-alert-button-1');
  const button2 = alertContainer.querySelector('.custom-alert-button-2');

  // Eventos dos botões
  button1.addEventListener('click', () => {
    onButtonClick1();
    alertContainer.remove();
  });

  button2.addEventListener('click', () => {
    onButtonClick2();
    alertContainer.remove();
  });
}

// Função para criar um alerta simples
function zuniAlert(mensagem, callbackOK) {
  if (document.querySelector('.zuni-alert-container')) return;

  const alertContainer = document.createElement('div');
  alertContainer.className = 'zuni-alert-container';
  alertContainer.innerHTML = `
    <div class="zuni-alert-box">
      <div class="zuni-alert-message">${mensagem}</div>
      <button class="zuni-alert-ok">OK</button>
    </div>
  `;

  document.body.appendChild(alertContainer);

  const okButton = alertContainer.querySelector('.zuni-alert-ok');
  okButton.addEventListener('click', () => {
    alertContainer.remove();
    if (typeof callbackOK === 'function') callbackOK();
  });
}

// Adiciona estilos
const style = document.createElement('style');
style.innerHTML = `
  .custom-prompt-container, .custom-alert-container, .zuni-alert-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .custom-prompt-box, .custom-alert-box, .zuni-alert-box {
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  .custom-prompt-input {
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .custom-prompt-confirm, .custom-prompt-cancel, .custom-alert-button-1, .custom-alert-button-2, .zuni-alert-ok {
    margin-top: 15px;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    color: white;
  }

  .custom-prompt-confirm, .custom-alert-button-1 {
    background: #007BFF;
  }

  .custom-prompt-cancel, .custom-alert-button-2 {
    background: #dc3545;
    margin-left: 10px;
  }

  .zuni-alert-ok {
    background: #8e44ad;
  }

  .zuni-watermark {
    position: absolute;
    bottom: 5px;
    right: 10px;
    font-size: 12px;
    opacity: 0.5;
  }
`;
document.head.appendChild(style);

// Intercepta o alert padrão
window.alert = function (message) {
  return new Promise((resolve) => {
    zuniAlert(message, resolve);
  });
};

// Intercepta o prompt padrão
window.prompt = function (message, defaultValue = "") {
  return customPrompt(message, defaultValue);
};

// Intercepta o confirm padrão
window.confirm = function (message) {
  return new Promise((resolve) => {
    customAlert(
      message,
      'OK',
      'Cancelar',
      () => resolve(true),
      () => resolve(false)
    );
  });
};