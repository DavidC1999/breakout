import { IGameObject } from "../IGameObject";
import { DrawHelper } from "../DrawHelper";
import { Vector } from "../Vector";

export class Ball implements IGameObject {
    static readonly SPEED = 200;

    x: number;
    y: number;
    s = 10;
    speed:number = Ball.SPEED;

    whichSpeed = "actual";

    color: string;

    velocity: Vector;

    constructor() {
        this.resetSpeed();

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
        this.x = DrawHelper.w / 2 - this.s / 2;
        this.y = DrawHelper.h / 2 - this.s / 2;
        let speed = this.whichSpeed == "actual" ? this.speed : Ball.SPEED;
        this.velocity = Vector.fromPolar((Math.random() / 2 + 1 / 4) * Math.PI, speed);
    }

    resetOnTimer() {
        this.x = -100;
        this.y = DrawHelper.h / 2;
        this.velocity.x = 0;
        this.velocity.y = 0;
        setTimeout(() => {
            this.reset();
        }, 2000);
    }

    resetSpeed() {
        this.speed = Ball.SPEED;
    }



    increaseSpeed() {
        this.speed += 50;
    }


}