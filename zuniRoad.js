class ZuniRoad {
    constructor(options = {}) {
        this.width = options.width || "90%";
        this.height = options.height || "200px";
        this.speed = options.speed || "1s";
        this.orientation = options.orientation || "horizontal"; // 'horizontal' ou 'vertical'
        this.x = options.x || "50%"; // Posição X
        this.y = options.y || "50%"; // Posição Y

        this.createRoad();
    }

    createRoad() {
        // Criando a pista
        this.road = document.createElement("div");
        this.road.classList.add("zuni-road");
        this.road.style.width = this.orientation === "horizontal" ? this.width : this.height;
        this.road.style.height = this.orientation === "horizontal" ? this.height : this.width;
        this.road.style.left = typeof this.x === "number" ? `${this.x}px` : this.x;
        this.road.style.top = typeof this.y === "number" ? `${this.y}px` : this.y;
        this.road.style.transform = this.orientation === "vertical" ? "rotate(90deg)" : "none";

        // Criando as faixas centrais
        this.laneMarkings = document.createElement("div");
        this.laneMarkings.classList.add("zuni-lane-markings");
        this.laneMarkings.style.animationDuration = this.speed;

        // Criando as faixas laterais
        this.sideLineTop = document.createElement("div");
        this.sideLineTop.classList.add("zuni-side-lines", "zuni-top");
        this.sideLineTop.style.animationDuration = this.speed;

        this.sideLineBottom = document.createElement("div");
        this.sideLineBottom.classList.add("zuni-side-lines", "zuni-bottom");
        this.sideLineBottom.style.animationDuration = this.speed;

        // Criando a indicação "LPP"
        this.lpp = document.createElement("div");
        this.lpp.classList.add("zuni-lpp");
        this.lpp.innerText = "LPP";

        // Adicionando elementos à pista
        this.road.appendChild(this.laneMarkings);
        this.road.appendChild(this.sideLineTop);
        this.road.appendChild(this.sideLineBottom);
        this.road.appendChild(this.lpp);

        // Adicionando a pista ao corpo da página
        document.body.appendChild(this.road);

        this.injectStyles();
    }

    injectStyles() {
        const style = document.createElement("style");
        style.innerHTML = `
            .zuni-road {
                position: absolute;
                background-color: #4d4d4d;
                border-top: 10px solid yellow;
                border-bottom: 10px solid yellow;
                overflow: hidden;
                transform-origin: center;
            }

            .zuni-lane-markings {
                position: absolute;
                top: 50%;
                left: 0;
                width: 100%;
                height: 4px;
                background: repeating-linear-gradient(
                    to right,
                    transparent 0 20px,
                    yellow 20px 40px
                );
                transform: translateY(-50%);
                animation: zuni-move-lines linear infinite;
            }

            .zuni-side-lines {
                position: absolute;
                width: 100%;
                height: 10px;
                background: #ffff99;
                animation: zuni-move-lines linear infinite;
            }

            .zuni-top {
                top: -10px;
            }

            .zuni-bottom {
                bottom: -10px;
            }

            .zuni-lpp {
                position: absolute;
                bottom: -30px;
                left: 30%;
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
                    background-position: -40px 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}