export class DrawHelper {
    static ctx: CanvasRenderingContext2D;
    static w: number;
    static h: number;

    static init(w: number, h: number): void {
        let canvas = document.getElementsByTagName('canvas')[0];
        this.ctx = canvas.getContext('2d');
        this.w = w;
        this.h = h;
        canvas.width = w; canvas.height = h;
    }

    static setColor(color: string): void {
        this.ctx.fillStyle = color;
    }

    static rect(x: number, y: number, w: number, h: number): void {
        // this.ctx.fillStyle = "#FF0000";
        // this.ctx.fillRect(x, y, w, h);
        // this.ctx.fillText("test", 300, 300);
        this.ctx.beginPath();
        this.ctx.rect(x, y, w, h);
        this.ctx.fill();
    }

    static circle(x: number, y: number, r: number) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    static point(x: number, y: number) {
        this.circle(x, y, 3);
    }

}