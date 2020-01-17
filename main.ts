import { DrawHelper } from "./DrawHelper";
import { Game } from "./Game";


DrawHelper.init(500, 600);
export let game = new Game();

let lastTime = 0;

function mainLoop(timestamp: number) {
	let deltaTime = (timestamp - lastTime) / 1000; // in seconds

	game.update(deltaTime);
	game.draw();

	requestAnimationFrame(mainLoop);
	lastTime = timestamp;
}
mainLoop(0);