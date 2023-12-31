const startButton = document.getElementById("start-button");
const htpButton = document.getElementById("htp-button");
const soundButton = document.getElementById("sound-button");

startButton.addEventListener('click', start);

htpButton.addEventListener("click", () => {
    document.getElementById("modal-container").style.display = "block";
})
  
document.getElementById("close-modal-btn").addEventListener("click", function() {
    document.getElementById("modal-container").style.display = "none";
});

soundButton.addEventListener("click", () => {
    isMuted = !isMuted;
    if(isMuted) {
      soundButton.innerText = '🔇';
    } else {
      soundButton.innerText = '🔊';
    }
    SoundManager.changeVolume(isMuted);
  })

let errors = 0;
let cardList = [
    "card01",
    "card02",
    "card03",
    "card04",
    "card05",
    "card06",
    "card07",
    "card08",
    "card09",
    "card10",
    "card10",
    "card11",
    "card12",
    "card13",
    "card14",
    "card15",
    "card16",
    "card17",
    "card18",
    "card19",
]

let backCardImgs = [
    "assets/images/back00.webp",
    "assets/images/back01.webp",
    "assets/images/back02.webp",
    "assets/images/back03.webp",
    "assets/images/back04.webp",
    "assets/images/back05.webp",
    "assets/images/back06.webp"
]

let card1Selected;
let card2Selected;

let cardSet;
let board = [];
let rows = 4;
let columns = 5;

let pairs = (rows * columns) / 2;
let gameOver = false;
let isMuted = false;

let timeOuts = [];
let currentBackCard;

let MILESTONES = {
    FIRST: {
        complete: false,
        code: 1,
        points: 1000
    },
    SECOND: {
        complete: false,
        code: 2,
        points: 2000
    },
    THIRD: {
        complete: false,
        code: 3,
        points: 3000
    },
    FOURD: {
        complete: false,
        code: 4,
        points: 4000
    }
};

/**
 * SETTINGS
 */

ProfileManager.GetProfileCode();

const gameSounds = {
    GAME_MUSIC: './assets/audio/MEMORIA-MUSICA.mp3', 
    WIN_GAME: './assets/audio/MEMORIA-VICTORIA.mp3',
    LOSE_GAME: './assets/audio/MEMORIA-DERROTA.mp3',
    ASSERT: './assets/audio/MEMORIA-CORRECTO.mp3',
    ERROR: './assets/audio/MEMORIA-INCORRECTO.mp3',
    SHOVEL: './assets/audio/MEMORIA-PALA-1.mp3',
    SHOVEL_2: './assets/audio/MEMORIA-PALA-2.mp3',
};

SoundManager.loadSounds(Object.values(gameSounds))
  .catch(function(error) {
    console.error('Error al cargar los sonidos:', error);
});

function shuffleCards() {
    cardSet = null;
    cardQuantity = cardList.slice(0, 10)
    cardSet = cardQuantity.concat(cardQuantity) //two of each card

    //shuffle
    for (let i = 0; i < cardSet.length; i++) {
        let j = Math.floor(Math.random() * cardSet.length);
        //swap
        let temp = cardSet[i];
        cardSet[i] = cardSet[j];
        cardSet[j] = temp;
    }

}

function selectBackCard() {
    currentBackCard = backCardImgs[Math.floor(Math.random() * backCardImgs.length)];
}

function shuffleCardImage(){
    for (let i = cardList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardList[i], cardList[j]] = [cardList[j], cardList[i]];
    }
}

function start(){
    startButton.removeEventListener('click', start);
    startButton.addEventListener('click', restartGame);

    startGame();
}

function startGame() {
    selectBackCard();
    shuffleCardImage();
    
    shuffleCards();

    for (let r = 0; r < rows; r++) {
        let row = []
        for (let c = 0; c < columns; c++) {
            let cardImg = cardSet.pop();
            row.push(cardImg);
            
            //Create card in document
            let card = document.createElement("img");
            card.id = r.toString() + "-" + c.toString();
            card.src = `assets/images/${cardImg}.webp`;
            card.classList.add("card");

            card.addEventListener("click", selectCard);
            card.addEventListener('mouseenter', hoverCard);
            card.addEventListener('mouseleave', leaveCard);

            document.getElementById("board").append(card);
        }
        board.push(row);
    }

    SoundManager.playMusic(gameSounds.GAME_MUSIC, true);

    const timeOut = setTimeout(hideCards, 1200);
    timeOuts.push(timeOut);
}

function hideCards() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let card = document.getElementById(r.toString() + "-" + c.toString());
            card.src = currentBackCard;
        }
    }
}

function selectCard() {
    if (this.src.includes("back")) {
        if(!card1Selected){
            card1Selected = this;
            
            this.classList.remove("card-hovered");
            this.classList.add("card-selected");

            let coords = card1Selected.id.split("-");
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card1Selected.src = "assets/images/" + board[r][c] + ".webp";

            SoundManager.playSound(gameSounds.SHOVEL);
        } else if (!card2Selected && this != card1Selected) {
            card2Selected = this;

            this.classList.remove("card-hovered");
            this.classList.add("card-selected");
            
            let coords = card2Selected.id.split("-");
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);
            
            card2Selected.src = "assets/images/" + board[r][c] + ".webp";

            SoundManager.playSound(gameSounds.SHOVEL_2);

            const timeOut = setTimeout(update, 2000);
            timeOuts.push(timeOut);
        }
    }
}

function update() {
    if(card1Selected.src != card2Selected.src) {
        card1Selected.src = currentBackCard;
        card2Selected.src = currentBackCard;
        
        errors += 1;
        
        SoundManager.playSound(gameSounds.ERROR);
        document.getElementById("errors").innerText = errors;

        card1Selected.classList.remove("card-selected");
        card2Selected.classList.remove("card-selected");
    } else {
        pairs--;
        if(pairs <= 0 && !gameOver) {
            gameOver = true;
            SoundManager.playSound(gameSounds.WIN_GAME);
            endGame();
        } else {
            SoundManager.playSound(gameSounds.ASSERT);
        }
    }

    card1Selected = null;
    card2Selected = null;
}

function cleanBoard() {

    board = [];

    let boardNode = document.getElementById("board");

    let chieldNodes = boardNode.childNodes;

    for (let i = chieldNodes.length - 1; i >= 0; i--) {
        const child = chieldNodes[i];
        boardNode.removeChild(child);
    }
}

function endGame(){
    showModal();
    checkMilestone();
}

function showModal(){
    const modal = document.getElementById('modal-container');
    modal.innerHTML = `<div class="modal-content">
                            <h4>¡Ganaste!</h4>
                            <button id="restart-btn" class="button" onclick="restartGame()">Jugar de nuevo</button>
                        </div>`
}

function restartGame() {
    const modal = document.getElementById('modal-container');
    modal.innerHTML = `<div class="modal-content">
                            <h4>Instrucciones</h4>
                            <p>Memoria es el juego donde debés encontrar los pares de ilustraciones idénticas grabadas sobre piedras antiguas.</p>
                            <p>Ganás cuando descubrís todos los pares. ¡Tratá de memorizar tu posición al principio de cada partida!</p>
                            <button id="close-modal-btn" class="btn">Volver</button>
                        </div>`

    cleanBoard();
    clearAllTimeouts();
    SoundManager.stopMusic();
    errors = 0;
    document.getElementById("errors").innerText = errors;
    startGame();
}

function clearAllTimeouts() {
    for (var i = 0; i < timeOuts.length; i++) {
      clearTimeout(timeOuts[i]);
    }
  
    timeOuts = [];
}

function hoverCard() {
    if(this.classList.contains("card-selected")) return;
    this.classList.add("card-hovered");
}

function leaveCard() {
    if(this.classList.contains("card-selected")) return;
    this.classList.remove("card-hovered");
}

function checkMilestone(){
    
    if (errors <= 5 && !MILESTONES.FOURD.complete) {
        MILESTONES.FOURD.complete = true;
        ProfileManager.SaveNewPoint(MILESTONES.FOURD.points, MILESTONES.FOURD.code);
    } else if (errors <= 10 && !MILESTONES.THIRD.complete) {
        MILESTONES.THIRD.complete = true;
        ProfileManager.SaveNewPoint(MILESTONES.THIRD.points, MILESTONES.THIRD.code);
    } else if (errors <= 15 && !MILESTONES.SECOND.complete) {
        MILESTONES.SECOND.complete = true;
        ProfileManager.SaveNewPoint(MILESTONES.SECOND.points, MILESTONES.SECOND.code);
    } else if (errors <= 20 &&!MILESTONES.FIRST.complete) {
        MILESTONES.FIRST.complete = true;
        ProfileManager.SaveNewPoint(MILESTONES.FIRST.points, MILESTONES.FIRST.code);
    } 
}


/**
 * GAME LOOP
 */
window.onload = function() {
    shuffleCards();
}