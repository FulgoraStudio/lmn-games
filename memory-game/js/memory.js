const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");

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
]
let card1Selected;
let card2Selected;

let cardSet;
let board = [];
let rows = 4;
let columns = 5;

let pairs = (rows * columns) / 2;
let gameOver = false;

let timeOuts = [];

/**
 * SETTINGS
 */

const gameSounds = {
    GAME_MUSIC: './assets/audio/MUSICA_JUEGO_MEMORIA.mp3', 
    WIN_GAME: './assets/audio/VICTORIA.mp3',
    LOSE_GAME: './assets/audio/DERROTA.mp3',
    ASSERT: './assets/audio/CORRECTO.mp3',
    ERROR: './assets/audio/INCORRECTO.mp3',
    SHOVEL: './assets/audio/PALA_1.mp3',
    SHOVEL_2: './assets/audio/PALA_2.mp3',
};

SoundManager.loadSounds(Object.values(gameSounds))
  .catch(function(error) {
    console.error('Error al cargar los sonidos:', error);
});

function shuffleCards() {
    cardSet = cardList.concat(cardList) //two of each card

    //shuffle
    for (let i = 0; i < cardSet.length; i++) {
        let j = Math.floor(Math.random() * cardSet.length);
        //swap
        let temp = cardSet[i];
        cardSet[i] = cardSet[j];
        cardSet[j] = temp;
    }

}

function start(){
    startButton.classList.add("hide");
    restartButton.classList.remove("hide");
    startGame();
}

function startGame() {

    for (let r = 0; r < rows; r++) {
        let row = []
        for (let c = 0; c < columns; c++) {
            let cardImg = cardSet.pop();
            row.push(cardImg);
            
            //Create card in document
            let card = document.createElement("img");
            card.id = r.toString() + "-" + c.toString();
            card.src = "assets/images/" + cardImg + ".png";
            card.classList.add("card");
            card.addEventListener("click", selectCard);
            document.getElementById("board").append(card);
        }
        board.push(row);
    }

    /** LOGS */
    console.log('%cHacer trampa es MUY MALO', 'color: red; font-size: 86px; margin: 4px;');
    console.log('%cPero aqui hay una pista....', 'color: red; font-size: 12px;');
    console.log(board);

    SoundManager.playMusic(gameSounds.GAME_MUSIC, true);

    const timeOut = setTimeout(hideCards, 1200);
    timeOuts.push(timeOut);
}

function hideCards() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let card = document.getElementById(r.toString() + "-" + c.toString());
            card.src = "assets/images/back.png"
        }
    }
}

function selectCard() {
    if (this.src.includes("back")) {
        if(!card1Selected){
            card1Selected = this;

            let coords = card1Selected.id.split("-");
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card1Selected.src = "assets/images/" + board[r][c] + ".png";

            SoundManager.playSound(gameSounds.SHOVEL);
        } else if (!card2Selected && this != card1Selected) {
            card2Selected = this;
            
            let coords = card2Selected.id.split("-");
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);
            
            card2Selected.src = "assets/images/" + board[r][c] + ".png";

            SoundManager.playSound(gameSounds.SHOVEL_2);

            const timeOut = setTimeout(update, 1000);
            timeOuts.push(timeOut);
        }
    }
}

function update() {
    if(card1Selected.src != card2Selected.src) {
        card1Selected.src = "assets/images/back.png";
        card2Selected.src = "assets/images/back.png";
        
        errors += 1;
        
        SoundManager.playSound(gameSounds.ERROR);
        document.getElementById("errors").innerText = errors;
    } else {
        pairs--;
        if(pairs <= 0 && !gameOver) {
            gameOver = true;
            restartButton.classList.remove("hide");

            SoundManager.playSound(gameSounds.WIN_GAME);
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

function restartGame() {
    //restartButton.classList.add("hide");

    cleanBoard();
    clearAllTimeouts();
    SoundManager.stopMusic();
    
    shuffleCards();
    startGame();
}

function clearAllTimeouts() {
    for (var i = 0; i < timeOuts.length; i++) {
      clearTimeout(timeOuts[i]);
    }
  
    timeOuts = [];
}


/**
 * GAME LOOP
 */
window.onload = function() {
    shuffleCards();
}