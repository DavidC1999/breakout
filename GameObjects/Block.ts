import { IGameObject } from "../IGameObject";
import { DrawHelper } from "../DrawHelper";
import { game } from "../main";

export class Block implements IGameObject {
    static WIDTH = 100;
    static HEIGHT = 20;

    x: number;
    y: number;
    w: number;
    h: number;

    readonly score: number;

    color: string;

    constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        this.w = Block.WIDTH;
        this.h = Block.HEIGHT;

        // this.color = "#000000";
        this.color = color;
        this.score = Block.getScore(color);
        if(this.score == -1) {
            this.destroy();
            throw "Invalid block color: " + color;
        }
    }

    update(dt: number): void {
        // this.x++;
    }

    draw(): void {
        DrawHelper.setColor(this.color);
        DrawHelper.rect(this.x, this.y, this.w, this.h);
    }

    destroy() {
        this.x = -1000;
    }

    static getScore(color: string): number {
        switch (color) {
            case "yellow":
                return 1;
            case "green":
                return 3;
            case "orange":
                return 5;
            case "red":
                return 7;
        }
        return -1;
    }
}