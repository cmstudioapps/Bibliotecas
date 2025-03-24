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

      // Configura o texto
      ctx.fillStyle = "white";
      ctx.font = "bold 30px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Centraliza a mensagem
      ctx.fillText(message, img.width / 2, img.height / 2);

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