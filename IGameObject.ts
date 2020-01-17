import { Game } from "./Game";

export interface IGameObject {
    update(dt:number):void;
    draw():void;
}