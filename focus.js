class TutorialFocus {
    constructor() {
        this.overlay = document.createElement("div");
        this.overlay.style.position = "fixed";
        this.overlay.style.top = 0;
        this.overlay.style.left = 0;
        this.overlay.style.width = "100vw";
        this.overlay.style.height = "100vh";
        this.overlay.style.background = "rgba(0, 0, 0, 0.7)";
        this.overlay.style.zIndex = 999;
        this.overlay.style.pointerEvents = "none";
        document.body.appendChild(this.overlay);
    }

    focusElement(selector, options = {}) {
        const element = document.querySelector(selector);
        if (!element) return;

        const { color = "blue", pulse = true, message = "" } = options;
        const rect = element.getBoundingClientRect();

        // Criar um destaque ao redor do elemento
        const highlight = document.createElement("div");
        highlight.style.position = "absolute";
        highlight.style.top = `${rect.top + window.scrollY}px`;
        highlight.style.left = `${rect.left + window.scrollX}px`;
        highlight.style.width = `${rect.width}px`;
        highlight.style.height = `${rect.height}px`;
        highlight.style.borderRadius = "5px";
        highlight.style.boxShadow = `0 0 15px 5px ${color}`;
        highlight.style.zIndex = 1002;
        highlight.style.pointerEvents = "none";
        document.body.appendChild(highlight);

        // Criar tooltip para a mensagem
        if (message) {
            const tooltip = document.createElement("div");
            tooltip.innerText = message;
            tooltip.style.position = "absolute";
            tooltip.style.top = `${rect.top + window.scrollY - 50}px`;
            tooltip.style.left = `${rect.left + window.scrollX}px`;
            tooltip.style.background = "white";
            tooltip.style.color = "black";
            tooltip.style.padding = "8px 12px";
            tooltip.style.borderRadius = "5px";
            tooltip.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.2)";
            tooltip.style.zIndex = 1004; // Maior que o overlay e o destaque
            tooltip.style.fontSize = "14px";
            tooltip.style.fontWeight = "bold";
            tooltip.style.whiteSpace = "nowrap";
            document.body.appendChild(tooltip);
            this.tooltip = tooltip;
        }

        // Reduz o z-index de todos os outros elementos, menos o selecionado e o tooltip
        document.querySelectorAll("*").forEach(el => {
            if (el !== element && el !== this.overlay && el !== this.tooltip) {
                el.style.zIndex = "0";
            }
        });

        // Ajusta o z-index do elemento para destacá-lo
        element.style.position = "relative";
        element.style.zIndex = 1003;

        // Animação de brilho pulsante opcional
        if (pulse) {
            highlight.style.animation = "pulseEffect 1.5s infinite alternate";
            const styleSheet = document.styleSheets[0];
            styleSheet.insertRule(`
                @keyframes pulseEffect {
                    0% { box-shadow: 0 0 10px 3px ${color}; }
                    100% { box-shadow: 0 0 20px 10px ${color}; }
                }
            `, styleSheet.cssRules.length);
        }

        this.currentHighlight = highlight;
    }

    removeFocus() {
        if (this.currentHighlight) {
            this.currentHighlight.remove();
            this.currentHighlight = null;
        }
        if (this.tooltip) {
            this.tooltip.remove();
            this.tooltip = null;
        }
        this.overlay.remove();
    }
}