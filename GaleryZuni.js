(async function() {
    // Verifica se Firebase está carregado
    if (typeof firebase === 'undefined') {
        console.error("Firebase SDK não carregado. Verifique se os scripts foram incluídos corretamente.");
        return;
    }

    const firebaseConfig = {
        apiKey: "AIzaSyCiHC6f...",
        authDomain: "zuni-2.firebaseapp.com",
        databaseURL: "https://zuni-2-default-rtdb.firebaseio.com",
        projectId: "zuni-2",
        storageBucket: "zuni-2.appspot.com",
        messagingSenderId: "582252667939",
        appId: "1:582252667939:web:d922f70e05ed3077cd7d96"
    };

    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();

    let videos = [];

    function loadVideos() {
        const videosRef = database.ref('videos');
        videosRef.on('value', snapshot => {
            const data = snapshot.val();
            videos = data ? Object.values(data) : [];
        });
    }

    function showNextVideo() {
        if (videos.length === 0) return;

        const randomIndex = Math.floor(Math.random() * videos.length);
        const videoElement = document.getElementById('galeryZuniVideo');

        if (videoElement) {
            videoElement.src = 'data:video/mp4;base64,' + videos[randomIndex].video;
            videoElement.play();
            document.getElementById('galeryZuniModal').style.display = 'flex';
        }
    }

    function closeVideoModal() {
        const modal = document.getElementById('galeryZuniModal');
        if (modal) {
            modal.style.display = 'none';
            document.getElementById('galeryZuniVideo').pause();
        }
    }

    function createVideoModal() {
        const modal = document.createElement('div');
        modal.id = "galeryZuniModal";
        modal.innerHTML = `
            <div id="galeryZuniOverlay">
                <div id="galeryZuniContent">
                    <span id="galeryZuniClose">&times;</span>
                    <video id="galeryZuniVideo" controls autoplay></video>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        document.getElementById('galeryZuniClose').onclick = closeVideoModal;

        // Adiciona estilos CSS diretamente no JavaScript
        const style = document.createElement('style');
        style.innerHTML = `
            #galeryZuniModal {
                display: none;
                position: fixed;
                top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0, 0, 0, 0.8);
                justify-content: center;
                align-items: center;
                z-index: 9999;
            }
            #galeryZuniOverlay {
                width: 90%;
                max-width: 800px;
                background: #000;
                border-radius: 10px;
                padding: 20px;
                position: relative;
            }
            #galeryZuniVideo {
                width: 100%;
                height: auto;
                border-radius: 10px;
            }
            #galeryZuniClose {
                position: absolute;
                top: 10px; right: 15px;
                color: #fff;
                font-size: 30px;
                cursor: pointer;
            }
        `;
        document.head.appendChild(style);

        loadVideos();
    }

    createVideoModal();

    // Expor função para abrir o modal
    window.playGaleryZuni = showNextVideo;
})();