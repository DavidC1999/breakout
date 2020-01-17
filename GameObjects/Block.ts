import { IGameObject } from "../IGameObject";
import { DrawHelper } from "../DrawHelper";
import { Game } from "../Game";
import { game } from "../main";

export class Block implements IGameObject {
    
    x:number;
    y:number;
    w:number;
    h:number;

    color:string;
    
    constructor(x:number, y:number) {
        this.x = x;
        this.y = y;
        this.w = 100;
        this.h = 20;

        // this.color = "#000000";
        this.color = "#AAAAAA";
    }
      
    update(dt: number): void {
        // this.x++;
    }
    
    draw(): void {
        DrawHelper.setColor(this.color);
        DrawHelper.rect(this.x, this.y, this.w, this.h);
    }

    destroy() {
        game.test();
    }
}