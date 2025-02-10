const ZuniNiver = {
    init: function () {
        this.injectStyles();
        let birthDate = localStorage.getItem("dataNascimento");

        if (!birthDate) {
            this.askBirthDate();
        } else {
            this.checkBirthday(birthDate);
        }
    },

    askBirthDate: function () {
        let date = prompt("Digite sua data de nascimento (YYYY-MM-DD):");
        if (date && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
            localStorage.setItem("dataNascimento", date);
        } else {
            alert("Formato inválido. Tente novamente.");
        }
    },

    checkBirthday: function (birthDate) {
        let today = new Date().toISOString().slice(5, 10); // Pega MM-DD
        let userDate = birthDate.slice(5, 10); // Pega MM-DD salvo

        if (today === userDate) {
            this.showBirthdayModal();
        }
    },

    showBirthdayModal: function () {
        let modal = document.createElement("div");
        modal.id = "zuniNiverModal";
        modal.innerHTML = `
            <div class="zuni-modal-content">
                <span class="zuni-close">&times;</span>
                <h2 id="h2">🎉 Feliz Aniversário</h2>
                <p>Que seu dia seja cheio de alegria e diversão! 🥳</p>
                <div class="zuni-balloons"></div>
                <canvas id="zuniConfetti"></canvas>
            </div>
        `;
        document.body.appendChild(modal);
    document.getElementById("h2").innerHTML += ` ${localStorage.getItem("nome") || ""}!🎂`
        // Toca o som de festa
        let audio = new Audio("https://www.fesliyanstudios.com/play-mp3/4384");
        audio.play();

        // Fecha o modal ao clicar no botão
        document.querySelector(".zuni-close").onclick = function () {
            modal.remove();
        };

        // Animações
        this.animateBalloons();
        this.startConfetti();
    },

    animateBalloons: function () {
        let balloonContainer = document.querySelector(".zuni-balloons");
        for (let i = 0; i < 10; i++) {
            let balloon = document.createElement("div");
            balloon.classList.add("zuni-balloon");
            balloon.style.left = Math.random() * 90 + "%";
            balloonContainer.appendChild(balloon);

            setTimeout(() => balloon.remove(), 5000);
        }
    },

    startConfetti: function () {
        const canvas = document.getElementById("zuniConfetti");
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let confetti = [];
        for (let i = 0; i < 100; i++) {
            confetti.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                size: Math.random() * 5 + 2,
                speed: Math.random() * 3 + 1,
                color: `hsl(${Math.random() * 360}, 100%, 50%)`
            });
        }

        function drawConfetti() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            confetti.forEach(p => {
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
                p.y += p.speed;
                if (p.y > canvas.height) p.y = -10;
            });
            requestAnimationFrame(drawConfetti);
        }

        drawConfetti();
    },

    injectStyles: function () {
        let style = document.createElement("style");
        style.innerHTML = `
            #zuniNiverModal {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 20px;
                text-align: center;
                border-radius: 10px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                z-index: 1000;
                animation: fadeIn 0.5s;
            }

            .zuni-modal-content {
                position: relative;
            }

            .zuni-close {
                position: absolute;
                top: 10px;
                right: 10px;
                font-size: 20px;
                cursor: pointer;
            }

            .zuni-balloons {
                position: relative;
                width: 100%;
                height: 100px;
                overflow: hidden;
            }

            .zuni-balloon {
                position: absolute;
                bottom: -50px;
                width: 20px;
                height: 30px;
                background: red;
                border-radius: 50%;
                animation: floatUp 5s linear infinite;
            }

            canvas#zuniConfetti {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
            }

            @keyframes floatUp {
                0% { transform: translateY(0); opacity: 1; }
                100% { transform: translateY(-150px); opacity: 0; }
            }

            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
};

// Inicia a biblioteca
setTimeout(()=> {

ZuniNiver.init();

},3000)
