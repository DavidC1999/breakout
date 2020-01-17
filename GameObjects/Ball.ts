import { IGameObject } from "../IGameObject";
import { DrawHelper } from "../DrawHelper";
import { Vector } from "../Vector";

export class Ball implements IGameObject {

    x: number;
    y: number;
    s = 10;
    speed = 200;

    color: string;

    velocity: Vector;

    constructor() {
        this.x = DrawHelper.w / 2 - this.s / 2;
        this.y = DrawHelper.h / 2 - this.s / 2;
        this.velocity = Vector.fromPolar((Math.random() / 2 + 1 / 4) * Math.PI, this.speed);
    }


    update(dt: number): void {
        this.color = "white";
        this.x += this.velocity.x * dt;
        this.y += this.velocity.y * dt;
    }

    draw(): void {
        DrawHelper.setColor(this.color);
        DrawHelper.rect(this.x, this.y, this.s, this.s);
        // DrawHelper.circle(this.x + this.s/2, this.y + this.s/2, this.s/2);
    }

    reset() {
        // this.x = 10;
        // this.y = this.blocks[1].y;
        this.x = -100;
        this.y = DrawHelper.h / 2;
        this.velocity.x = 0;
        this.velocity.y = 0;
        setTimeout(() => {
            this.x = DrawHelper.w / 2 - this.s / 2;
            this.y = DrawHelper.h / 2 - this.s / 2;
            this.velocity = Vector.fromPolar((Math.random() / 2 + 1 / 4) * Math.PI, this.speed);
        }, 2000);
        // this.velocity = Vector.fromPolar(Math.random() * (Math.PI * 2), this.speed);
    }



    increaseSpeed() {
        this.speed += 50;
    }


}