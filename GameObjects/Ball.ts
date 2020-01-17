import { IGameObject } from "../IGameObject";
import { DrawHelper } from "../DrawHelper";
import { Vector } from "../Vector";

export class Ball implements IGameObject {

    x: number;
    y: number;
    s = 10;
    speed = 250;

    color: string;

    velocity: Vector;

    constructor() {
        this.reset();
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
        this.x = DrawHelper.w / 2 - this.s / 2;
        this.y = DrawHelper.h / 2 - this.s / 2;
        this.velocity = Vector.fromPolar(1 / 2 * Math.PI, this.speed);
        // this.velocity = Vector.fromPolar(Math.random() * (Math.PI * 2), this.speed);
    }

    




}