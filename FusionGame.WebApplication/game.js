






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

        this.areaWidth = window.innerWidth;
        this.areaHeight = window.innerHeight;

        this.context = this.canvas.getContext("2d");
        this.context.scale(this.resolutionFactor, this.resolutionFactor);

        this.graphics = new GraphicsContext(this.context);

        this.targetPosition = new Vector2D(this.areaWidth / 2, this.areaHeight * 0.2);
        this.target = new Helium3Nucleus();
        this.target.centre = this.targetPosition;
        this.target.showLabel = true;
          

    }

    update(timeDelta) {
        this.time += timeDelta;

        this.entities = this.entities.filter(e => e.centre.y > -200 && e.centre.y < 2000 && e.centre.x > -200 && e.centre.x < 4000);
        
        for (let e of this.entities) {
            e.update(   this.time, timeDelta);
        }

        this.target.update(this.time, timeDelta);
    }

    keyDown(e) {
        if (e.code == "ArrowUp" || e.code == "Space") {

            var e1 = new Vector2D(this.areaWidth / 2, this.areaHeight * 0.8);

            var p = new Proton();

            p.centre = e1;
            p.velocity.x = Math.random() * 100 - 50;
            p.velocity.y = -1000;

            this.entities.push(p);
        }
    }


    keyUp(e) {
    }

    draw() {
        this.graphics.clear(this.canvas.width, this.canvas.height, "white");

        for (let e of this.entities) {
            e.draw(this.graphics);
        }

        this.target.draw(this.graphics);
    }
}












