import { IGameObject } from "../IGameObject";
import { DrawHelper } from "../DrawHelper";
import { Vector } from "../Vector";
import { Player } from "./Player";
import { Block } from "./Block";

export class Ball implements IGameObject {

    x: number;
    y: number;
    s = 20;
    speed = 300;

    player: Player;
    blocks: Block[];

    color: string;

    velocity: Vector;

    constructor(player: Player, blocks: Block[]) {
        this.player = player;
        this.blocks = blocks;
        this.reset();
    }


    update(dt: number): void {
        this.color = "#000000";
        let nextX = this.x + this.velocity.x * dt;
        let nextY = this.y + this.velocity.y * dt;

        this.collisionWalls(nextX, nextY);
        this.collisionPlayer(nextX, nextY);
        this.collisionBlock(nextX, nextY);

        if (this.checkGameOver(nextY)) {
            this.reset();
        }

        this.x += this.velocity.x * dt;
        this.y += this.velocity.y * dt;
    }

    draw(): void {
        DrawHelper.setColor(this.color);
        // DrawHelper.rect(this.x, this.y, this.s, this.s);
        DrawHelper.circle(this.x + this.s/2, this.y + this.s/2, this.s/2);
    }

    private reset() {
        // this.x = 10;
        // this.y = this.blocks[1].y;
        this.x = DrawHelper.w / 2 - this.s / 2;
        this.y = DrawHelper.h / 2 - this.s / 2;
        this.velocity = Vector.fromPolar(1 / 2 * Math.PI, this.speed);
        // this.velocity = Vector.fromPolar(Math.random() * (Math.PI * 2), this.speed);
    }

    private collisionWalls(x: number, y: number) {
        if (x + this.s > DrawHelper.w || x < 0) this.velocity.x *= -1;
        if (y + this.s > DrawHelper.h || y < 0) this.velocity.y *= -1;
    }

    private collisionBlock(x: number, y: number) {
        let margin = 5;
        this.blocks.forEach((block) => {
            let withinY = y + this.s >= block.y && y <= block.y + block.h;
            let withinX = x + this.s >= block.x && x <= block.x + block.w;

            if (withinY && withinX) {
                let bottom = y > (block.y + block.h - margin);
                let top = y + this.s < (block.y + margin);
                if (bottom || top) {
                    this.velocity.y *= -1;
                } else {
                    this.velocity.x *= -1;
                }
                block.destroy();
            }
        });
    }

    private checkGameOver(y: number): boolean {
        return y + this.s > DrawHelper.h;
    }

    private collisionPlayer(x: number, y: number) {
        let factor = 900;
        if (y + this.s >= this.player.y) {
            if (x + (this.s) > this.player.x && x < this.player.x + this.player.w) {
                this.velocity.y *= -1;
                this.velocity.x = factor * (((this.x + this.s / 2) - (this.player.x + (this.player.w / 2))) / (2 * this.player.w));
                this.velocity.setRadius(this.speed);

            }
        }
    }




}