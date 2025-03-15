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
        userRef.onDisconnect().remove(); // Remove o nó do usuário quando ele sai
        onlineRef.onDisconnect().transaction((atual) => (atual || 0) - 1);

        // Atualiza o número de pessoas online no elemento "online"
        onlineRef.on("value", function (snapshot) {
            const quantidade = snapshot.val() || 0;
            const elemento = document.getElementById("online");
            if (elemento) {
                elemento.textContent += quantidade;
            }
        });
    });
})();