






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

        this.resolutionFactor = 3;

        this.canvas.width = window.innerWidth * this.resolutionFactor;
        this.canvas.height = window.innerHeight * this.resolutionFactor;

        this.canvas.style.width = window.innerWidth + "px";
        this.canvas.style.height = window.innerHeight + "px";

        this.areaWidth = window.innerWidth;
        this.areaHeight = window.innerHeight;

        this.context = this.canvas.getContext("2d");
        this.context.scale(this.resolutionFactor, this.resolutionFactor);
        this.context.imageSmoothingQuality = "high";

        this.graphics = new GraphicsContext(this.context);

        this.targetPosition = new Vector2D(this.areaWidth / 2, this.areaHeight * 0.2);
        this.target = new Helium3Nucleus();
        this.target.centre = this.targetPosition;
        this.target.showLabel = true;

        this.chamber = new Chamber( this);
        this.chamber.position = new Vector2D(this.areaWidth / 2, this.areaHeight * 0.8);

    }

    update(timeDelta) {
        this.time += timeDelta;

        this.entities = this.entities.filter(e => e.centre.y > -200 && e.centre.y < 2000 && e.centre.x > -200 && e.centre.x < 4000);

        for (let e of this.entities) {
            e.force = new Vector2D();

            for (let g of this.entities) {
                var r = ds(e.centre, g.centre);

                if (r > 5 && !isNaN(r)) {
                    var u = e.centre.subtract(g.centre).u;
                    var f = 100 * e.charge * g.charge / Math.pow(r, 2);

                    e.force = e.force.add(u.times(f));
                }

            }
            var r = ds(e.centre, this.target.centre);

            if (r > 5 && !isNaN(r)) {
                var u = e.centre.subtract(this.target.centre).u;
                var f = 80000 * e.charge * this.target.charge / Math.pow(r, 2);

                e.force = e.force.add(u.times(f));
            }


            e.update(this.time, timeDelta);
        }

        this.target.update(this.time, timeDelta);

        this.chamber.update(this.time, timeDelta);
    }

    keyDown(e) {  
        this.chamber.keyDown(e);
    }


    keyUp(e) {
    }

    draw() {
        this.graphics.clear(this.canvas.width, this.canvas.height, "white");

        for (let e of this.entities) {
            e.draw(this.graphics);
        }

        this.target.draw(this.graphics);
        this.chamber.draw(this.graphics);
    }
}












