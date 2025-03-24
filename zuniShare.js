const ZuniShare = (() => {
  async function shareImage(file, message = "Veja só essa imagem!") {
    if (!file) return alert("Selecione uma imagem!");

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const cv = Object.assign(document.createElement("canvas"), { width: img.width, height: img.height });
      const ctx = cv.getContext("2d");

      ctx.drawImage(img, 0, 0);

      // Escurece o fundo
      ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      ctx.fillRect(0, 0, img.width, img.height);

      // Configurações iniciais
      let fontSize = 30;
      let maxWidth = img.width * 0.8; // O texto não deve ultrapassar 80% da largura da imagem
      ctx.font = `bold ${fontSize}px Arial`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      let lines = [];

      // Função para dividir o texto em várias linhas
      function wrapText(text, maxWidth) {
        let words = text.split(" ");
        let line = "";
        let lineHeight = fontSize * 1.2; // Distância entre linhas

        for (let i = 0; i < words.length; i++) {
          let testLine = line + words[i] + " ";
          let testWidth = ctx.measureText(testLine).width;

          if (testWidth > maxWidth && i > 0) {
            lines.push(line); // Adiciona a linha atual
            line = words[i] + " "; // Inicia uma nova linha com a palavra atual
          } else {
            line = testLine; // Adiciona a palavra à linha atual
          }
        }
        lines.push(line); // Adiciona a última linha
        return lines;
      }

      // Ajuste de fonte para garantir que o texto caiba
      let textWidth = ctx.measureText(message).width;
      while (textWidth > maxWidth && fontSize > 10) {
        fontSize -= 2;
        ctx.font = `bold ${fontSize}px Arial`;
        textWidth = ctx.measureText(message).width;
      }

      lines = wrapText(message, maxWidth); // Divida o texto em várias linhas

      // Calcula a posição inicial para centralizar o texto
      let totalHeight = lines.length * fontSize * 1.2;
      let startY = (img.height - totalHeight) / 2;

      // Desenha as linhas de texto
      ctx.fillStyle = "white";
      lines.forEach((line, index) => {
        ctx.fillText(line, img.width / 2, startY + index * fontSize * 1.2);
      });

      // Cria o blob e compartilha a imagem
      cv.toBlob(blob => {
        const newFile = new File([blob], "imagem_compartilhada.jpg", { type: "image/jpeg" });

        if (navigator.canShare?.({ files: [newFile] })) {
          navigator.share({ files: [newFile] }).catch(console.error);
        } else {
          alert("Seu navegador não suporta compartilhamento de arquivos.");
        }
      }, "image/jpeg");
    };
  }

  return { shareImage };
})();