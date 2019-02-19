
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
        this.target =  new Proton();
        this.target.centre = this.targetPosition;
        this.target.showLabel = true;

        this.chamber = new Chamber( this);
        this.chamber.position = new Vector2D(this.areaWidth / 2, this.areaHeight * 0.8);

        this.lastFuse = 0;

    }

    isPointOutsideGameBoundary(p) {
        var margin = 100;

        return p.x < -margin || p.x > this.canvas.width + margin || p.y < -margin || p.y > this.canvas.height + margin;
    }

    isPointInsideGameBoundary(p) {
        return !this.isPointOutsideGameBoundary(p);
    }

    removeDistantParticles() {
        for (var i = 0; i < this.entities.length; i++) {
            var entity = this.entities[i];

            if (this.isPointOutsideGameBoundary(entity.centre)) {
                this.entities.splice(i, 1);
            }
        }

        console.log(this.entities.length);
    }

    update(timeDelta) {
        this.time += timeDelta;

        this.removeDistantParticles();

        for (let e of this.entities) {
            e.force = new Vector2D();

            for (let g of this.entities) {
                var f = this.calculateElectrostaticForce(e, g);

            e.force = e.force.add(f);               
            }

            var f = this.calculateElectrostaticForce(e, this.target);

            e.force = e.force.add(f);

            var r = ds(e.centre, this.target.centre);

            if (r < 10) {
                this.attemptFuse(e);
            }
            
            e.update(this.time, timeDelta);
        }

        this.attemptDecay();

        this.target.update(this.time, timeDelta);
        this.chamber.update(this.time, timeDelta);
    }

    calculateElectrostaticForce(particle1, particle2) {
        var coulombConstant = 90000;
        var minimumInteractionDistance = 3;

        var r = ds(particle1.centre, particle2.centre);

        if (r > minimumInteractionDistance) {
            var u = particle1.centre.subtract(particle2.centre).u;
            var f = coulombConstant * particle1.charge * particle2.charge / Math.pow(r, 2);

            return u.times(f);
        }
        else {
            return new Vector2D();
        }
    }

    attemptFuse(particle) {

        if (particle.type == "Proton" && this.target.type == "Proton" && Math.random() < 0.9) {
            this.target = new Diproton();

            particle.centre.y = -2000;
            particle.velocity = new Vector2D();

            this.lastFuse = this.time;
        }
        else if (particle.type == "Proton" && this.target.type == "Deuterium Nucleus" && Math.random() < 0.9) {
            this.target = new Helium3Nucleus();

            particle.centre.y = -2000;
            particle.velocity = new Vector2D();

            this.lastFuse = this.time;
        }
        else if (particle.type == "Helium-3 Nucleus" && this.target.type == "Helium-3 Nucleus" && Math.random() < 0.9) {
            this.target = new Helium4Nucleus();

            particle.centre.y = -2000;
            particle.velocity = new Vector2D();

            var r1 = new RotationMatrix2D(Math.random() * 360);
            var u1 = new Vector2D(0, 15);

            for (var i = 0; i < 2; i++) {

                var p = new Proton();

                p.centre = this.targetPosition.add(r1.times(u1));
                p.velocity = r1.times(u1).times(Math.random() * 100);

                this.entities.push(p);
            }

            this.lastFuse = this.time;
        }

        this.target.centre = this.targetPosition;
        this.target.showLabel = true;

    }

    attemptDecay() {

        var r1 = new RotationMatrix2D(Math.random() * 360);
        var u1 = new Vector2D(0, 15);
        var products = [];


        if (this.time - this.lastFuse < 500) {
            return;
        }

        if (this.target.type == "Diproton" && Math.random() < 0.5) {
            this.target = new Proton();

            var p = new Proton();

            products.push(p);
        }

        if (this.target.type == "Diproton" && Math.random() < 0.5) {
            this.target = new DeuteriumNucleus();

            var p = new Positron();

            products.push(p);
        }

        products.forEach(p => {

            p.centre = this.targetPosition.add(r1.times(u1));
            p.velocity = r1.times(u1).times(Math.random() * 100);

            this.entities.push(p);

        });

        this.target.centre = this.targetPosition;
        this.target.showLabel = true;

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












