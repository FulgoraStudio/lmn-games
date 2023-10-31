let height = 6; //number of guesses
let width = 5; //length of the word

let row = 0; //current guess
let column = 0; //current letter

let gameOver = false;
let isMuted = false;

let MILESTONES = {
    FIRST: {
        value: 4,
        complete: false,
        code: 1
    },
    SECOND: {
        value: 2,
        complete: false,
        code: 2
    },
    THIRD: {
        value: 1,
        complete: false,
        code: 3
    },
    FOURD: {
        value: 0,
        complete: false,
        code: 4
    }
}

const wordList = [
    "Ñandu",
    "Amigo",
    "Arena",
    "Barco",
    "Campo",
    "Canto",
    "Joyas",
    "Casas",
    "Cielo",
    "Color",
    "Danza",
    "Dulce",
    "Estar",
    "Feliz",
    "Fuego",
    "Gente",
    "Hogar",
    "Hotel",
    "Joven",
    "Largo",
    "Manos",
    "Miedo",
    "Nubes",
    "Perro",
    "Plaza",
    "Risas",
    "Salsa",
    "Tabla",
    "Tarde",
    "Usado",
    "Vacas",
    "Yogur",
    "Zorro"
]

const gameSounds = {
    LOSE: './assets/audio/DERROTA.wav',
    YELLOW_KEY: './assets/audio/PALABRA_AMARILLA.WAV',
    GREY_KEY: './assets/audio/PALABRA_GRIS.wav',
    GREEN_KEY: './assets/audio/PALABRA_VERDE.wav',
    SELECTION: './assets/audio/SELECCIONAR.wav',
    VICTORY: './assets/audio/VICTORIA.wav',
    ERASE: './assets/audio/BORRAR.wav',
};

SoundManager.loadSounds(Object.values(gameSounds))
  .catch(function(error) {
    console.error('Error al cargar los sonidos:', error);
});

let word = '';

ProfileManager.GetProfileCode();

window.onload = function() {
    selectNewWord();
    initialize();

    const newGameButton = document.getElementById('new-game-button');
    newGameButton.addEventListener('click', function(){
        reset();
        this.blur();// remove focus
    });

    const htpButton = document.getElementById("htp-button");
    htpButton.addEventListener("click", function(){
        document.getElementById("modal-container").style.display = "block";
        this.blur();// remove focus
    });

    document.getElementById("close-modal-btn").addEventListener("click", function() {
        document.getElementById("modal-container").style.display = "none";
    });

    const soundButton = document.getElementById("sound-button");
    soundButton.addEventListener("click", function(){
        isMuted = !isMuted;
        if(isMuted) {
          soundButton.innerText = '🔇';
        } else {
          soundButton.innerText = '🔊';
        }
        SoundManager.changeVolume(isMuted);
        this.blur();// remove focus
    });
}

function reset(){
    selectNewWord();

    document.getElementById("result-text").innerHTML = "";

    const tiles = document.getElementsByClassName('tile');
    const tilesArray = [...tiles]

    const keyTiles = document.getElementsByClassName('key-tile');
    const keyTilesArray = [...keyTiles];

    tilesArray.forEach(tile => {
        tile.innerText = "";

        tile.classList.forEach(function() {
            if(tile.classList.contains('correct')){
                tile.classList.remove('correct')
            }
            if(tile.classList.contains('absent')){
                tile.classList.remove('absent')
            }
            if(tile.classList.contains('present')){
                tile.classList.remove('present')
            }
        });
    });

    keyTilesArray.forEach(keyTile => {
        keyTile.classList.forEach(function() {
            if(keyTile.classList.contains('correct')){
                keyTile.classList.remove('correct')
            }
            if(keyTile.classList.contains('absent')){
                keyTile.classList.remove('absent')
            }
            if(keyTile.classList.contains('present')){
                keyTile.classList.remove('present')
            }
        })
    });

    gameOver = false;
    row = 0;
    column = 0;
}

function selectNewWord(){
    word = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
}

function initialize() {
    //Clear game board

    gameOver = false;
    //Create game board
    //Create Tiles
    for(let r = 0; r < height ; r++) {
        for (let c = 0; c < width; c++) {
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            if(r == 0 && c == 0) {
                tile.classList.add("tile-lu");
            }
            if(r == 0 && c == 4) {
                tile.classList.add("tile-ru");
            }
            if(r == 5 && c == 0) {
                tile.classList.add("tile-ld");
            }
            if(r == 5 && c == 4) {
                tile.classList.add("tile-rd");
            }
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }
    }

    //Create keyboard
    let keyboard = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"],
        ["Enter", "Z", "X", "C", "V", "B", "N", "M", "⌫" ]
    ]

    for (let i = 0; i < keyboard.length; i++) {
        let currentRow = keyboard[i];
        let keyboardRow = document.createElement("div");
        keyboardRow.classList.add("keyboard-row")
        
        for (let j = 0; j < currentRow.length; j++) {
            let keyTile = document.createElement("div");

            let key = currentRow[j];
            keyTile.innerText = key;
            // Set Id's
            if(key == "Enter"){
                keyTile.id = "Enter";
            } else if(key == "⌫") {
                keyTile.id = "Backspace";
            } else if (key == "Ñ") {
                keyTile.id = "KeyÑ"
            }else if ("A" <= key && key <= "Z") {
                keyTile.id = "Key" + key;
            }

            keyTile.addEventListener("click", proccesKey);
        
            //Classes
            if(key == "Enter") {
                keyTile.classList.add("enter-key-tile");
            } else {
                keyTile.classList.add("key-tile");
            }

            // Corners
            if(key == "Q"){
                keyTile.classList.add("tile-lu");
            }else if (key == "P"){
                keyTile.classList.add("tile-ru");
            } else if (key == "Enter"){
                keyTile.classList.add("tile-ld")
            } else if (key == "⌫") {
                keyTile.classList.add("tile-rd")
            }

            keyboardRow.appendChild(keyTile);
        }
        document.getElementById('keyboard-container').appendChild(keyboardRow);
    }

    //Listener (Key press)
    document.addEventListener("keyup", (e) => proccesInput(e));
}

function proccesKey() {
    let e = {"code" : this.id};
    
    //Check sepcial character
    if(e.code == "KeyÑ"){
        e.code = "Semicolon";
    }

    proccesInput(e);
}

function proccesInput(e) {
    if(gameOver) return;
    if("KeyA" <= e.code && e.code <= "KeyZ") {
        checkLetter(e.code[3]);//the letter of event
        SoundManager.playSound(gameSounds.SELECTION);
    } else if (e.code == "Semicolon") {
        checkLetter("Ñ");//the letter of event
        SoundManager.playSound(gameSounds.SELECTION);
    } else if (e.code == "Backspace") {
        eraseLetter();
        SoundManager.playSound(gameSounds.ERASE);
    } else if (e.code == "Enter" || e.code == "NumpadEnter") {
        if(column != width) return; //all tiles
        update();
    }

    //game over
    if(!gameOver && row == height) {
        gameOver = true;
        showGameOver(false);
    }
}

function checkLetter(letter){
    if(column < width) {
        let currentTile = document.getElementById(row.toString() + "-" + column.toString());
        if(currentTile.innerText == "") {
            currentTile.innerText = letter;
            column += 1;
        }
    }
}

function eraseLetter(){
    if(0 < column && column <= width) {
        column -= 1;
    }
    let currentTile = document.getElementById(row.toString() + "-" + column.toString());
    currentTile.innerText = "";
}

function showGameOver(isWin){
    checkMilestone();
    if(isWin)
    {
        document.getElementById("result-text").innerHTML = `<p id='finish-message'>La palabra era: <span>${word}</span></p>`;
        SoundManager.playOneShoot(gameSounds.VICTORY);
    } else {
        document.getElementById("result-text").innerHTML = `<p id='finish-message'>La palabra era: <span>${word}</span></p>`;
        SoundManager.playOneShoot(gameSounds.LOSE);
    }
}

function checkMilestone(){
    
    if (row >= MILESTONES.FIRST.value && !MILESTONES.FIRST.complete) {
        MILESTONES.FIRST.complete = true;
        ProfileManager.SaveNewPoint(1000, 1);
    } else if (row >= MILESTONES.SECOND.value && !MILESTONES.SECOND.complete) {
        MILESTONES.SECOND.complete = true;
        ProfileManager.SaveNewPoint(2000, 2);
    } else if (row >= MILESTONES.THIRD.value && !MILESTONES.THIRD.complete) {
        MILESTONES.THIRD.complete = true;
        ProfileManager.SaveNewPoint(3000, 3);
    } else if (row == MILESTONES.FOURD.value && !MILESTONES.FOURD.complete) {
        MILESTONES.FOURD.complete = true;
        ProfileManager.SaveNewPoint(4000, 4);
    } 


}


function update() {
    document.getElementById("result-text").innerText = "";

    let correct = 0;
    let letterCount = {};
    let hasCorrect = false;
    let hasPresent = false;

    //Check letter count
    for(let i=0; i< word.length ; i++){
        let letter = word[i];
        if(letterCount[letter]){
            letterCount[letter] +=1;
        }else{
            letterCount[letter] = 1;
        }
    }

    //Check all the correct ones
    for(let c = 0; c< width ; c++) {
        let currentTile = document.getElementById(row.toString() + "-" + c.toString());
        let letter = currentTile.innerText;

        let keyTile = document.getElementById("Key" + letter);

        if(word[c] == letter) {
            currentTile.classList.add("correct");

            
            keyTile.classList.remove("absent");
            keyTile.classList.remove("present");
            keyTile.classList.add("correct");
            correct += 1;
            
            hasCorrect = true;
            letterCount[letter] -= 1;
        }

        if(correct == width) {
            gameOver = true;
            showGameOver(true);
        }
    }

    //Check worng positions
    for(let c = 0; c< width ; c++) {
        let currentTile = document.getElementById(row.toString() + "-" + c.toString());
        let letter = currentTile.innerText;

        if(!currentTile.classList.contains("correct")) {
            let keyTile = document.getElementById("Key" + letter);

            if (word.includes(letter) && letterCount[letter] > 0) {
                currentTile.classList.add("present");

                if(!keyTile.classList.contains("correct")) {
                    keyTile.classList.add("present");
                } else {
                    keyTile.classList.add("absent");
                }

                letterCount[letter] -= 1;
                hasPresent = true;
            }
            else {
                currentTile.classList.add("absent");
                keyTile.classList.add("absent");
            }
        }
    }

    if(hasCorrect){
        SoundManager.playSound(gameSounds.GREEN_KEY);
    } else if(hasPresent){
        SoundManager.playSound(gameSounds.YELLOW_KEY);
    } else {
        SoundManager.playSound(gameSounds.GREY_KEY);
    }

    row += 1; // new row
    column = 0; // first letter
}