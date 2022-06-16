import EnemyController from "./enemyController.js";
import Player from "./player.js";
import BulletController from "./bulletController.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2, 
    NEWLEVEL: 4
};

canvas.width = 600;
canvas.height = 600;

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


function menu() {
    
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