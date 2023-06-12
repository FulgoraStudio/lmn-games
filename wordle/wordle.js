let height = 6; //number of guesses
let width = 5; //length of the word

let row = 0; //current guess
let column = 0; //current letter

let gameOver = false;

const wordList = [
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

const guessList = wordList;

let word = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();

//LOGS
console.log('%cHacer trampa es MUY MALO', 'color: red; font-size: 21px; margin: 4px;');
console.log('%cPero aqui hay una pista....', 'color: red; font-size: 12px;');
console.log(word);

window.onload = function() {
    initialize();
}

function initialize() {
    //Create game board

    //Create Tiles
    for(let r = 0; r < height ; r++) {
        for (let c = 0; c < width; c++) {
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }
    }

    //Create keyboard
    let keyboard = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L", " "],
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
            
            if(key == "Enter"){
                keyTile.id = "Enter";
            } else if(key == "⌫") {
                keyTile.id = "Backspace";
            } else if ("A" <= key && key <= "Z") {
                keyTile.id = "Key" + key;
            }

            keyTile.addEventListener("click", proccesKey);
        
            if(key == "Enter") {
                keyTile.classList.add("enter-key-tile");
            } else {
                keyTile.classList.add("key-tile");
            }

            keyboardRow.appendChild(keyTile);
        }
        document.body.appendChild(keyboardRow);
    }

    //Listener (Key press)
    document.addEventListener("keyup", (e) => proccesInput(e));
}

function proccesKey() {
    let e = {"code" : this.id};
    proccesInput(e);
}

function proccesInput(e) {
    if(gameOver) return;

    if("KeyA" <= e.code && e.code <= "KeyZ") {
        if(column < width) {
            let currentTile = document.getElementById(row.toString() + "-" + column.toString());
            if(currentTile.innerText == "") {
                currentTile.innerText = e.code[3];
                column += 1;
            }
        }
    } else if (e.code == "Backspace") {
        if(0 < column && column <= width) {
            column -= 1;
        }
        let currentTile = document.getElementById(row.toString() + "-" + column.toString());
        currentTile.innerText = "";
    } else if (e.code == "Enter") {
        update();
    }

    if(!gameOver && row == height) {
        gameOver = true;
        document.getElementById("answer").innerText = word;
    }
}

function update() {
    let guess = "";
    document.getElementById("answer").innerText = "";

    //TODO: Implementar sistema de intentos
    // //guess word
    // for (let c = 0; c < width; c++) {
    //     let currentTile = document.getElementById(row.toString() + "-" + c.toString());
    //     let letter = currentTile.innerText;
    //     guess += letter;
    // }

    // guess = guess.toLowerCase();

    // if(!guessList.includes(guess)) {
    //     document.getElementById("answer").innerText = "No existe en la lista de palabras";
    //     return
    // }

    let correct = 0;
    let letterCount = {};

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

        if(word[c] == letter) {
            currentTile.classList.add("correct");

            let keyTile = document.getElementById("Key" + letter);
            keyTile.classList.remove("present");
            keyTile.classList.add("correct");
            correct += 1;
            letterCount[letter] -= 1;
        }

        if(correct == width) {
            gameOver = true;
        }
    }

    //Check worng positions
    for(let c = 0; c< width ; c++) {
        let currentTile = document.getElementById(row.toString() + "-" + c.toString());
        let letter = currentTile.innerText;

        if(!currentTile.classList.contains("correct")) {
            if (word.includes(letter) && letterCount[letter] > 0) {
                currentTile.classList.add("present");
                let keyTile = document.getElementById("Key" + letter);
                if(!keyTile.classList.contains("correct")) {
                    keyTile.classList.add("present");

                }
                letterCount[letter] -= 1;
            }
            else {
                currentTile.classList.add("absent");
            }
        }
    }

    row += 1; // new row
    column = 0; // first letter
}
