const ZuniShare = (() => {
  async function shareImage(imagem, message = "Veja só essa imagem!") {
    if (!imagem) return alert("Selecione uma imagem válida!");

    const img = new Image();

    // Se for um arquivo local
    if (imagem instanceof File) {
      img.src = URL.createObjectURL(imagem);
    } else if (typeof imagem === "string" && imagem.startsWith("http")) {
      // Se for uma URL
      img.src = imagem;
    } else {
      return alert("Formato de imagem não suportado.");
    }

    img.onload = () => {
      // Calcula a largura e altura originais da imagem
      const originalWidth = img.width;
      const originalHeight = img.height;

      // Calcula o canvas com a mesma largura e altura da imagem original
      const cv = Object.assign(document.createElement("canvas"), { width: img.width, height: img.height });
      const ctx = cv.getContext("2d");

      ctx.drawImage(img, 0, 0);

      // Escurece o fundo
      ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      ctx.fillRect(0, 0, img.width, img.height);

      // Ajustar a fonte para caber na imagem
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

      // Calcula a altura necessária para acomodar o texto
      let totalHeight = lines.length * fontSize * 1.2;

      // Se a altura do texto exceder a altura da imagem original, estique a imagem
      if (totalHeight > img.height) {
        cv.height = totalHeight; // Ajusta a altura do canvas
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width, totalHeight); // Redimensiona a imagem no canvas
      }

      // Calcula a posição inicial para centralizar o texto
      let startY = (cv.height - totalHeight) / 2;

      // Desenha as linhas de texto
      ctx.fillStyle = "white";
      lines.forEach((line, index) => {
        ctx.fillText(line, img.width / 2, startY + index * fontSize * 1.2);
      });

      // Cria o blob com qualidade alta para o JPEG
      cv.toBlob(blob => {
        const newFile = new File([blob], "imagem_compartilhada.jpg", { type: "image/jpeg" });

        if (navigator.canShare?.({ files: [newFile] })) {
          navigator.share({ files: [newFile] }).catch(console.error);
        } else {
          alert("Seu navegador não suporta compartilhamento de arquivos.");
        }
      }, "image/jpeg", 0.95); // 0.95 para qualidade alta (pode variar de 0 a 1)
    };

    img.onerror = () => {
      alert("Falha ao carregar a imagem. Verifique o URL ou o arquivo.");
    };
  }

  async function shareDivAsImage(divSelector, fileName = "compartilhado.png") {
    const div = document.querySelector(divSelector);
    if (!div) return alert("Elemento não encontrado!");

    try {
      const { toPng } = await import("https://cdn.jsdelivr.net/npm/html-to-image/+esm");
      const dataUrl = await toPng(div);

      const img = new Image();
      img.src = dataUrl;

      img.onload = () => {
        const cv = Object.assign(document.createElement("canvas"), { width: img.width, height: img.height });
        const ctx = cv.getContext("2d");

        ctx.drawImage(img, 0, 0);

        // Gera o arquivo Blob
        cv.toBlob(blob => {
          const newFile = new File([blob], fileName, { type: "image/png" });

          if (navigator.canShare?.({ files: [newFile] })) {
            navigator.share({ files: [newFile] }).catch(console.error);
          } else {
            alert("Seu navegador não suporta compartilhamento de arquivos.");
          }
        }, "image/png");
      };
    } catch (error) {
      console.error("Erro ao converter o elemento em imagem:", error);
    }
  }

  return { shareImage, shareDivAsImage };
})();