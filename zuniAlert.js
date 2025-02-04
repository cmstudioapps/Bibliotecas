// Criação da função global zuniAlert
function zuniAlert(mensagem, callbackOK) {
    // Verificar se o alert já existe para evitar duplicatas
    if (document.querySelector('.zuni-alert-container')) return;

    // Criar o container do alerta
    const alertContainer = document.createElement('div');
    alertContainer.className = 'zuni-alert-container';
    alertContainer.innerHTML = `
        <div class="zuni-alert-box">
            <div class="zuni-alert-message">${mensagem}</div>
            <button class="zuni-alert-ok">OK</button>
            <div class="zuni-watermark">Zuni</div>
        </div>
    `;

    // Adicionar o alerta ao body
    document.body.appendChild(alertContainer);

    // Event listener para o botão OK
    document.querySelector('.zuni-alert-ok').addEventListener('click', () => {
        document.body.removeChild(alertContainer); // Remover o alerta
        if (typeof callbackOK === 'function') callbackOK(); // Executar função callback se fornecida
    });
}

// Estilo do alerta (inserido diretamente via JS para ser autossuficiente)
const style = document.createElement('style');
style.innerHTML = `
    .zuni-alert-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    }

    .zuni-alert-box {
        background: linear-gradient(135deg, #6a0dad, #1e90ff, #ff69b4);
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        text-align: center;
        position: relative;
        color: #fff;
        font-family: Arial, sans-serif;
        min-width: 300px;
        animation: fadeIn 0.3s ease;
    }

    .zuni-alert-message {
        font-size: 18px;
        margin-bottom: 20px;
    }

    .zuni-alert-ok {
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: #fff;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        transition: background 0.3s;
    }

    .zuni-alert-ok:hover {
        background: rgba(255, 255, 255, 0.4);
    }

    .zuni-watermark {
        position: absolute;
        bottom: 5px;
        right: 10px;
        font-size: 12px;
        opacity: 0.5;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.8); }
        to { opacity: 1; transform: scale(1); }
    }
`;
document.head.appendChild(style);