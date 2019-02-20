
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
        this.target = new Proton();
        this.target.centre = this.targetPosition;
        this.target.showLabel = true;

        this.chamber = new Chamber(this);
        this.chamber.position = new Vector2D(this.areaWidth / 2, this.areaHeight * 0.8);

        this.lastFuse = 0;

        this.fusionReactions = [
            ["p+", "p+", 0.9, "2,2 He", []],
            ["1,2 H", "p+", 0.9, "2,3 He", []],
            ["2,3 He", "2,3 He", 0.9, "2,6 He", []],
            ["2,3 He", "2,4 He", 0.9, "4,7 Be", []],
            ["4,7 Be", "e-", 0.9, "3,7 Li", []],
            ["3,7 Li", "p+", 0.9, "4,8 Be", []]
        ];

        this.decayReactions = [
            ["2,2 He", 0.2, "p+", ["p+"]],
            ["2,2 He", 0.9, "1,2 H", ["e+"]],
            ["1,3 H", 0.9, "2,3 He", ["e-"]],
            ["2,5 He", 0.5, "2,4 He", ["n"]],
            ["2,6 He", 0.9, "2,4 He", ["p+", "p+"]],
            ["2,7 He", 0.9, "2,6 He", ["n"]],
            ["4,8 Be", 0.1, "2,4 He", ["2,4 He"]]
        ];

        this.particles = [
            [new Proton(), Proton],
            [new Neutron(), Neutron],
            [new Electron(), Electron],
            [new Positron(), Positron],
            [new Diproton(), Diproton],
            [new DeuteriumNucleus(), DeuteriumNucleus],
            [new TritiumNucleus(), TritiumNucleus],
            [new Helium3Nucleus(), Helium3Nucleus],
            [new Helium4Nucleus(), Helium4Nucleus],
            [new Helium5Nucleus(), Helium5Nucleus],
            [new Helium6Nucleus(), Helium6Nucleus],
            [new Helium7Nucleus(), Helium7Nucleus],
            [new Lithium7Nucleus(), Lithium7Nucleus],
            [new Beryllium7Nucleus(), Beryllium7Nucleus],
            [new Beryllium8Nucleus(), Beryllium8Nucleus]
        ];

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
            var u = particle2.centre.subtract(particle1.centre).u;
            var f = coulombConstant * particle1.charge * particle2.charge / Math.pow(r, 2);

            return u.times(-f);
        }
        else {
            return new Vector2D();
        }
    }

    getParticleByType(type) {
        return new (this.particles.filter(p => p[0].type == type)[0][1])();
    }

    attemptFuse(particle) {

        var hasFused = false;

        this.fusionReactions.forEach(reaction => {
            if (((this.target.type == reaction[0] && particle.type == reaction[1]) || (this.target.type == reaction[1] && particle.type == reaction[0])) && Math.random() < reaction[2] && !hasFused) {
                this.target = this.getParticleByType(reaction[3]);

                this.target.centre = this.targetPosition;
                this.target.showLabel = true;

                particle.centre.y = -2000;
                particle.velocity = new Vector2D();

                var u1 = new Vector2D(0, 15);

                for (var i = 0; i < reaction[4].length; i++) {
                    u1 = u1.rotate(Math.random() * 360);

                    var p = this.getParticleByType(reaction[4][i]);

                    p.centre = this.targetPosition.add(u1);
                    p.velocity = u1.times(Math.random() * 100 + 100);

                    this.entities.push(p);
                }

                this.lastFuse = this.time;
                this.hasFused = true;
            }
        });
    }

    attemptDecay() {
        var products = [];

        if (this.time - this.lastFuse < 500) {
            return;
        }

        var hasDecayed = false;

        this.decayReactions.forEach(reaction => {
            if (this.target.type == reaction[0] && Math.random() < reaction[1] && ! hasDecayed) {
                this.target = this.getParticleByType(reaction[2]);

                this.target.centre = this.targetPosition;
                this.target.showLabel = true;

                reaction[3].forEach(product => {
                    products.push(this.getParticleByType(product));
                });

                hasDecayed = true;
            }
        });

        var u1 = new Vector2D(0, 15);

        products.forEach(p => {
            u1 = u1.rotate(Math.random() * 360);

            p.centre = this.targetPosition.add(u1);
            p.velocity =  u1.times(Math.random() * 100 + 100);

            this.entities.push(p);
        });
    }

    resetTarget() {
        this.target = this.getParticleByType("p+");
        this.target.centre = this.targetPosition;
        this.target.showLabel = true;
    }

    keyDown(e) {  
        this.chamber.keyDown(e);

        e.preventDefault();
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












