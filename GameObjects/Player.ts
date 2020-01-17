import { IGameObject } from "../IGameObject";
import { DrawHelper } from "../DrawHelper";
import { Vector } from "../Vector";
import { Game } from "../Game";

export class Player implements IGameObject {
    x:number = DrawHelper.w/2 - 50;
    y:number = DrawHelper.h - 50;
    w:number = 100;
    h:number = 30;

    speed = 500;
    
    velocity:Vector;

    movingLeft = false;
    movingRight = false;
    
    
    constructor(game:Game) {
        game.requestEventListener("keydown", this.moveStart, this);
        game.requestEventListener("keyup", this.moveStop, this);

        this.velocity = new Vector(0, 0);
    }
    
    update(dt: number): void {
        if(this.movingLeft)
        this.x -= this.speed * dt;
        if(this.movingRight)
        this.x += this.speed * dt;
    }
    
    draw(): void {
        DrawHelper.setColor("#000000");
        DrawHelper.rect(this.x, this.y, this.w, this.h);
    }
    
    moveStart(event, player) {
        if(event.key == "ArrowLeft") {
            player.movingLeft = true;
        }
        if(event.key == "ArrowRight") {
            player.movingRight = true;
        }
    }

    moveStop(event, player) {
        if(event.key == "ArrowRight") {
            player.movingRight = false;
        }
        if(event.key == "ArrowLeft") {
            player.movingLeft = false;
        }
    }
}