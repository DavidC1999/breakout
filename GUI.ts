import { DrawHelper } from "./DrawHelper";
import { Game, GameState } from "./Game";

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
            this.drawGUIText("PAUSED");
        } else if (this.game.gameState == GameState.BeginScreen) {
            this.drawGUIText("Press SPACEBAR to start the game");
        } else if (this.game.gameState == GameState.Lose) {
            this.drawGUIText("Press SPACEBAR to try again");
        }
    }

    drawGUIText(str: string) {
        let textWidth = DrawHelper.ctx.measureText(str).width;
        DrawHelper.text(str, 15, DrawHelper.w / 2 - textWidth / 2, DrawHelper.h / 2);
    }

}