var game = new Game("gameCanvas");
var lastFrameTimestamp = 0;

window.addEventListener("keydown", function (e) {
    game.keyDown(e);
});

window.addEventListener("keyup", function (e) {
    game.keyUp(e);
});

window.addEventListener("resize", function (e) {
    game.resize(e);
});

function startGame() {
    game.initialise();

    requestAnimationFrame(gameLoop);
}

function gameLoop(timestamp) {
    var timeDelta = timestamp - lastFrameTimestamp;

    if (timeDelta < 30) {
        requestAnimationFrame(gameLoop);
        return;
    }

    game.update(timeDelta);
    game.draw();

    lastFrameTimestamp = timestamp;

    requestAnimationFrame(gameLoop);
}

window.addEventListener("DOMContentLoaded", startGame);