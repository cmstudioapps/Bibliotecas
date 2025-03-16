class ZuniRoad {
    constructor(options = {}) {
        this.container = options.container ? document.querySelector(options.container) : document.body;
        this.width = options.width || "90%";
        this.height = options.height || "200px";
        this.speed = options.speed || "1s";
        this.orientation = options.orientation || "horizontal"; // 'horizontal' ou 'vertical'
        this.x = options.x || "50%"; // Posição X
        this.y = options.y || "50%"; // Posição Y

        if (!this.container) {
            console.error("ZuniRoad.js: O container especificado não foi encontrado.");
            return;
        }

        this.createRoad();
    }

    createRoad() {
        // Criando a pista
        this.road = document.createElement("div");
        this.road.classList.add("zuni-road");

        // Definindo largura e altura com base na orientação
        if (this.orientation === "horizontal") {
            this.road.style.width = this.width;
            this.road.style.height = this.height;
        } else {
            this.road.style.width = this.height; // Inverte para vertical
            this.road.style.height = this.width; // Inverte para vertical
        }

        this.road.style.position = "relative";
        this.road.style.overflow = "hidden";

        // Criando as faixas centrais
        this.laneMarkings = document.createElement("div");
        this.laneMarkings.classList.add("zuni-lane-markings");
        this.laneMarkings.style.animationDuration = this.speed;

        // Ajustando as faixas centrais para orientação vertical
        if (this.orientation === "vertical") {
            this.laneMarkings.style.width = "4px";
            this.laneMarkings.style.height = "100%";
            this.laneMarkings.style.background = `
                repeating-linear-gradient(
                    to bottom,
                    transparent 0 20px,
                    yellow 20px 40px
                )`;
            this.laneMarkings.style.top = "0";
            this.laneMarkings.style.left = "50%";
            this.laneMarkings.style.transform = "translateX(-50%)";
        } else {
            this.laneMarkings.style.width = "100%";
            this.laneMarkings.style.height = "4px";
            this.laneMarkings.style.background = `
                repeating-linear-gradient(
                    to right,
                    transparent 0 20px,
                    yellow 20px 40px
                )`;
            this.laneMarkings.style.top = "50%";
            this.laneMarkings.style.left = "0";
            this.laneMarkings.style.transform = "translateY(-50%)";
        }

        // Criando as faixas laterais
        this.sideLineTop = document.createElement("div");
        this.sideLineTop.classList.add("zuni-side-lines", "zuni-top");
        this.sideLineTop.style.animationDuration = this.speed;

        this.sideLineBottom = document.createElement("div");
        this.sideLineBottom.classList.add("zuni-side-lines", "zuni-bottom");
        this.sideLineBottom.style.animationDuration = this.speed;

        // Ajustando as faixas laterais para orientação vertical
        if (this.orientation === "vertical") {
            this.sideLineTop.style.width = "10px";
            this.sideLineTop.style.height = "100%";
            this.sideLineTop.style.top = "0";
            this.sideLineTop.style.left = "-10px";

            this.sideLineBottom.style.width = "10px";
            this.sideLineBottom.style.height = "100%";
            this.sideLineBottom.style.top = "0";
            this.sideLineBottom.style.right = "-10px";
        } else {
            this.sideLineTop.style.width = "100%";
            this.sideLineTop.style.height = "10px";
            this.sideLineTop.style.top = "-10px";
            this.sideLineTop.style.left = "0";

            this.sideLineBottom.style.width = "100%";
            this.sideLineBottom.style.height = "10px";
            this.sideLineBottom.style.bottom = "-10px";
            this.sideLineBottom.style.left = "0";
        }

        // Criando a indicação "LPP"
        this.lpp = document.createElement("div");
        this.lpp.classList.add("zuni-lpp");
        this.lpp.innerText = "LPP";

        // Ajustando a posição do "LPP" para orientação vertical
        if (this.orientation === "vertical") {
            this.lpp.style.bottom = "30%";
            this.lpp.style.left = "-30px";
            this.lpp.style.transform = "rotate(-90deg)";
        } else {
            this.lpp.style.bottom = "-30px";
            this.lpp.style.left = "30%";
        }

        // Adicionando elementos à pista
        this.road.appendChild(this.laneMarkings);
        this.road.appendChild(this.sideLineTop);
        this.road.appendChild(this.sideLineBottom);
        this.road.appendChild(this.lpp);

        // Adicionando a pista ao container
        this.container.appendChild(this.road);

        this.injectStyles();
    }

    injectStyles() {
        const style = document.createElement("style");
        style.innerHTML = `
            .zuni-road {
                background-color: #4d4d4d;
                border-top: 10px solid yellow;
                border-bottom: 10px solid yellow;
            }

            .zuni-lane-markings {
                position: absolute;
                background-repeat: repeat;
                animation: zuni-move-lines linear infinite;
            }

            .zuni-side-lines {
                position: absolute;
                background: #ffff99;
                animation: zuni-move-lines linear infinite;
            }

            .zuni-lpp {
                position: absolute;
                color: white;
                font-family: Arial, sans-serif;
                font-size: 16px;
            }

            .zuni-lpp::before {
                content: '';
                position: absolute;
                width: 40px;
                height: 1px;
                background-color: white;
                top: 50%;
                left: -45px;
            }

            @keyframes zuni-move-lines {
                from {
                    background-position: 0 0;
                }
                to {
                    background-position: ${this.orientation === "horizontal" ? "-40px 0" : "0 -40px"};
                }
            }
        `;
        document.head.appendChild(style);
    }
}