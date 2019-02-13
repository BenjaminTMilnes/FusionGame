






class Game {
    constructor(canvasId) {
        this.canvasId = canvasId;
        this.entities = [];

        this.time = 0;
    }

    initialise() {
        this.canvas = document.getElementById(this.canvasId);
        this.canvasLeft = this.canvas.getBoundingClientRect().left;
        this.canvasTop = this.canvas.getBoundingClientRect().top;

        this.resolutionFactor = 4;

        this.canvas.width = window.innerWidth * this.resolutionFactor;
        this.canvas.height = window.innerHeight * this.resolutionFactor;

        this.canvas.style.width = window.innerWidth + "px";
        this.canvas.style.height = window.innerHeight + "px";

        this.context = this.canvas.getContext("2d");
        this.context.scale(this.resolutionFactor, this.resolutionFactor);
    }

    update(timeDelta) {
        this.time += timeDelta;
    }

    draw() {

    }
}












