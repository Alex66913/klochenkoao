const canvas = document.getElementById("snake");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

const poisonFoodImg = new Image();
poisonFoodImg.src = "img/poisonFood.png";

let tile = 31;

let score = 0;

let food = {
    x: Math.floor((Math.random() * 17 + 1)) * tile,
    y: Math.floor((Math.random() * 15 + 1)) * tile,
};

let poisonFood = {
    x: Math.floor((Math.random() * 17 + 1)) * tile,
    y: Math.floor((Math.random() * 15 + 1)) * tile,
}

let snake = [];
snake[0] = {
    x: 9 * tile,
    y: 8 * tile
};

document.addEventListener("keydown", direction);

let dir;

function direction(input) {
    if(input.keyCode == 37 && dir != "right")
        dir = "left";
    else if(input.keyCode == 38 && dir != "down")
        dir = "up";
    else if(input.keyCode == 39 && dir != "left")
        dir = "right";
    else if(input.keyCode == 40 && dir != "up")
        dir = "down";
}

function eatTail(head, arr) {
    for(let i = 0; i < arr.length; i++) {
        if(head.x == arr[i].x && head.y == arr[i].y)
        clearInterval(timer);
    }
}

function drawObject() {
    ctx.drawImage(ground, 0, 0);

    ctx.drawImage(foodImg, food.x, food.y);

    ctx.drawImage(poisonFoodImg, poisonFood.x, poisonFood.y);

    for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "#0000FF" : "#0033CC";
        ctx.fillRect(snake[i].x, snake[i].y, tile, tile);
    };

    ctx.fillStyle = "black";
    ctx.font = "50px Times New Roman";
    ctx.fillText("Score:", tile, tile * 18.3);

    ctx.fillStyle = "black";
    ctx.font = "50px Times New Roman";
    ctx.fillText(score, tile * 5.2, tile * 18.35);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // if(timer = setInterval * 10) {
    //     poisonFood = {
    //         x: Math.floor((Math.random() * 17 + 1)) * tile,
    //         y: Math.floor((Math.random() * 15 + 1)) * tile, 
    //     }               
    // } else
    //     snake.pop();
    // 
    // 
    //  Попытка привязать повторный респавн объекта к таймеру

    if(snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor((Math.random() * 17 + 1)) * tile,
            y: Math.floor((Math.random() * 15 + 1)) * tile,
        };
    } else 
        snake.pop();

    if(snakeX == poisonFood.x && snakeY == poisonFood.y) {
        score--;
        poisonFood = {
            x: Math.floor((Math.random() * 17 + 1)) * tile,
            y: Math.floor((Math.random() * 15 + 1)) * tile,
        };
    } else
        snake.pop();

        if(snakeX == poisonFood.x && snakeY == poisonFood.y) {
            score--;
            poisonFood = {
                x: Math.floor((Math.random() * 17 + 1)) * tile,
                y: Math.floor((Math.random() * 15 + 1)) * tile,
            };
        } else
            snake.pop();
    
            

    if(snakeX < tile || snakeX > tile * 17
       || snakeY < tile || snakeY > tile * 15)
       clearInterval(timer);

    if(dir == "left") snakeX -= tile;
    if(dir == "right") snakeX += tile;
    if(dir == "up") snakeY -= tile;
    if(dir == "down") snakeY += tile;

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    eatTail(newHead, snake)

    snake.unshift(newHead);
};

let timer = setInterval(drawObject, 80);