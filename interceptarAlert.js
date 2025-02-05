const CustomAlert = (function () {
    let originalAlert = window.alert; // Guarda o alert original

    function createCustomAlert(message) {
        // Criar fundo escuro (overlay)
        const overlay = document.createElement("div");
        overlay.className = "custom-alert-overlay";

        // Criar alerta personalizado
        const customAlert = document.createElement("div");
        customAlert.className = "custom-alert";
        customAlert.innerHTML = `
            <p>${message}</p>
            <button id="close-alert">OK</button>
        `;

        // Adicionar alerta ao fundo escuro
        overlay.appendChild(customAlert);
        document.body.appendChild(overlay);

        // Fechar alerta ao clicar no botão "OK"
        document.getElementById("close-alert").onclick = function () {
            document.body.removeChild(overlay);
        };
    }

    function injectStyles() {
        const style = document.createElement("style");
        style.textContent = `
            .custom-alert-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                z-index: 999;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .custom-alert {
                background: white;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
                text-align: center;
                width: 300px;
            }
            .custom-alert p {
                margin-bottom: 15px;
            }
            .custom-alert button {
                background: #007bff;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
            }
            .custom-alert button:hover {
                background: #0056b3;
            }
        `;
        document.head.appendChild(style);
    }

    return {
        enable: function () {
            injectStyles(); // Injetar estilos antes de ativar
            window.alert = function (message) {
                console.log("Interceptado:", message);
                createCustomAlert(message);
            };
        },
        disable: function () {
            window.alert = originalAlert; // Restaurar alert padrão
        }
    };
})();