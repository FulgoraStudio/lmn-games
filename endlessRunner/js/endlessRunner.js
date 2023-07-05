const gameContainer = document.getElementById('container');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const borderWidth = 1;
const borderColor = 'black';

context.lineWidth = borderWidth;
context.strokeStyle = borderColor;

const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');

const pointsLabel = document.getElementById('points-text');
const distanceLabel = document.getElementById('distance-text');

startButton.onclick = () => {
    startButton.classList.add('hide');
    resetButton.classList.remove('hide');
    startGame()
};
resetButton.onclick = () => resetGame();

let timeOuts = []

const TAGS = Object.freeze({
    PLAYER: 'PLAYER',
    ENEMY: 'ENEMY',
    COLLECTABLE: 'COLLECTABLE',
})


/**
 * GLOBAL VARIABLES
 */
let points = 0;
let distance = 0;
const PLAYER_LIVES = 5;
let lives = PLAYER_LIVES;

// Spawner settings
const obstacleSpawnInterval = 500; // msec
const collectableSpawnInterval = 600; // msec

let obstacles = [];
let collectables = [];

// Key's pressed
const keys = {};
let lastKeyPressed;
let isDead = false;
let isPlaying = false;

// Audio
const gameSounds = {
    MUSIC: './assets/audio/RUNNER.mp3',
    COLLECTABLE: './assets/audio/CONFIRM_1.wav', 
    ENEMY: './assets/audio/CLICK_DENY_6.wav',
};

SoundManager.loadSounds(Object.values(gameSounds))
  .catch(function(error) {
    console.error('Error al cargar los sonidos:', error);
});


/**
 * SETTINGS
 */

// PLAYER
const player = new Actor(200, 550, 100, 100, 300, 0, 1.2, new Image());

const updatePlayer = function(inputKeys){
    // Input: Update player velocity
    if (inputKeys['ArrowLeft']) {
        this._velocity -= this._acceleration;
        if(!this._isAnimating) {
            this.playAnimation("left");
        }
    } else if (inputKeys['ArrowRight']) {
        this._velocity += this._acceleration;
        if(!this._isAnimating)  {
            this.playAnimation("right");
        }
    } else {
        if(!this._isAnimating)  {
            this.playAnimation("idle", true);
        }
    }

    // Friction
    this._velocity *= 0.9;
    this._x += this._velocity;


}

const drawPlayer = function(ctx){
    ctx.drawImage(this._image, this._x, this._y, this._width, this._height);
}

player.draw = drawPlayer;
player.update = updatePlayer;
player.image.src = './assets/img/player/idle/idle00.png';
player.idleImage = './assets/img/player/idle/idle00.png';

player.animations = {
    "idle": [
        (new Image()).src='./assets/img/player/idle/idle00.png',
        (new Image()).src='./assets/img/player/idle/idle01.png',
        (new Image()).src='./assets/img/player/idle/idle02.png',
        (new Image()).src='./assets/img/player/idle/idle03.png',
        (new Image()).src='./assets/img/player/idle/idle04.png',
        (new Image()).src='./assets/img/player/idle/idle05.png',
        (new Image()).src='./assets/img/player/idle/idle06.png',
        (new Image()).src='./assets/img/player/idle/idle07.png',
        (new Image()).src='./assets/img/player/idle/idle08.png'
    ],
    "left": [
        (new Image()).src='./assets/img/player/moveL/moveleft01.png',
        (new Image()).src='./assets/img/player/moveL/moveleft02.png',
        (new Image()).src='./assets/img/player/moveL/moveleft03.png',
        (new Image()).src='./assets/img/player/moveL/moveleft04.png',
        (new Image()).src='./assets/img/player/moveL/moveleft05.png',
        (new Image()).src='./assets/img/player/moveL/moveleft06.png',
        (new Image()).src='./assets/img/player/moveL/moveleft07.png'
    ],
    "right": [
        (new Image()).src='./assets/img/player/moveR/moveright01.png',
        (new Image()).src='./assets/img/player/moveR/moveright02.png',
        (new Image()).src='./assets/img/player/moveR/moveright03.png',
        (new Image()).src='./assets/img/player/moveR/moveright04.png',
        (new Image()).src='./assets/img/player/moveR/moveright05.png',
        (new Image()).src='./assets/img/player/moveR/moveright06.png',
        (new Image()).src='./assets/img/player/moveR/moveright07.png'
    ]
}

// player.image.src = player.animations['left'][0];

player.tag = TAGS.PLAYER;


// BASIC OBSTACLE
const originalObstacle = new Actor(200, -100, 50, 50, 7, 0, 1.2, new Image());

const updateObstacle = function(){
    this._y += this._speed;
}

const drawObstacle = function(ctx){
    ctx.globalCompositeOperation = 'destination-over';
    ctx.drawImage(this._image, this._x, this._y, this._width, this._height);
}

originalObstacle.draw = drawObstacle;
originalObstacle.update = updateObstacle;
originalObstacle.image.src = './assets/img/blueBall.png';
originalObstacle.tag = TAGS.ENEMY;

// BASIC COLLECTABLE
const originalCollectable = new Actor(200, -100, 50, 50, 5, 0, 1.2, new Image());

const updateCollectable = function(){
    this._y += this._speed;
}

const drawCollectable = function(ctx){
    ctx.globalCompositeOperation = 'destination-over';
    ctx.drawImage(this._image, this._x, this._y, this._width, this._height);
}

originalCollectable.draw = drawCollectable;
originalCollectable.update = updateCollectable;
originalCollectable.image.src = './assets/img/greenBall.png';
originalCollectable.tag = TAGS.COLLECTABLE;

// Add events
document.addEventListener('keydown', function(event) {
    if(!lastKeyPressed || lastKeyPressed != event.code){
        lastKeyPressed = event.code
        keys['ArrowLeft'] = false;
        keys['ArrowRight'] = false;
        player.stopAnimation();
        // player.playAnimation("idle", true);
    }
    
    keys[event.code] = true;
});

document.addEventListener('keyup', function(event) {
    player.stopAnimation();
    keys[event.code] = false;
});

/**
 * FUNCTIONS
 */
function spawnObstacle() {
    const obstacleX = Math.random() * (canvas.width - originalObstacle.width);
    const obstacleY = -100;

    const obstacle = Object.assign(Object.create(Object.getPrototypeOf(originalObstacle)), originalObstacle);
    obstacle.x = obstacleX;
    obstacle.y = obstacleY;
  
    obstacles.push(obstacle);
}

function spawnCollectable() {
    const collectableX = Math.random() * (canvas.width - originalCollectable.width);
    const collectableY = -100;

    const collectable = Object.assign(Object.create(Object.getPrototypeOf(originalCollectable)), originalCollectable);
    collectable.x = collectableX;
    collectable.y = collectableY;
  
    collectables.push(collectable);
}

function updateObstacles(ctx) {
    for (let i = 0; i < obstacles.length; i++) {
        const obstacle = obstacles[i];

        obstacle.update();
        obstacle.draw(ctx);
        
        if (obstacle.y > canvas.height) {
            obstacles.splice(i, 1);
            i--;
        }
    }
}

function updateCollectables(ctx) {
    for (let i = 0; i < collectables.length; i++) {
        const collectable = collectables[i];

        collectable.update();
        collectable.draw(ctx);
        
        if (collectable.y > canvas.height) {
            collectables.splice(i, 1);
            i--;
        }
    }
}


function gameLoop() {
   

    checkBorders(player, canvas);

    context.clearRect(0, 0, canvas.width, canvas.height);
    
    //Player update
    if(!isDead) {
        player.update(keys);
        player.draw(context);
    
        obstacles.forEach((obstacle, index) => {
            if(checkCollision(player, obstacle))
            {
                obstacles.splice(index, 1);
            }
        })
    
        collectables.forEach((collectable, index) => {
            if(checkCollision(player, collectable))
            {
                collectables.splice(index, 1);
            }
        })

        addDistance();
    }

    //Update Objects
    updateObstacles(context);
    updateCollectables(context);

    //Request frames
    requestAnimationFrame(gameLoop);
}

function addDistance() {
    if(!isPlaying) return;
    distance += 0.01;
    distanceLabel.innerText = `${distance.toFixed(3)}m`;
}

function checkBorders(actor, container) {
    // Left
    if (actor.x < 0) {
      actor.x = 0;
    }
  
    // Right
    if (actor.x + actor.width > container.width + 5) {
      actor.x = container.width - actor.width + 5;
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

function resizeCanvas() {
    canvas.width = gameContainer.offsetWidth;
    canvas.height = gameContainer.offsetHeight;
}

/**
 * Check collision bounds form actorA Sprite with actorB Sprite
 * @param {Object} actorA 
 * @param {Object} actorB 
 * @returns 
 */
function checkCollision(actorA, actorB) {
    const actorALeft = actorA.x;
    const actorARight = actorA.x + actorA.width;
    const actorATop = actorA.y;
    const actorABottom = actorA.y + actorA.height;
  
    const actorBLeft = actorB.x;
    const actorBRight = actorB.x + actorB.width;
    const actorBTop = actorB.y;
    const actorBBottom = actorB.y + actorB.height;
  
    // Comprobar si los bordes se superponen
    if (
        actorALeft < actorBRight &&
        actorARight > actorBLeft &&
        actorATop < actorBBottom &&
        actorABottom > actorBTop
    ) {
        checkCollisionActorTag(actorB.tag);
        return true;
    }
  
    // No hay colisión
    return false;
}

function checkCollisionActorTag(tag){
    if(tag == TAGS.ENEMY) {
        SoundManager.playSound(gameSounds.ENEMY);
        lives--;
        if(lives <= 0) {
            isDead = true;
            isPlaying = false;
        }
    }

    if(tag == TAGS.COLLECTABLE) {
        points++;
        SoundManager.playSound(gameSounds.COLLECTABLE);
        pointsLabel.innerText = `${points}`;
    }
}

function startGame() {
    let spawnObstacleTimeOut = setInterval(spawnObstacle, obstacleSpawnInterval);
    let spawnCollectableTimeOut = setInterval(spawnCollectable, collectableSpawnInterval);

    timeOuts.push(spawnObstacleTimeOut);
    timeOuts.push(spawnCollectableTimeOut);

    player.x = 200;
    player.y = 550;
    player.velocity = 0;

    lives = PLAYER_LIVES;
    isDead = false;
    isPlaying = true;

    points = 0;
    distance = 0;

    pointsLabel.innerText = `${points}`;
    distanceLabel.innerText = `${distance.toFixed(3)}m`;

    SoundManager.playMusic(gameSounds.MUSIC, true);
}

function resetGame() {
    SoundManager.stopMusic();
    clearAllTimeouts();

    obstacles = [];
    collectables = [];

    startGame();
}

function clearAllTimeouts() {
    for (var i = 0; i < timeOuts.length; i++) {
      clearTimeout(timeOuts[i]);
    }
  
    timeOuts = [];
}

resizeCanvas();
// Game loop
gameLoop();

// TODO:
/*
    Add art, add music
    Add Saved score in local Storage
*/