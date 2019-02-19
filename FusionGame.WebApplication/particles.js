
class Entity {
    constructor() {
        this.z = 0;
    }

    update(time, timeDelta) { }

    draw(graphics) { }
}

class Particle extends Entity {
    constructor() {
        super();

        this.centre = new Vector2D(200, 200);
        this.radius = 15;
        this.fillColour = "red";

        this.mass = 1;
        this.force = new Vector2D();
        this.velocity = new Vector2D();
        this.acceleration = new Vector2D();

        this.charge = 0;

        this.trail = [];
        this.showTrail = false;

        this.label = "";
        this.showLabel = false;
    }

    update(time, timeDelta) {
        if (this.trail.length > 5) {
            this.trail.shift();
        }

        if (this.showTrail) {
            this.trail.push(this.centre);
        }

        this.acceleration = this.force.times(1 / this.mass);

        this.velocity = this.velocity.add(this.acceleration.times(timeDelta / 1000));

        this.centre = this.centre.add(this.velocity.times(timeDelta / 1000));
            }

    draw(graphics) {
        super.draw(graphics);

        if (this.showTrail) {
            graphics.drawPath(this.trail, "none", "#cce8ff");
        }

        var gradient = graphics.createNeutralChargeGradient(this.centre, this.radius);
        var lineColour = "#444444";

        if (this.charge == 1) {
            gradient = graphics.createPositiveChargeGradient(this.centre, this.radius);
            lineColour = "#7f0217";
        }

        if (this.charge == -1) {
            gradient = graphics.createNegativeChargeGradient(this.centre, this.radius);
            lineColour = "#04437c";
        }

        graphics.drawCircle(this.centre, this.radius, gradient, lineColour);

        if (this.showLabel) {
            graphics.drawText(this.label, this.centre.translateY(-30));
        }
    }
}

class Proton extends Particle {
    constructor() {
        super();

        this.type = "Proton";
             this.label = "Proton";

        this.charge = 1;
    }
}

class Neutron extends Particle {
    constructor() {
        super();

        this.fillColour = "grey";
        this.label = "Neutron";

        this.charge = 0;
    }
}

class Electron extends Particle {
    constructor() {
        super();

        this.label = "Electron";

        this.charge = -1;
        this.radius = 5;
        this.mass = 0.1;
    }
}

class Positron extends Particle {
    constructor() {
        super();

        this.label = "Positron";

        this.charge = 1;
        this.radius = 5;
        this.mass = 0.1;
    }
}

class Nucleus extends Entity {
    constructor() {
        super();

        this.showLabel = false;

        this.centre = new Vector2D();
        this.orientation = 0;

        this.force = new Vector2D();
        this.acceleration = new Vector2D();
        this.velocity = new Vector2D();


        this.trail = [];
        this.showTrail = false;

        this.nucleons = [];
    }

    get charge() {
        var q = 0;

        this.nucleons.forEach(n => {
            q += n.charge;
        });

        return q;
    }

    get mass() {
        var m = 0;

        this.nucleons.forEach(n => {
            m += n.mass;
        });

        return m;
    }

    update(time, timeDelta) {
        if (this.trail.length > 5) {
            this.trail.shift();
        }

        if (this.showTrail) {
            this.trail.push(this.centre);
        }

        this.acceleration = this.force.times(1 / this.mass);

        this.velocity = this.velocity.add(this.acceleration.times(timeDelta / 1000));

        this.centre = this.centre.add(this.velocity.times(timeDelta / 1000));

        var u1 = new Vector2D(0, -12);

        u1 = u1.rotate(this.orientation);


        if (this.nucleons.length == 1) {
            this.nucleons[0].centre = this.centre;
        }
        if (this.nucleons.length == 2) {
            this.nucleons[0].centre = this.centre.add(u1.rotate(90));
            this.nucleons[1].centre = this.centre.add(u1.rotate(-90));
                    }
        if (this.nucleons.length == 3) {
            this.nucleons[0].centre = this.centre.add(u1.rotate(120));
            this.nucleons[1].centre = this.centre.add(u1.rotate(0));
            this.nucleons[2].centre = this.centre.add(u1.rotate(-120));
        }
        if (this.nucleons.length == 4) {
            this.nucleons[0].centre = this.centre.add(u1.times(1.2).rotate(90));
            this.nucleons[1].centre = this.centre.add(u1.times(1.2).rotate(0));
            this.nucleons[2].centre = this.centre.add(u1.times(1.2).rotate(-90));
            this.nucleons[3].centre = this.centre.add(u1.times(1.2).rotate(180));
        }
    }

    draw(graphics) {
        if (this.showTrail) {
            graphics.drawPath(this.trail, "none", "#cce8ff");
        }

        this.nucleons.forEach(n => {
            n.draw(graphics);
        });

        if (this.showLabel) {
            graphics.drawText(this.label, this.centre.translateY(-50));
        }
    }
}

class Diproton extends Nucleus {
    constructor() {
        super();

        this.type = "Diproton";
        this.label = "Diproton";

        this.centre = new Vector2D(200, 200);

        this.nucleons.push(new Proton());
        this.nucleons.push(new Proton());
    }
}

class DeuteriumNucleus extends Nucleus {
    constructor() {
        super();

        this.label = "Deuterium Nucleus";
        this.type = "Deuterium Nucleus";

        this.centre = new Vector2D(200, 200);

        this.nucleons.push(new Proton());
        this.nucleons.push(new Neutron());
    }
}

class TritiumNucleus extends Nucleus {
    constructor() {
        super();

        this.label = "Tritium Nucleus";

        this.centre = new Vector2D(200, 200);

        this.nucleons.push(new Proton());
        this.nucleons.push(new Neutron());
        this.nucleons.push(new Neutron());
    }
}

class Helium3Nucleus extends Nucleus {
    constructor() {
        super();

        this.label = "Helium-3 Nucleus";
        this.type = "Helium-3 Nucleus";

        this.centre = new Vector2D(200, 200);

        this.nucleons.push(new Proton());
        this.nucleons.push(new Proton());
        this.nucleons.push(new Neutron());
    }
}

class Helium4Nucleus extends Nucleus {
    constructor() {
        super();

        this.label = "Helium-4 Nucleus";

        this.centre = new Vector2D(200, 200);

        this.nucleons.push(new Proton());
        this.nucleons.push(new Neutron());
        this.nucleons.push(new Proton());
        this.nucleons.push(new Neutron());
    }
}

class Chamber extends Entity {
    constructor(game) {
        super();

        this.game = game;

        this.particles = [ Electron,  Proton, DeuteriumNucleus, TritiumNucleus, Helium3Nucleus, Helium4Nucleus];
        this.currentParticle = 1;

        this.numbersOfParticles = [100, 10000, 10, 10, 10, 10];

        this.entities = [];

        for (var i = 0; i < this.particles.length; i++) {
            var p = new this.particles[i]();

            p.showLabel = true;

            this.entities.push(p);
        }
    }

    keyDown(e) {
        if (e.code == "ArrowLeft") {
            this.changeLeft();
        }
        if (e.code == "ArrowRight") {
            this.changeRight();
        }
        if (e.code == "ArrowUp" || e.code == "Space") {
            this.fireParticle();       
        }
    }

    changeRight() {
        if (this.currentParticle < this.particles.length - 1) {
            this.currentParticle += 1;
        }
    }

    changeLeft() {
        if (this.currentParticle > 0) {
            this.currentParticle -= 1;
        }
    }

    fireParticle( speed = 1000, variance = 50) {
        if (this.numbersOfParticles[this.currentParticle] > 0) {
            var e1 = new Vector2D(this.game.areaWidth / 2, this.game.areaHeight * 0.8);

            var p = new this.particles[this.currentParticle]();

            p.centre = e1;
            p.orientation = Math.round(Math.random() * 360);
            p.velocity.x =( Math.random() - 0.5) * 2*variance ;
            p.velocity.y = -1 * speed;
            p.showTrail = true;

            this.game.entities.push(p);

            this.numbersOfParticles[this.currentParticle] -= 1;
        }
    }     

    update(time, timeDelta) {
        this.entities.forEach(e => {
            var i = this.entities.indexOf(e);

          e.centre = this.position.translateX((i - this.currentParticle) * 150);

            e.update(time, timeDelta);
        });
    }

    draw(graphics) {
        this.entities.forEach(e => { e.draw(graphics); });

    }
}


