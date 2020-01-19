import { Player } from "./GameObjects/Player";
import { Ball } from "./GameObjects/Ball";
import { DrawHelper } from "./DrawHelper";
import { Block } from "./GameObjects/Block";
import { GUI } from "./GUI";

export class Game {
    blocks: Block[] = [];
    player: Player;
    ball: Ball;
    gui: GUI;

    background = "black";

    score = 0;
    turnsLeft = 3;

    blockHits = 0;
    hitOrange = false;
    hitRed = false;

    paused = false;
    // gameStarted = false;

    gameState = GameState.BeginScreen;

    constructor() {
        this.createGameObjects();

        this.requestEventListener("keyup", function (event, game) {
            if (event.key == "Escape") {
                game.paused = !game.paused;
            } else if (event.key == " ") {
                if (game.gameState === GameState.BeginScreen) {
                    game.gameState = GameState.Screen1
                    game.player.w = Player.WIDTH;
                    game.player.x = DrawHelper.w / 2 - game.player.w / 2;
                    game.ball.resetOnTimer();
                } else if (game.gameState === GameState.Lose) {
                    game.gameState = GameState.BeginScreen;
                    game.blocks = [];
                    game.createBlocks();
                    game.turnsLeft = 3;
                    game.score = 0;
                    game.blockHits = 0;
                    game.hitOrange = false;
                    game.hitRed = false;
                    game.ball.resetSpeed();
                }

            }
        }, this);
    }

    update(dt: number): void {
        this.collisionWalls(dt);
        this.collisionPlayer(dt);
        this.collisionBlock(dt);

        this.checkGameOver();

        if (!this.paused) {
            this.blocks.forEach((block) => {
                block.update(dt);
            });

            this.player.update(dt);
            this.ball.update(dt);
        }
    }

    draw(): void {
        DrawHelper.setColor(this.background);
        DrawHelper.rect(0, 0, DrawHelper.w, DrawHelper.h);

        this.blocks.forEach((block) => {
            block.draw();
        });

        this.player.draw();
        this.ball.draw();
        this.gui.draw();

    }

    requestEventListener(on: string, callback: Function, object): void {
        document.addEventListener(on, (event) => {
            callback(event, object);
        });
    }

    private createGameObjects(): void {
        this.player = new Player(this);

        this.createBlocks();


        this.ball = new Ball();
        this.gui = new GUI(this);
    }

    private createBlocks() {
        let padding = 10;
        let offsetY = 100;
        let brickAmtX = 14;
        let brickAmtY = 8;

        let screenWidth = DrawHelper.w;
        let brickAreaHeight = 100;


        let brickWidth = (screenWidth / brickAmtX) - padding / 2 + (padding / brickAmtX);
        let brickHeight = (brickAreaHeight / brickAmtY) - padding / 2;
        Block.WIDTH = brickWidth;
        Block.HEIGHT = brickHeight;

        this.blocks = this.blocks.concat(this.createBlockLine(brickAmtX, padding, 0, offsetY, "red"));
        this.blocks = this.blocks.concat(this.createBlockLine(brickAmtX, padding, 1, offsetY, "red"));
        this.blocks = this.blocks.concat(this.createBlockLine(brickAmtX, padding, 2, offsetY, "orange"));
        this.blocks = this.blocks.concat(this.createBlockLine(brickAmtX, padding, 3, offsetY, "orange"));
        this.blocks = this.blocks.concat(this.createBlockLine(brickAmtX, padding, 4, offsetY, "green"));
        this.blocks = this.blocks.concat(this.createBlockLine(brickAmtX, padding, 5, offsetY, "green"));
        this.blocks = this.blocks.concat(this.createBlockLine(brickAmtX, padding, 6, offsetY, "yellow"));
        this.blocks = this.blocks.concat(this.createBlockLine(brickAmtX, padding, 7, offsetY, "yellow"));
    }

    private createBlockLine(amt: number, padding: number, lineNumber: number, offsetY: number, color: string) {
        let output: Block[] = [];
        for (let i = 0; i < amt; i++) {
            output.push(new Block(i * Block.WIDTH + (padding / 2 * i), offsetY + lineNumber * Block.HEIGHT + (padding / 2 * lineNumber), color));
        }
        return output;
    }

    private collisionWalls(dt: number) {
        if (this.ball.x + this.ball.s + this.ball.velocity.x * dt > DrawHelper.w || this.ball.x + this.ball.velocity.x * dt < 0) {
            this.ball.velocity.x *= -1;
        }

        if (this.ball.y + this.ball.s + this.ball.velocity.y * dt > DrawHelper.h || this.ball.y + this.ball.velocity.y * dt < 0) {
            this.ball.velocity.y *= -1;
        }
    }

    private collisionBlock(dt: number) {
        let margin = 7;
        for (let i = this.blocks.length - 1; i >= 0; i--) {
            let block = this.blocks[i];
            let withinY = this.ball.y + this.ball.s + this.ball.velocity.y * dt >= block.y && this.ball.y + this.ball.velocity.y * dt <= block.y + block.h;
            let withinX = this.ball.x + this.ball.s + this.ball.velocity.x * dt >= block.x && this.ball.x + this.ball.velocity.x * dt <= block.x + block.w;

            if (withinY && withinX) {
                let bottom = this.ball.y + this.ball.velocity.y * dt > (block.y + block.h - margin);
                let top = this.ball.y + this.ball.s + this.ball.velocity.y * dt < (block.y + margin);
                if (bottom || top) {
                    this.ball.velocity.y *= -1;
                } else {
                    this.ball.velocity.x *= -1;
                }
                if (this.gameState === GameState.BeginScreen || this.gameState == GameState.Lose || this.gameState == GameState.Win) break;
                block.destroy();
                this.score += block.score;
                this.hitBlock(block);
                break;
            }
        }
    }

    private hitBlock(block: Block) {
        this.blockHits++;
        if (this.blockHits == 4) {
            this.ball.increaseSpeed();
        } else if (this.blockHits == 12) {
            this.ball.increaseSpeed();
        }

        if (block.color == "orange" && !this.hitOrange) {
            this.hitOrange = true;
            this.ball.increaseSpeed();
        } else if (block.color == "red" && !this.hitRed) {
            this.hitRed = true;
            this.ball.increaseSpeed();
        }
    }

    private collisionPlayer(dt: number) {
        let factor = 1000;
        if (this.ball.y + this.ball.s + this.ball.velocity.y * dt >= this.player.y) {
            if (this.ball.x + this.ball.s + this.ball.velocity.x * dt > this.player.x && this.ball.x + this.ball.velocity.x * dt < this.player.x + this.player.w) {
                this.ball.velocity.y *= -1;
                this.ball.velocity.x = factor * (((this.ball.x + this.ball.s / 2) - (this.player.x + (this.player.w / 2))) / (2 * this.player.w));
                this.ball.velocity.setRadius(this.ball.speed);
            }
        }
    }

    private checkGameOver() {
        if (this.ball.y > this.player.y) {
            this.ball.reset();
            // this.paused = true;
            // debugger;
            this.turnsLeft--;
            if (this.turnsLeft <= 0) {
                console.log("test");

                this.gameState = GameState.Lose;
                this.player.w = DrawHelper.w;
                this.player.x = 0;
                // this.turnsLeft = 3;
            }
        }
        // return this.ball.y + this.ball.s > DrawHelper.h;
    }

}

export enum GameState {
    BeginScreen,
    Screen1,
    Screen2,
    Win,
    Lose,
}