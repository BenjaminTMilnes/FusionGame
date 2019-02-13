




class GraphicsContext {
    constructor(context) {
        this.context = context;
    }

    clear (width, height, fillColour = "white"){
        this.context.fillStyle = fillColour;
        this.context.fillRect(0, 0,  width, height);
    }

        drawCircle(centre, radius,  fillColour = "none", lineColour = "black", lineWidth = 1, lineDashStyle = []){
            this.context.fillStyle = fillColour;

            this.context.lineWidth = lineWidth;
            this.context.strokeStyle = lineColour;
            this.context.setLineDash(lineDashStyle);

            this.context.beginPath();
            this.context.arc( centre.x, centre.y,  radius, 0, 2 * Math.PI);

            if (fillColour != "none"){
                this.context.fill();
            }
        
            if (lineColour != "none"){
                this.context.stroke();
            }

            this.context.setLineDash([]);
        }}