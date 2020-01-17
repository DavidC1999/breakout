import { DrawHelper } from "./DrawHelper";
import { Game } from "./Game";

export class GUI {
    game: Game;
    constructor(game: Game) {
        this.game = game;
    }

    draw(): void {
        DrawHelper.setColor("white");
        DrawHelper.text("Score: " + this.game.score.toString(), 15, 10, 25);
        DrawHelper.text("Turns: " + this.game.turnsLeft.toString(), 15, DrawHelper.w - 100, 25);

        if (this.game.paused) {
            let pausedText = "PAUSED";
            let textWidth = DrawHelper.ctx.measureText(pausedText).width;
            DrawHelper.text(pausedText, 15, DrawHelper.w / 2 - textWidth / 2, DrawHelper.h / 2);
        }

        if(!this.game.gameStarted) {
            let helpText = "Press SPACEBAR to start the game";
            let textWidth = DrawHelper.ctx.measureText(helpText).width;
            DrawHelper.text(helpText, 15, DrawHelper.w / 2 - textWidth / 2, DrawHelper.h / 2);
        }
    }

}