const canvas = document.getElementById("snake");
const ctx = canvas.getContext("2d");
const startForm = document.getElementById("startForm");
const startBtn = document.getElementById("startBtn");
const gameEndForm = document.getElementById("gameEndForm");
const restartBtn = document.getElementById("restartBtn");

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

const poisonFoodImg = new Image();
poisonFoodImg.src = "img/poisonFood.png";

const tileX = 17;

const tileY = 15;

let tile = 31;

let score = 0;

let food;
let poisonFood;

let snake = initSnake();
food = getRandomPoint();
poisonFood = getRandomPoint();

function initSnake() {
    return [
        {
            x: 9 * tile,
            y: 8 * tile
        }
    ]
}

document.addEventListener("keydown", direction);

let dir;
let newDir;

function direction(input) {
    if (input.keyCode == 37 && dir != "right")
        newDir = "left";
    else if (input.keyCode == 38 && dir != "down")
        newDir = "up";
    else if (input.keyCode == 39 && dir != "left")
        newDir = "right";
    else if (input.keyCode == 40 && dir != "up")
        newDir = "down";
}

function isEatSelf(head, snake) {
    for (let i = 0; i < snake.length; i++) {
        if (head.x == snake[i].x && head.y == snake[i].y) {
            endGame();
        }
        // clearInterval(timer);
    }
}

function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "#0000FF" : "#0033CC";
        ctx.fillRect(snake[i].x, snake[i].y, tile, tile);
    };
};

function shownScore() {
    ctx.fillStyle = "white";
    ctx.font = "50px Times New Roman";
    ctx.fillText("Score:", tile, tile * 18.3);

    ctx.fillStyle = "white";
    ctx.font = "50px Times New Roman";
    ctx.fillText(score, tile * 5.2, tile * 18.35);
};

function getRandomPoint() {
    const point = {
        x: Math.floor((Math.random() * tileX + 1)) * tile,
        y: Math.floor((Math.random() * tileY + 1)) * tile,
    };

    if (snake[0].x === point.x && snake[0].y === point.y) {
        return getRandomPoint();
    }
    if (food && food.x === point.x && food.y === point.y) {
        return getRandomPoint();
    }
    if (poisonFood && poisonFood.x === point.x && poisonFood.y === point.y) {
        return getRandomPoint();
    }

    return point;
};

function eatSpawn({ x, y }) {
    if (x == food.x && y == food.y) {
        score++;
        food = getRandomPoint();
        snake.push({})
    }
    if (x == poisonFood.x && y == poisonFood.y) {
        score--;
        poisonFood = getRandomPoint();
    }
};

function drawGame() {
    dir = newDir;

    ctx.drawImage(ground, 0, 0);

    ctx.drawImage(foodImg, food.x, food.y);

    ctx.drawImage(poisonFoodImg, poisonFood.x, poisonFood.y);

    drawSnake();

    shownScore();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    eatSpawn(snake[0]);

    if (snakeX < tile || snakeX > tile * tileX || snakeY < tile || snakeY > tile * tileY) {
        endGame();
    }

    if (dir == "left") snakeX -= tile;
    if (dir == "right") snakeX += tile;
    if (dir == "up") snakeY -= tile;
    if (dir == "down") snakeY += tile;

    snake.pop();

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    isEatSelf(newHead, snake)

    snake.unshift(newHead);
};

function endGame() {
    clearInterval(timer);
    gameEndForm.style.display = "block";
}

function reInitGame() {
    snake = initSnake();
    food = getRandomPoint();
    poisonFood = getRandomPoint();

    dir = null;
    newDir = null;
    score = 0;
}

let timer

startBtn.addEventListener("click", () => {
    timer = setInterval(drawGame, 80)
    startForm.style.display = "none"
});

restartBtn.addEventListener("click", () => {
    reInitGame();
    timer = setInterval(drawGame, 120)
    gameEndForm.style.display = "none";
})