(function () {
    document.addEventListener("DOMContentLoaded", function () {
        if (!firebase || !firebase.database) {
            console.error("Firebase não foi carregado corretamente.");
            return;
        }

        const db = firebase.database();
        const onlineRef = db.ref("pessoas_online");
        const userRef = db.ref("usuarios_online").push(); // Criar um nó único para cada usuário

        function atualizarOnline(delta) {
            onlineRef.transaction((atual) => (atual || 0) + delta);
        }

        // Adiciona +1 ao entrar
        atualizarOnline(1);

        // Remove -1 automaticamente quando o usuário sai
        userRef.set(true);
        userRef.onDisconnect().remove(); // Remove o nó do usuário ao sair
        onlineRef.onDisconnect().transaction((atual) => (atual || 0) - 1);

        // Função para atualizar o número na tela
        function atualizarNumeroOnline(valor) {
            let elemento = document.getElementById("online");
            if (!elemento) {
                // Tentar novamente após um pequeno atraso se o elemento não existir ainda
                setTimeout(() => atualizarNumeroOnline(valor), 100);
                return;
            }
            elemento.textContent = valor;
        }

        // Atualiza automaticamente o elemento "online"
        onlineRef.on("value", function (snapshot) {
            const quantidade = snapshot.val() || 0;
            atualizarNumeroOnline(quantidade);
        });
    });
})();