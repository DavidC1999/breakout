import { IGameObject } from "./IGameObject";
import { Player } from "./GameObjects/Player";
import { Ball } from "./GameObjects/Ball";
import { DrawHelper } from "./DrawHelper";
import { Block } from "./GameObjects/Block";

export class Game {
    gameObjects: IGameObject[] = [];

    background = "#FFFFFF";

    constructor() {
        this.addGameObjects();
    }

    update(dt: number): void {
        this.gameObjects.forEach((gameObject) => {
            gameObject.update(dt);
        });
    }

    draw(): void {
        DrawHelper.setColor(this.background);
        DrawHelper.rect(0, 0, DrawHelper.w, DrawHelper.h);
        this.gameObjects.forEach((gameObject) => {
            gameObject.draw();
        });
    }

    requestEventListener(on: string, callback: Function, object): void {
        document.addEventListener(on, (event) => {
            callback(event, object);
        });
    }

    private addGameObjects(): void {
        let player = new Player(this);
        this.gameObjects.push(player);

        let blocks = [
            new Block(DrawHelper.w/2 - 50, 100),
            new Block(DrawHelper.w/2 - 50, 150),
            new Block(DrawHelper.w/2 - 50, 200),
            new Block(DrawHelper.w/2 - 50, 250),
        ];
        blocks.forEach((block) => {
            this.gameObjects.push(block);
        });

        this.gameObjects.push(new Ball(player, blocks));

    }

    test() {
        console.log("test");
        
    }
}