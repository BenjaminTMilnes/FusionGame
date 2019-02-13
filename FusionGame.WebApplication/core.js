var game = new Game("gameView");
var lastDraw = 0;

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

    requestAnimationFrame(mainLoop);
}

function mainLoop(timestamp) {
    var timeDelta = timestamp - lastDraw;

    if (timeDelta < 30) {
        requestAnimationFrame(mainLoop);
        return;
    }

    game.update(timeDelta);
    game.draw();

    lastDraw = timestamp;

    requestAnimationFrame(mainLoop);
}

window.addEventListener("DOMContentLoaded", startGame);