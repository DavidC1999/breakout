import { Player } from "./GameObjects/Player";
import { Ball } from "./GameObjects/Ball";
import { DrawHelper } from "./DrawHelper";
import { Block } from "./GameObjects/Block";
import { GUI } from "./GUI";

export class Game {
    blocks: Block[] = [];
    player: Player;
    ball: Ball;
    gui:GUI;

    upperBound = 100;

    background = "black";

    score = 0;

    constructor() {
        this.createGameObjects();
    }

    update(dt: number): void {
        this.collisionWalls(dt);
        this.collisionPlayer(dt);
        this.collisionBlock(dt);

        if (this.checkGameOver()) {
            this.ball.reset();
        }

        this.blocks.forEach((block) => {
            block.update(dt);
        });

        this.player.update(dt);
        this.ball.update(dt);
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

        // let bw = Block.WIDTH;
        // let bh = Block.HEIGHT;
        let brickAmtX = 14;
        let brickAmtY = 8;

        let screenWidth = DrawHelper.w;
        let brickAreaHeight = 100;



        let padding = 10;

        let brickWidth = (screenWidth / brickAmtX) - padding/2 + (padding / brickAmtX);
        let brickHeight = (brickAreaHeight / brickAmtY) - padding/2;
        Block.WIDTH = brickWidth;
        Block.HEIGHT = brickHeight;

        this.blocks = this.blocks.concat(this.createBlockLine(brickAmtX, padding, 0, "red"));
        this.blocks = this.blocks.concat(this.createBlockLine(brickAmtX, padding, 1, "red"));
        this.blocks = this.blocks.concat(this.createBlockLine(brickAmtX, padding, 2, "orange"));
        this.blocks = this.blocks.concat(this.createBlockLine(brickAmtX, padding, 3, "orange"));
        this.blocks = this.blocks.concat(this.createBlockLine(brickAmtX, padding, 4, "green"));
        this.blocks = this.blocks.concat(this.createBlockLine(brickAmtX, padding, 5, "green"));
        this.blocks = this.blocks.concat(this.createBlockLine(brickAmtX, padding, 6, "yellow"));
        this.blocks = this.blocks.concat(this.createBlockLine(brickAmtX, padding, 7, "yellow"));

        this.ball = new Ball();
        this.gui = new GUI(this);
    }

    private createBlockLine(amt: number, padding: number, lineNumber: number, color: string) {
        let output: Block[] = [];
        for (let i = 0; i < amt; i++) {
            output.push(new Block(i * Block.WIDTH + (padding/2*i), this.upperBound + lineNumber * Block.HEIGHT + (padding / 2 * lineNumber), color));
        }
        return output;
    }

    private collisionWalls(dt: number) {
        if (this.ball.x + this.ball.s + this.ball.velocity.x * dt > DrawHelper.w || this.ball.x + this.ball.velocity.x * dt < 0) {
            this.ball.velocity.x *= -1;
        }

        if (this.ball.y + this.ball.s + this.ball.velocity.y * dt > DrawHelper.h || this.ball.y + this.ball.velocity.y * dt < this.upperBound) {
            this.ball.velocity.y *= -1;
        }
    }

    private collisionBlock(dt: number) {
        let margin = 5;
        this.blocks.forEach((block) => {
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
                block.destroy();
                this.score += block.score;
            }
        });
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

    private checkGameOver(): boolean {
        // return this.ball.y + this.ball.s > this.player.y;
        return this.ball.y + this.ball.s > DrawHelper.h;
    }

}