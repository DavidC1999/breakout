import { IGameObject } from "./IGameObject";
import { DrawHelper } from "./DrawHelper";
import { Game } from "./Game";

export class GUI implements IGameObject {
    game:Game;
    constructor(game:Game) {
        this.game = game;
    }
    
    update(dt: number): void {
        
    }
    
    draw(): void {
        this.drawScore();
        this.drawUpperBound();
    }

    drawScore() {
        DrawHelper.setColor("white");
        DrawHelper.text("Score: " + this.game.score.toString(), 15, 10, 25);
    }

    drawUpperBound() {
        DrawHelper.setStrokeColor("white");
        DrawHelper.line(0, this.game.upperBound, DrawHelper.w, this.game.upperBound, 3);
    }
    
}