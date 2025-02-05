const CustomAlert = (function () {
    let originalAlert = window.alert; // Guarda a função original

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

    return {
        enable: function () {
            window.alert = function (message) {
                console.log("Interceptado:", message);
                createCustomAlert(message);
            };
        },
        disable: function () {
            window.alert = originalAlert; // Restaura o alert original
        }
    };
})();