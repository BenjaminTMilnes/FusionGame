





class Vector2D {
    constructor(x = 0, y = 0){
        this.x = x;
        this.y = y;
    }

        get magnitude(){
            return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
        }

    get m(){
        return this.magnitude;
    }


       


    add (vector){
        var v = new Vector2D();

        v.x = this.x + vector.x;
        v.y = this.y + vector.y;

        return v;
    } 


   subtract(vector){
        var v = new Vector2D();

        v.x = this.x - vector.x;
        v.y = this.y - vector.y;

        return v;
    }

   translate(dx = 0, dy = 0){
       var v = new Vector2D();

       v.x = this.x + dx;
       v.y = this.y + dy;

       return v;
   }

   translateX(dx){
       return this.translate(dx, 0);
   }

   translateY(dy)   {
       return this.translate(0, dy);
   }

    scale (sfx = 1, sfy = 1){
        var v = new Vector2D();

        v.x = this.x * sfx;
        v.y = this.y * sfy;

        return v;
    }

    scaleX(sfx){
        return this.scale(sfx, 1);
    }

    scaleY(sfy){
        return this.scale(1, sfy);
    }

    reflect(){
        return this.scale(-1, -1);
    }

    reflectX(){
        return this.scaleX(-1);
    }

    reflectY(){
        return this.scaleY(-1);
    }
    }


    class Matrix2D {
          constructor(a11 = 0, a12 = 0, a21 = 0, a22 = 0){
              this.a11 = a11;
              this.a12 = a12;
              this.a21 = a21;
              this.a22 = a22;
          }

          times (vector){
              return new Vector2D(   this.a11 * vector.x + this.a12 * vector.y,  this.a21 * vector.x + this.a22 * vector.y);
          }
    }






             


    class RotationMatrix2D   extends Matrix2D {
          constructor(theta = 0){
   }
}


