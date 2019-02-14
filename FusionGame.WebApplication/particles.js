




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

        var gradient = graphics.createPositiveChargeGradient(this.centre, this.radius);

        graphics.drawCircle(this.centre, this.radius, gradient, "#7f0217");

        graphics.drawPath(this.trail, "none", "blue");

        if (this.showLabel) {
            graphics.drawText(this.label, this.centre.translateY(-30));
        }
    }
}



class Proton extends Particle {
    constructor() {
        super();

        this.label = "Proton";
    }
}


class Neutron extends Particle {
    constructor() {
        super();

        this.fillColour = "grey";
        this.label = "Neutron";
    }
}


class Nucleus extends Entity {
    constructor() {
        super();

        this.centre = new Vector2D();

        this.nucleons = [];
    }

    draw(graphics) {
        this.nucleons.forEach(n => {
            n.draw(graphics);
        });
    }
}




class Diproton extends Nucleus {
    constructor() {
        super();

        this.centre = new Vector2D(200, 200);

        this.nucleons.push(new Proton());
        this.nucleons.push(new Proton());
    }

    update(time, timeDelta) {
        this.nucleons[0].centre = this.centre.translateX(20);
        this.nucleons[1].centre = this.centre.translateX(-20);
    }
}




