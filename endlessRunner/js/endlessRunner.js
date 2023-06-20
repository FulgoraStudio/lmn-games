const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// Player settings
const player = {
    x: 200, 
    y: 550, 
    width: 50,
    height: 50,
    speed: 300, 
    velocity: 0, 
    acceleration: 1.2, 
    image: new Image()
};

// Obstacles
const obstacleWidth = 50;
const obstacleHeight = 50;
const obstacleSpeed = 7;
const obstacleSpawnInterval = 500; // msec
let obstacles = [];

const obstacleImage = new Image();
obstacleImage.src = './img/blueBall.png';

// Load sprite
player.image.src = './img/redBall.png';

// Key's pressed
const keys = {};

// Add events
document.addEventListener('keydown', function(event) {
    keys[event.code] = true;
});

document.addEventListener('keyup', function(event) {
    keys[event.code] = false;
});

function spawnObstacle() {
    const obstacleX = Math.random() * (canvas.width - obstacleWidth);
    const obstacleY = -100;
    const obstacle = { x: obstacleX, y: obstacleY };
  
    obstacles.push(obstacle);
}

function updateObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        const obstacle = obstacles[i];
        obstacle.y += obstacleSpeed;
    
        // Draw obstacle
        context.drawImage(obstacleImage, obstacle.x, obstacle.y, obstacleWidth, obstacleHeight);
    
        // TODO: CheckCollision
        console.log("Dibuja en: ", obstacle.x, obstacle.y);
        // Delete obstacle
        if (obstacle.y > canvas.height) {
            obstacles.splice(i, 1);
            i--;
        }
    }
}


function updateGame() {
    // Update velocity
    if (keys['ArrowLeft']) {
        player.velocity -= player.acceleration;
    } else if (keys['ArrowRight']) {
        player.velocity += player.acceleration;
    }

    // Friction
    player.velocity *= 0.9;
    player.x += player.velocity;
    checkBorders(player, canvas);

    
    // Clear screen
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw Player
    context.drawImage(player.image, player.x, player.y, player.width, player.height);
    
    // Update Obstacles
    updateObstacles();

    // Update next frame
    requestAnimationFrame(updateGame);
}

function checkBorders(actor, container) {
    // Left
    if (actor.x < 0) {
      actor.x = 0;
    }
  
    // Right
    if (actor.x + actor.width > container.width) {
      actor.x = container.width - actor.width;
    }
  
    // Above
    if (actor.y < 0) {
      actor.y = 0;
    }
  
    // Below
    if (actor.y + actor.height > container.height) {
      actor.y = container.height - actor.height;
    }
}

// Spawn obstacle
setInterval(spawnObstacle, obstacleSpawnInterval);

// Game loop
updateGame();



// TODO:
/*
    Add points
    Add visualization points
    Add collision in objets
    Add menu buttons
    Add art, add music
*/