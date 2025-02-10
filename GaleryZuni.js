(async function() {
    const firebaseConfig = {
        apiKey: "AIzaSyCiHC6f...",
        authDomain: "zuni-2.firebaseapp.com",
        databaseURL: "https://zuni-2-default-rtdb.firebaseio.com",
        projectId: "zuni-2",
        storageBucket: "zuni-2.appspot.com",
        messagingSenderId: "582252667939",
        appId: "1:582252667939:web:d922f70e05ed3077cd7d96"
    };

    const app = firebase.initializeApp(firebaseConfig);
    const database = firebase.database();

    let videos = [];

    function loadVideos() {
        const videosRef = database.ref('videos');
        videosRef.on('value', snapshot => {
            const data = snapshot.val();
            videos = data ? Object.values(data) : [];
            if (videos.length > 0) {
                showNextVideo();
            }
        });
    }

    function showNextVideo() {
        if (videos.length === 0) return;

        const randomIndex = Math.floor(Math.random() * videos.length);
        const videoElement = document.getElementById('galeryZuniVideo');

        if (videoElement) {
            videoElement.src = 'data:video/mp4;base64,' + videos[randomIndex].video;
            videoElement.play();
        }
    }

    function createVideoPlayer() {
        const container = document.createElement('div');
        container.innerHTML = `
            <div id="galeryZuniContainer" style="position:fixed;bottom:10px;right:10px;width:300px;height:200px;background:#000;border-radius:10px;overflow:hidden;">
                <video id="galeryZuniVideo" controls style="width:100%;height:100%;"></video>
            </div>
        `;
        document.body.appendChild(container);
        loadVideos();
    }

    createVideoPlayer();
})();