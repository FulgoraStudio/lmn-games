const gameContainer = document.getElementById('container');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const borderWidth = 1;
const borderColor = 'black';

context.lineWidth = borderWidth;
context.strokeStyle = borderColor;
const BG_COLOR = "#587176";

const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');
const htpButton = document.getElementById("htp-button");
const soundButton = document.getElementById("sound-button");

const pointsLabel = document.getElementById('points-text');
const distanceLabel = document.getElementById('distance-text');

htpButton.addEventListener("click", () => {
    document.getElementById("modal-container").style.display = "block";
})
  
document.getElementById("close-modal-btn").addEventListener("click", function() {
    document.getElementById("modal-container").style.display = "none";
});

startButton.onclick = () => {
    startButton.classList.add('hide');
    resetButton.classList.remove('hide');
    startGame()
};
resetButton.onclick = () => resetGame();

soundButton.addEventListener("click", () => {
    isMuted = !isMuted;
    if(isMuted) {
      soundButton.innerText = '🔇';
    } else {
      soundButton.innerText = '🔊';
    }
    SoundManager.changeVolume(isMuted);
})

let timeOuts = []

const TAGS = Object.freeze({
    PLAYER: 'PLAYER',
    ENEMY: 'ENEMY',
    COLLECTABLE: 'COLLECTABLE',
})

const obstacleTypes = ['bottle', 'rock', 'can'];

const env_elements = {
    "left": [
        './assets/img/enviroment/left/ARB-I-1.png',
        './assets/img/enviroment/left/ARB-I-2.png',
        './assets/img/enviroment/left/ARB-I-3.png',
        './assets/img/enviroment/left/ARB-I-4.png',
        './assets/img/enviroment/left/ARB-I-5.png',
        './assets/img/enviroment/left/T-I1.png',
        './assets/img/enviroment/left/T-I2.png',
        './assets/img/enviroment/left/T-I3.png',
        './assets/img/enviroment/left/T-I4.png',
    ],
    "right": [
        './assets/img/enviroment/right/ARB-D-1.png',
        './assets/img/enviroment/right/ARB-D-2.png',
        './assets/img/enviroment/right/ARB-D-3.png',
        './assets/img/enviroment/right/ARB-D-4.png',
        './assets/img/enviroment/right/ARB-D-5.png',
        './assets/img/enviroment/right/ARB-D-6.png',
        './assets/img/enviroment/right/T-D1.png',
        './assets/img/enviroment/right/T-D2.png',
        './assets/img/enviroment/right/T-D3.png',
        './assets/img/enviroment/right/T-D4.png',
    ],
    "middle": [
        './assets/img/enviroment/water/waves.png',
        './assets/img/enviroment/water/reflexes.png'
    ]
}


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
const leftEnvSpawnInterval = 600;
const rightEnvSpawnInterval = 600;

let obstacles = [];
let collectables = [];
let envElements = [];

// Key's pressed
const keys = {};
let lastKeyPressed;
let isDead = false;
let isPlaying = false;
let isMuted = false;

// Audio
const gameSounds = {
    MUSIC: './assets/audio/ENDLESS-RUNNER-MUSICA.mp3',
    COLLECTABLE: './assets/audio/ENDLESS-RUNNER-COMER-LIBELULA.mp3',
    ENEMY: './assets/audio/ENDLESS-RUNNER-IMPACTO-PIEDRA.mp3',
};

SoundManager.loadSounds(Object.values(gameSounds))
  .catch(function(error) {
    console.error('Error al cargar los sonidos:', error);
});


/**
 * SETTINGS
 */

// PLAYER
const player = new Actor(200, 550, 100, 100, 100, 0, 1, new Image());

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
    ctx.clearRect(this._x, this._y, this._width, this._height);
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(this._x-1, this._y, this._width+2, this._height);
    ctx.drawImage(this._image, 
        this._x, 
        this._y, 
        this._width, 
        this._height);
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
        // (new Image()).src='./assets/img/player/idle/idle08.png'
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

player.tag = TAGS.PLAYER;


// BASIC OBSTACLE
const originalObstacle = new Actor(200, -100, 100, 100, 7, 0, 1.2, new Image());

const updateObstacle = function(){
    this._y += this._speed;
}

const drawObstacle = function(ctx){
    // ctx.globalCompositeOperation = 'destination-over';
    ctx.drawImage(this._image, this._x, this._y, this._width, this._height);
}

originalObstacle.draw = drawObstacle;
originalObstacle.update = updateObstacle;
originalObstacle.image.src = './assets/img/obstacles/rock.png';
originalObstacle.tag = TAGS.ENEMY;
originalObstacle.idleImage = './assets/img/obstacles/rock.png';
originalObstacle.animations = {
    "bottle": [
        (new Image()).src = './assets/img/obstacles/bottle.png'
    ],
    "rock": [
        (new Image()).src = './assets/img/obstacles/rock.png'
    ],
    "can": [
        (new Image()).src = './assets/img/obstacles/can.png'
    ]
}

// BASIC COLLECTABLE
const originalCollectable = new Actor(200, -100, 50, 50, 5, 0, 1.2, new Image());

const updateCollectable = function(){
    this._y += this._speed;
}

const drawCollectable = function(ctx){
    // ctx.globalCompositeOperation = 'destination-over';
    ctx.drawImage(this._image, this._x, this._y, this._width, this._height);
}

originalCollectable.draw = drawCollectable;
originalCollectable.update = updateCollectable;
originalCollectable.image.src = './assets/img/collectables/idle00.png';
originalCollectable.tag = TAGS.COLLECTABLE;
originalCollectable.idleImage = './assets/img/collectables/idle00.png';
originalCollectable.animations = {
    "idle": [
        (new Image()).src='./assets/img/collectables/idle00.png',
        (new Image()).src='./assets/img/collectables/idle01.png',
        (new Image()).src='./assets/img/collectables/idle02.png',
        (new Image()).src='./assets/img/collectables/idle03.png',
        (new Image()).src='./assets/img/collectables/idle04.png',
        (new Image()).src='./assets/img/collectables/idle05.png',
        (new Image()).src='./assets/img/collectables/idle06.png',
        (new Image()).src='./assets/img/collectables/idle07.png',
    ]
};


/**
 * 
 * ENVIROMENT
 * 
 */
const enviromentElemnt = new Actor(0, -100, 75 , 75, 5, 0, 1.2, new Image());

const updateEnviroment = function(){
    this._y += this._speed;
}

const drawEnviroment = function(ctx){
    // ctx.globalCompositeOperation = 'destination-over';
    ctx.drawImage(this._image, this._x, this._y, this._width, this._height);
}

enviromentElemnt.draw = drawEnviroment;
enviromentElemnt.update = updateEnviroment;
// enviromentElemnt.image.src = './assets/img/blueBall.png';
// leftEnviroment.tag = TAGS.Enviroment;


// Add events
document.addEventListener('keydown', function(event) {
    if(!lastKeyPressed || lastKeyPressed != event.code){
        lastKeyPressed = event.code
        keys['ArrowLeft'] = false;
        keys['ArrowRight'] = false;
        player.stopAnimation();
    }
    
    keys[event.code] = true;
});

document.addEventListener('keyup', function(event) {
    player.stopAnimation();
    // player.playAnimation("idle", true);
    keys[event.code] = false;
});

/**
 * FUNCTIONS
 */
function spawnObstacle() {
    const obstacleX = Math.random() * (canvas.width - originalObstacle.width);
    const obstacleY = -100;

    // const obstacle = Object.assign(Object.create(Object.getPrototypeOf(originalObstacle)), originalObstacle);
    const obstacle = Object.assign(Object.create(Object.getPrototypeOf(originalObstacle)), originalObstacle, {
        _image: new Image()
    });

    obstacle.x = obstacleX;
    obstacle.y = obstacleY;

    const obstacleType = obstacleTypes[Math.floor(Math.random() * 3)];

    obstacle.type = obstacleType;
    obstacle.playAnimation(obstacleType, true);
  
    obstacles.push(obstacle);
}

function spawnCollectable() {
    const collectableX = Math.random() * (canvas.width - originalCollectable.width);
    const collectableY = -100;

    const collectable = Object.assign(Object.create(Object.getPrototypeOf(originalCollectable)), originalCollectable);
    collectable.x = collectableX;
    collectable.y = collectableY;

    collectable.playAnimation('idle', true);
  
    collectables.push(collectable);
}

function spawnEnviromentElement() {
    if(Math.random() < 0.5) return;
    const enviromentType = Math.random();

    let enviromentX;
    let enviromentY = -100;
    let sprite;

    if (enviromentType > 0.8) { //izquierda
        enviromentX = 0;
        sprite = env_elements['left'][Math.floor((Math.random() * env_elements['left'].length))];
    } else if (enviromentType > 0.4) {
        enviromentX = canvas.width - enviromentElemnt.width;
        console.log("pasa")
        sprite = env_elements['right'][Math.floor((Math.random() * env_elements['right'].length))]
    } else {
        enviromentX = (canvas.width / 2) - (enviromentElemnt.width /2);
        sprite = env_elements['middle'][Math.floor((Math.random() * env_elements['middle'].length))]
    }
    
    const enviroment = Object.assign(Object.create(Object.getPrototypeOf(enviromentElemnt)), enviromentElemnt, {
        _image: new Image(sprite)
    });
    enviroment.image.src = sprite;
    enviroment.x = enviromentX;
    enviroment.y = enviromentY;
  
    envElements.push(enviroment);
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

function updateEnviromentElements(ctx) {
    for (let i = 0; i < envElements.length; i++) {
        const envElement = envElements[i];

        envElement.update();
        envElement.draw(ctx);
        
        if (envElement.y > canvas.height) {
            envElements.splice(i, 1);
            i--;
        }
    }
}

function gameLoop() {

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = BG_COLOR;
    context.fillRect(0, 0, canvas.width, canvas.height);
    updateEnviromentElements(context);
    if(isPlaying) {
        checkBorders(player, canvas);
        
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
        
    }

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
    const actorALeft = actorA.x + (actorA.width /3);//shrink box collision
    const actorARight = actorA.x + (actorA.width - (actorA.width /3));
    const actorATop = actorA.y;
    const actorABottom = actorA.y + (actorA.height - (actorA.height/3));
  
    const actorBLeft = actorB.x + (actorB.width /4);
    const actorBRight = actorB.x + (actorB.width - (actorB.width /4));
    const actorBTop = actorB.y + Math.abs((actorB.height / 4));
    const actorBBottom = actorB.y + (actorB.height - Math.abs((actorB.height / 4)));
  
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
        // lives--;
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
    let spawnLeftEnv = setInterval(spawnEnviromentElement, leftEnvSpawnInterval);
    let spawnRightEnv = setInterval(spawnEnviromentElement, rightEnvSpawnInterval);

    timeOuts.push(spawnObstacleTimeOut);
    timeOuts.push(spawnCollectableTimeOut);
    timeOuts.push(spawnLeftEnv);
    timeOuts.push(spawnRightEnv);

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
    envElements = [];

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