function customPrompt(message, placeholder = '', inputType = 'text') {
  return new Promise((resolve, reject) => {
    // Criação do contêiner do prompt
    const promptContainer = document.createElement('div');
    promptContainer.style.position = 'fixed';
    promptContainer.style.top = '0';
    promptContainer.style.left = '0';
    promptContainer.style.width = '100%';
    promptContainer.style.height = '100%';
    promptContainer.style.display = 'flex';
    promptContainer.style.alignItems = 'center';
    promptContainer.style.justifyContent = 'center';
    promptContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    promptContainer.style.zIndex = '1000';
    promptContainer.style.opacity = '0';
    promptContainer.style.transition = 'opacity 0.3s ease'; // Animação de entrada

    // Criação da caixa do prompt
    const promptBox = document.createElement('div');
    promptBox.style.backgroundColor = '#fff';
    promptBox.style.padding = '20px';
    promptBox.style.borderRadius = '8px';
    promptBox.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    promptBox.style.textAlign = 'center';
    promptBox.style.minWidth = '300px';
    promptBox.style.transform = 'scale(0.9)';
    promptBox.style.transition = 'transform 0.3s ease'; // Animação de escala

    // Mensagem do prompt
    const promptMessage = document.createElement('p');
    promptMessage.textContent = message;
    promptBox.appendChild(promptMessage);

    // Campo de entrada (input)
    const inputField = document.createElement('input');
    inputField.type = inputType;
    inputField.placeholder = placeholder;
    inputField.style.width = '100%';
    inputField.style.marginTop = '10px';
    inputField.style.padding = '10px';
    inputField.style.border = '1px solid #ccc';
    inputField.style.borderRadius = '4px';
    promptBox.appendChild(inputField);

    // Botão de confirmação
    const confirmButton = document.createElement('button');
    confirmButton.textContent = 'Confirmar';
    confirmButton.style.marginTop = '15px';
    confirmButton.style.padding = '10px 20px';
    confirmButton.style.backgroundColor = '#007BFF';
    confirmButton.style.color = '#fff';
    confirmButton.style.border = 'none';
    confirmButton.style.borderRadius = '4px';
    confirmButton.style.cursor = 'pointer';
    confirmButton.addEventListener('click', () => fecharPrompt(resolve, inputField.value));
    promptBox.appendChild(confirmButton);

    // Botão de cancelamento
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancelar';
    cancelButton.style.marginTop = '15px';
    cancelButton.style.marginLeft = '10px';
    cancelButton.style.padding = '10px 20px';
    cancelButton.style.backgroundColor = '#dc3545';
    cancelButton.style.color = '#fff';
    cancelButton.style.border = 'none';
    cancelButton.style.borderRadius = '4px';
    cancelButton.style.cursor = 'pointer';
    cancelButton.addEventListener('click', () => fecharPrompt(reject));
    promptBox.appendChild(cancelButton);

    promptContainer.appendChild(promptBox);
    document.body.appendChild(promptContainer);

    // Ativar a animação de entrada
    setTimeout(() => {
      promptContainer.style.opacity = '1';
      promptBox.style.transform = 'scale(1)';
    }, 10);

    // Função para fechar o prompt com animação
    function fecharPrompt(callback, value = null) {
      promptContainer.style.opacity = '0';
      promptBox.style.transform = 'scale(0.9)';
      setTimeout(() => {
        document.body.removeChild(promptContainer);
        callback(value);
      }, 300); // Tempo da transição
    }
  });
}