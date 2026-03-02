$(document).ready(function() {
    const canvas = $("#snakeGame")[0];
    const ctx = canvas.getContext("2d");
    const grid = 20;
    let score = 0;
    let speed = 100;

    // Snake initialization
    let snake = [{x: 160, y: 160}, {x: 140, y: 160}, {x: 120, y: 160}];
    let dx = grid; // Horizontal velocity
    let dy = 0;    // Vertical velocity

    // Food initialization
    let food = {
        x: Math.floor(Math.random() * 19 + 1) * grid,
        y: Math.floor(Math.random() * 19 + 1) * grid
    };

    function main() {
        if (didGameEnd()) {
            alert("Game Over! Your score: " + score);
            location.reload(); 
            return;
        }

        setTimeout(function onTick() {
            clearCanvas();
            drawFood();
            advanceSnake();
            drawSnake();
            main();
        }, speed);
    }

    function clearCanvas() {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function drawSnake() {
        snake.forEach((part, index) => {
            ctx.fillStyle = (index === 0) ? "#2ecc71" : "#27ae60"; // Head is lighter green
            ctx.strokeStyle = "#000";
            ctx.fillRect(part.x, part.y, grid, grid);
            ctx.strokeRect(part.x, part.y, grid, grid);
        });
    }

    function advanceSnake() {
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };
        snake.unshift(head);

        // Check if snake ate food
        if (snake[0].x === food.x && snake[0].y === food.y) {
            score += 10;
            $("#score").text(score);
            createFood();
        } else {
            snake.pop(); // Remove tail
        }
    }

    function didGameEnd() {
        // Hit walls
        const hitLeft = snake[0].x < 0;
        const hitRight = snake[0].x > canvas.width - grid;
        const hitTop = snake[0].y < 0;
        const hitBottom = snake[0].y > canvas.height - grid;

        // Hit self
        for (let i = 4; i < snake.length; i++) {
            if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
        }

        return hitLeft || hitRight || hitTop || hitBottom;
    }

    function createFood() {
        food.x = Math.floor(Math.random() * (canvas.width / grid)) * grid;
        food.y = Math.floor(Math.random() * (canvas.height / grid)) * grid;
    }

    function drawFood() {
        ctx.fillStyle = "#e74c3c";
        ctx.fillRect(food.x, food.y, grid, grid);
    }

    // Input handling
    $(document).keydown(function(e) {
        const key = e.which;
        const goingUp = dy === -grid;
        const goingDown = dy === grid;
        const goingRight = dx === grid;
        const goingLeft = dx === -grid;

        if (key === 37 && !goingRight) { dx = -grid; dy = 0; }
        if (key === 38 && !goingDown)  { dx = 0; dy = -grid; }
        if (key === 39 && !goingLeft)   { dx = grid; dy = 0; }
        if (key === 40 && !goingUp)    { dx = 0; dy = grid; }
    });

    main(); // Start the game
});