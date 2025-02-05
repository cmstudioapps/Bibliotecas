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

  // Adicionar estilos
  const styles = document.createElement("style");
  styles.innerHTML = `
    #custom-alert {
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
    #alert-ok {
      margin-top: 10px;
      padding: 5px 15px;
      border: none;
      background: blue;
      color: white;
      border-radius: 3px;
      cursor: pointer;
    }
    #alert-ok:hover {
      background: darkblue;
    }
  `;
  document.head.appendChild(styles);

  // Intercepta o alert padrão
  window.alert = function (message) {
    document.getElementById("alert-message").innerText = message;
    alertContainer.style.display = "flex";
  };

  // Fecha o alerta ao clicar no botão
  document.getElementById("alert-ok").addEventListener("click", function () {
    alertContainer.style.display = "none";
  });
})();