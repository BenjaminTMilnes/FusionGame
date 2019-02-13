




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
        this.radius = 20;
        this.fillColour = "red";

        this.velocity = new Vector2D();
    }

    update(time, timeDelta) {
        this.centre = this.centre.add(this.velocity.times(timeDelta / 1000));
    }

    draw(graphics) {
        super.draw(graphics);

        graphics.drawCircle(this.centre, this.radius,  this.fillColour);
    }
}



class Proton extends Particle {
    constructor() {
        super();
    }
}


class Neutron extends Particle {
    constructor() {
        super();

        this.fillColour = "grey";
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




