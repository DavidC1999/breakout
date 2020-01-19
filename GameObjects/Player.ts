import { IGameObject } from "../IGameObject";
import { DrawHelper } from "../DrawHelper";
import { Vector } from "../Vector";
import { Game, GameState } from "../Game";
import { game } from "../main";

export class Player implements IGameObject {
    x: number = DrawHelper.w / 2 - 50;
    y: number = DrawHelper.h - 50;
    static WIDTH = 100;
    w: number = DrawHelper.w;
    h: number = 10;

    speed = 500;

    movingLeft = false;
    movingRight = false;


    constructor(game: Game) {
        game.requestEventListener("keydown", this.moveStartKeyboard, this);
        game.requestEventListener("keyup", this.moveStopKeyboard, this);

        game.requestEventListener("mousedown", this.moveStartMobile, this);
        game.requestEventListener("mouseup", this.moveStopMobile, this);
    }

    update(dt: number): void {
        if(game.gameState == GameState.BeginScreen || game.gameState == GameState.Lose || game.gameState == GameState.Win) {
            this.x = 0;
            return;
        }
        if (this.movingLeft)
            this.x -= this.speed * dt;
        if (this.movingRight)
            this.x += this.speed * dt;
    }

    draw(): void {
        DrawHelper.setColor("#0066FF");
        DrawHelper.rect(this.x, this.y, this.w, this.h);
    }

    moveStartKeyboard(event, player) {
        if (event.key == "ArrowLeft") {
            player.movingLeft = true;
        }
        if (event.key == "ArrowRight") {
            player.movingRight = true;
        }
    }

    moveStopKeyboard(event, player) {
        if (event.key == "ArrowRight") {
            player.movingRight = false;
        }
        if (event.key == "ArrowLeft") {
            player.movingLeft = false;
        }
    }

    moveStartMobile(event, player) {
        let documentMiddle = document.body.clientWidth / 2;
        if(event.clientX < documentMiddle) {
            player.movingLeft = true;
        }
        if(event.clientX > documentMiddle) {
            player.movingRight = true;
        }
    }

    moveStopMobile(event, player) {
        let documentMiddle = document.body.clientWidth / 2;
        if(event.clientX < documentMiddle) {
            player.movingLeft = false;
        }
        if(event.clientX > documentMiddle) {
            player.movingRight = false;
        }
    }
}