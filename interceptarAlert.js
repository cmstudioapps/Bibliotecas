(function () {
  // Criar o container do alerta customizado
  const alertContainer = document.createElement("div");
  alertContainer.id = "custom-alert";
  alertContainer.innerHTML = `
    <div class="alert-box">
      <p id="alert-message"></p>
      <button id="alert-ok">OK</button>
    </div>
  `;
  document.body.appendChild(alertContainer);

  // Criar o container do prompt customizado
  const promptContainer = document.createElement("div");
  promptContainer.id = "custom-prompt";
  promptContainer.innerHTML = `
    <div class="alert-box">
      <p id="prompt-message"></p>
      <input type="text" id="prompt-input" placeholder="Digite sua resposta" />
      <button id="prompt-ok">OK</button>
      <button id="prompt-cancel">Cancelar</button>
    </div>
  `;
  document.body.appendChild(promptContainer);

  // Adicionar estilos
  const styles = document.createElement("style");
  styles.innerHTML = `
    #custom-alert, #custom-prompt {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      display: none;
    }
    .alert-box {
      background: white;
      padding: 20px;
      border-radius: 5px;
      text-align: center;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    }
    #alert-ok, #prompt-ok, #prompt-cancel {
      margin-top: 10px;
      padding: 5px 15px;
      border: none;
      background: blue;
      color: white;
      border-radius: 3px;
      cursor: pointer;
    }
    #alert-ok:hover, #prompt-ok:hover, #prompt-cancel:hover {
      background: darkblue;
    }
    #prompt-input {
      margin-top: 10px;
      padding: 5px;
      border-radius: 3px;
      border: 1px solid #ccc;
      width: 100%;
    }
  `;
  document.head.appendChild(styles);

  // Intercepta o alert padrão
  window.alert = function (message) {
    document.getElementById("alert-message").innerText = message;
    alertContainer.style.display = "flex";
  };

  // Intercepta o prompt padrão
  window.prompt = function (message, defaultValue) {
    document.getElementById("prompt-message").innerText = message;
    const promptInput = document.getElementById("prompt-input");
    promptInput.value = defaultValue || "";
    promptContainer.style.display = "flex";

    return new Promise((resolve) => {
      document.getElementById("prompt-ok").addEventListener("click", function () {
        resolve(promptInput.value);
        promptContainer.style.display = "none";
      });
      
      document.getElementById("prompt-cancel").addEventListener("click", function () {
        resolve(null);
        promptContainer.style.display = "none";
      });
    });
  };

  // Fecha o alerta ao clicar no botão OK
  document.getElementById("alert-ok").addEventListener("click", function () {
    alertContainer.style.display = "none";
  });
})();