// promptLibrary.js
(function() {
    const promptOverlay = document.createElement('div');
    promptOverlay.classList.add('prompt-overlay');

    const promptBox = document.createElement('div');
    promptBox.classList.add('prompt-box');

    const input = document.createElement('input');
    input.type = 'text';

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('prompt-buttons');

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancelar';

    const confirmButton = document.createElement('button');
    confirmButton.textContent = 'Confirmar';

    buttonContainer.append(cancelButton, confirmButton);
    promptBox.append(input, buttonContainer);
    promptOverlay.appendChild(promptBox);
    document.body.appendChild(promptOverlay);

    let resolveCallback;
    let rejectCallback;

    // Função para exibir o prompt
    window.customPrompt = function(message = 'Digite algo...', placeholder = '') {
        return new Promise((resolve, reject) => {
            input.placeholder = placeholder;
            promptOverlay.style.display = 'flex';
            input.value = ''; // Limpa o valor antigo

            resolveCallback = resolve;
            rejectCallback = reject;

            // Define o texto do prompt
            promptBox.insertBefore(document.createTextNode(message), input);

            // Ao clicar em "Confirmar"
            confirmButton.onclick = function() {
                promptOverlay.style.display = 'none';
                resolveCallback(input.value);
            };

            // Ao clicar em "Cancelar"
            cancelButton.onclick = function() {
                promptOverlay.style.display = 'none';
                rejectCallback();
            };
        });
    };
})();