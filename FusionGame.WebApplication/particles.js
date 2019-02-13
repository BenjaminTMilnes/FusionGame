




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
    }

    draw(graphics) {
        super.draw(graphics);

        graphics.drawCircle(this.centre, this.radius, "red");
    }
}










