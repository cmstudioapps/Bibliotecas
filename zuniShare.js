const ZuniShare = (() => {
  // Importa a biblioteca assim que o script é carregado
  let htmlToImage;
  import("https://cdn.jsdelivr.net/npm/html-to-image/+esm")
    .then(module => {
      htmlToImage = module;
    })
    .catch(error => {
      console.error("Erro ao importar a biblioteca html-to-image:", error);
    });

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
      const cv = Object.assign(document.createElement("canvas"), { width: img.width, height: img.height });
      const ctx = cv.getContext("2d");

      ctx.drawImage(img, 0, 0);

      ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      ctx.fillRect(0, 0, img.width, img.height);

      let fontSize = 30;
      const maxWidth = img.width * 0.8;
      ctx.font = `bold ${fontSize}px Arial`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      let lines = [];
      function wrapText(text, maxWidth) {
        const words = text.split(" ");
        let line = "";
        for (let i = 0; i < words.length; i++) {
          const testLine = line + words[i] + " ";
          const testWidth = ctx.measureText(testLine).width;
          if (testWidth > maxWidth && i > 0) {
            lines.push(line);
            line = words[i] + " ";
          } else {
            line = testLine;
          }
        }
        lines.push(line);
        return lines;
      }

      let textWidth = ctx.measureText(message).width;
      while (textWidth > maxWidth && fontSize > 10) {
        fontSize -= 2;
        ctx.font = `bold ${fontSize}px Arial`;
        textWidth = ctx.measureText(message).width;
      }

      lines = wrapText(message, maxWidth);

      const totalHeight = lines.length * fontSize * 1.2;
      const startY = (cv.height - totalHeight) / 2;

      ctx.fillStyle = "white";
      lines.forEach((line, index) => {
        ctx.fillText(line, img.width / 2, startY + index * fontSize * 1.2);
      });

      cv.toBlob(blob => {
        const newFile = new File([blob], "imagem_compartilhada.jpg", { type: "image/jpeg" });
        if (navigator.canShare?.({ files: [newFile] })) {
          navigator.share({ files: [newFile] }).catch(console.error);
        } else {
          alert("Seu navegador não suporta compartilhamento de arquivos.");
        }
      }, "image/jpeg", 0.95);
    };

    img.onerror = () => {
      alert("Falha ao carregar a imagem. Verifique o URL ou o arquivo.");
    };
  }

  async function shareDivAsImage(divSelector, fileName = "compartilhado.png") {
    if (!htmlToImage) {
      return alert("A biblioteca html-to-image não foi carregada corretamente.");
    }

    const div = document.querySelector(divSelector);
    if (!div) return alert("Elemento não encontrado!");

    try {
      const dataUrl = await htmlToImage.toPng(div, {
        style: {
          backgroundColor: getComputedStyle(div).backgroundColor, // Captura a cor de fundo
          backgroundImage: getComputedStyle(div).backgroundImage, // Captura a imagem de fundo
          backgroundSize: getComputedStyle(div).backgroundSize,   // Captura o tamanho da imagem
          backgroundPosition: getComputedStyle(div).backgroundPosition, // Captura a posição da imagem
          backgroundRepeat: getComputedStyle(div).backgroundRepeat, // Captura o comportamento de repetição
        },
      });

      const img = new Image();
      img.src = dataUrl;

      img.onload = () => {
        const cv = Object.assign(document.createElement("canvas"), { width: img.width, height: img.height });
        const ctx = cv.getContext("2d");

        ctx.drawImage(img, 0, 0);

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