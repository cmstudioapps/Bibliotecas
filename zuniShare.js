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

      // Ajustar a fonte para caber na imagem
      let fontSize = 30;
      let maxWidth = img.width * 0.8; // O texto não deve ultrapassar 80% da largura da imagem
      ctx.font = `bold ${fontSize}px Arial`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // A medida do texto
      let textWidth = ctx.measureText(message).width;

      // Reduz o tamanho da fonte até o texto caber
      while (textWidth > maxWidth && fontSize > 10) {
        fontSize -= 2;
        ctx.font = `bold ${fontSize}px Arial`;
        textWidth = ctx.measureText(message).width;
      }

      // Centraliza o texto
      ctx.fillStyle = "white";
      ctx.fillText(message, img.width / 2, img.height / 2);

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