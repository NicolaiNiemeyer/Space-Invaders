import { EnemyController, level1, level2, level3 } from "./enemyController.js";
import Player from "./player.js";
import BulletController from "./bulletController.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3, 
    NEWLEVEL: 4
};

const background = new Image();
background.src = "assets/images/space.png";

const playerBulletController = new BulletController(canvas, 10, "red", true)
const enemyBulletController = new BulletController(canvas, 4, "white", false);
const enemyController = new EnemyController(
    canvas, 
    enemyBulletController, 
    playerBulletController
    );
const player = new Player(canvas, 3, playerBulletController);

canvas.width = 600;
canvas.height = 600;

export default class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.gamestate = GAMESTATE.MENU;
        this.player = new Player(canvas, 3, playerBulletController);
        this.enemies = []

        this.levels = [level1, level2, level3];
        this.currentLevel = 0;

    }

    start() {
        if(
            this.gamestate !== GAMESTATE.MENU &&
            this.gamestate !== GAMESTATE.NEWLEVEL
        )
        return;
        
        this.enemies = enemyController(this, this.levels[this.currentLevel]);
        this.player.reset();
        this.gamestate = GAMESTATE.RUNNING;

        
    }
}


let isGameOver = false;
let didWin = false;

function game() {
    menu();
    checkGameOver();
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    displayGameOver();
    if (!isGameOver) {
        enemyController.draw(ctx);
        player.draw(ctx);
        playerBulletController.draw(ctx);
        enemyBulletController.draw(ctx);
        
    }
    
}

draw(ctx) {
    [...this.enemies].forEach(object => object.draw(ctx));
}
function menu() {
    if(gamestate !==)
    ctx.rect(0,0,canvas.width, canvas.height);
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText(
                "Press SPACEBAR to start", 
                canvas.width / 2, 
                canvas.height / 2
            );
}
function displayGameOver() {
    if (isGameOver) {
        let text = didWin ? "You Win" : "Game Over";
        let textOffset = didWin ? 3.5 : 5;

        ctx.fillStyle = "white";
        ctx.font = "70px Arial";
        ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);
    }
}

function checkGameOver() {
    if (isGameOver) {
        return;
    }

    if (enemyBulletController.collideWith(player)) {
        isGameOver = true;
    }

    if (enemyController.collideWith(player)) {
        isGameOver = true;
    }

    if (enemyController.enemyRows.length === 0) {
        didWin = true;
        isGameOver = true;
    }
}
setInterval(game, 1000/60);