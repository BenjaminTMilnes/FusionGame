

class GameGraphicsContext extends GraphicsContext {
    constructor(context) {
        super(context);
    }

    createPositiveChargeGradient(centre, radius) {
        var gradient = this.context.createRadialGradient(centre.x + radius * 0.3, centre.y - radius * 0.3, 2, centre.x, centre.y, radius);

        gradient.addColorStop(0, "#f9758b");
        gradient.addColorStop(1, "#dd1335");

        return gradient;
    }

    createNeutralChargeGradient(centre, radius) {
        var gradient = this.context.createRadialGradient(centre.x + radius * 0.3, centre.y - radius * 0.3, 2, centre.x, centre.y, radius);

        gradient.addColorStop(0, "#eeeeee");
        gradient.addColorStop(1, "#777777");

        return gradient;
    }

    createNegativeChargeGradient(centre, radius) {
        var gradient = this.context.createRadialGradient(centre.x + radius * 0.3, centre.y - radius * 0.3, 2, centre.x, centre.y, radius);

        gradient.addColorStop(0, "#aad6ff");
        gradient.addColorStop(1, "#1261aa");

        return gradient;
    }
}












