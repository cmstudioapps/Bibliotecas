(function () {
    // Aguarde o Firebase ser carregado
    document.addEventListener("DOMContentLoaded", function () {
        if (!firebase || !firebase.database) {
            console.error("Firebase não foi carregado corretamente.");
            return;
        }

        const db = firebase.database();
        const onlineRef = db.ref("pessoas_online");

        function atualizarOnline(delta) {
            onlineRef.transaction((atual) => (atual || 0) + delta);
        }

        // Quando entra, soma +1
        atualizarOnline(1);

        // Quando sai, subtrai -1
        window.addEventListener("beforeunload", function () {
            atualizarOnline(-1);
        });
    });
})();