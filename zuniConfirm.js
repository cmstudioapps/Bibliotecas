// zuniAlertConfirm.js

function zuniAlertConfirm(options) {
  // Parâmetros padrões
  const defaultOptions = {
    title: 'Confirmação',
    message: 'Você tem certeza?',
    icon: 'info', // Pode ser 'success', 'error', 'info', 'warning'
    confirmText: 'Sim',
    cancelText: 'Não',
    backgroundColor: '#007bff',
    confirmCallback: null,
    cancelCallback: null,
  };

  // Combina os parâmetros passados com os padrões
  const config = { ...defaultOptions, ...options };

  // Criação do modal de confirmação
  const confirmModal = document.createElement('div');
  confirmModal.style.position = 'fixed';
  confirmModal.style.top = '50%';
  confirmModal.style.left = '50%';
  confirmModal.style.transform = 'translate(-50%, -50%)';
  confirmModal.style.padding = '20px';
  confirmModal.style.backgroundColor = '#fff';
  confirmModal.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  confirmModal.style.borderRadius = '8px';
  confirmModal.style.textAlign = 'center';
  confirmModal.style.zIndex = '9999';

  // Título
  const titleElement = document.createElement('h3');
  titleElement.innerText = config.title;
  confirmModal.appendChild(titleElement);

  // Mensagem
  const messageElement = document.createElement('p');
  messageElement.innerText = config.message;
  confirmModal.appendChild(messageElement);

  // Botões
  const buttonContainer = document.createElement('div');
  buttonContainer.style.marginTop = '20px';

  // Botão Sim
  const confirmButton = document.createElement('button');
  confirmButton.innerText = config.confirmText;
  confirmButton.style.marginRight = '10px';
  confirmButton.style.padding = '10px 20px';
  confirmButton.style.backgroundColor = config.backgroundColor;
  confirmButton.style.color = '#fff';
  confirmButton.style.border = 'none';
  confirmButton.style.borderRadius = '5px';
  confirmButton.style.cursor = 'pointer';
  confirmButton.onclick = function () {
    if (config.confirmCallback) config.confirmCallback();
    closeConfirm();
  };
  buttonContainer.appendChild(confirmButton);

  // Botão Não
  const cancelButton = document.createElement('button');
  cancelButton.innerText = config.cancelText;
  cancelButton.style.padding = '10px 20px';
  cancelButton.style.backgroundColor = '#ccc';
  cancelButton.style.color = '#000';
  cancelButton.style.border = 'none';
  cancelButton.style.borderRadius = '5px';
  cancelButton.style.cursor = 'pointer';
  cancelButton.onclick = function () {
    if (config.cancelCallback) config.cancelCallback();
    closeConfirm();
  };
  buttonContainer.appendChild(cancelButton);

  confirmModal.appendChild(buttonContainer);

  // Função para fechar o modal
  function closeConfirm() {
    document.body.removeChild(confirmModal);
  }

  // Adiciona o modal ao body
  document.body.appendChild(confirmModal);
}

// Exemplo de uso:
zuniAlertConfirm({
  title: 'Deseja continuar?',
  message: 'Essa ação não pode ser desfeita.',
  confirmText: 'Sim',
  cancelText: 'Não',
  backgroundColor: '#28a745',
  confirmCallback: function () {
    alert('Você confirmou!');
  },
  cancelCallback: function () {
    alert('Você cancelou!');
  },
});