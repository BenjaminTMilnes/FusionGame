




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

        this.velocity = new Vector2D();

        this.charge = 0;

        this.trail = [];

        this.label = "";
        this.showLabel = false;
    }

    update(time, timeDelta) {
        if (this.trail.length > 5) {
            this.trail.shift();
        }

        this.trail.push(this.centre);

        this.centre = this.centre.add(this.velocity.times(timeDelta / 1000));
    }

    draw(graphics) {
        super.draw(graphics);

        var gradient = graphics.createNeutralChargeGradient(this.centre, this.radius);
        var lineColour = "#444444";

        if (this.charge == 1) {
            gradient = graphics.createPositiveChargeGradient(this.centre, this.radius);
            lineColour = "#7f0217";
        }

        graphics.drawCircle(this.centre, this.radius, gradient, lineColour);

        graphics.drawPath(this.trail, "none", "#cce8ff");

        if (this.showLabel) {
            graphics.drawText(this.label, this.centre.translateY(-30));
        }
    }
}



class Proton extends Particle {
    constructor() {
        super();

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


class Nucleus extends Entity {
    constructor() {
        super();

        this.showLabel = false;

        this.centre = new Vector2D();

        this.nucleons = [];
    }

    update(time, timeDelta) {
        var u1 = new Vector2D(0, -12);


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
    constructor() {
        super();

        this.particles = [Proton, DeuteriumNucleus, TritiumNucleus, Helium3Nucleus, Helium4Nucleus];

        this.entities = [];

        for (var i = 0; i < this.particles.length; i++) {
            var p = new this.particles[i]();

            p.showLabel = true;

            this.entities.push(p);
        }
    }

    update(time, timeDelta) {
        this.entities.forEach(e => {
            var i = this.entities.indexOf(e);

          e.centre = this.position.translateX(i * 150);

            e.update(time, timeDelta);
        });
    }

    draw(graphics) {
        this.entities.forEach(e => { e.draw(graphics); });

    }
}







