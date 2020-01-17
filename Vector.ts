export class Vector {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    setRadius(r: number) {
        let addX = 0;
        let mulY = 1;
        if(this.x < 0) {
            addX = Math.PI;
            mulY = -1;
        }
        let angle = Math.atan(this.y / this.x);
        this.y = Math.sin(angle) * r * mulY;
        this.x = Math.cos(angle + addX) * r;
    }

    getAngle(): number {
        return Math.atan(this.y / this.x);
    }

    static fromPolar(angle: number, radius: number): Vector {
        let x = Math.cos(angle) * radius;
        let y = Math.sin(angle) * radius;
        return new this(x, y);
    }
}