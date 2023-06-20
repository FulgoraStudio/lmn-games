const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');


const player = {
    x: 200, 
    y: 350, 
    width: 50,
    height: 50,
    speed: 300, 
    velocity: 0, 
    acceleration: 1.2, 
    image: new Image()
};

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

// Game loop
updateGame();