
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

    // Estilos personalizados
    const style = document.createElement('style');
    style.innerHTML = `
        .prompt-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }

        .prompt-box {
            background: linear-gradient(to right, #6a1b9a, #2196f3, #e91e63);
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 300px;
            color: white;
        }

        .prompt-box input {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: 2px solid #fff;
            border-radius: 5px;
            background-color: transparent;
            color: white;
            font-size: 16px;
        }

        .prompt-buttons {
            display: flex;
            justify-content: space-between;
            width: 100%;
        }

        .prompt-buttons button {
            padding: 10px;
            margin: 5px;
            border: none;
            background: white;
            color: #6a1b9a;
            font-weight: bold;
            border-radius: 5px;
            cursor: pointer;
            transition: background 0.3s;
        }

        .prompt-buttons button:hover {
            background: #e91e63;
            color: white;
        }

        .prompt-buttons button:focus {
            outline: none;
        }
    `;
    document.head.appendChild(style);

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