const board = document.getElementById("board");
const digitspanel = document.getElementById("digits");
const newGameButton = document.getElementById("new-game-button");
const htpButton = document.getElementById("htp-button");

let numSelected = null;
let tileSelected = null;
let errors = 0;

let gameBoard = [];
let boardsolution = [];

let isPlaying = false;
let winGame = false;

newGameButton.addEventListener('click', setGame);

htpButton.addEventListener("click", () => {
    document.getElementById("modal-container").style.display = "block";
})
  
document.getElementById("close-modal-btn").addEventListener("click", function() {
    document.getElementById("modal-container").style.display = "none";
});

function resetGame() {
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }
    
    while (digitspanel.firstChild) {
        digitspanel.removeChild(digitspanel.firstChild);
    }

    isPlaying = false;
    winGame = false;
}

function setGame() {
    if (isPlaying == true) return;
    isPlaying = true;

    newGameButton.innerText = "Jugar de vuelta";
    //Set Board Game
    setBoard();
    
    //Digits
    for (let i = 1; i <= 9; i++) {
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        number.classList.add("letter");
        document.getElementById("digits").appendChild(number);
    }

    //Board
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();

            if(gameBoard[r][c] != "0") {
                tile.innerText = gameBoard[r][c];
                tile.classList.add("tile-start");
                tile.classList.add("letter");
            }

            //Check is corner grid
            if(r == 0 && c == 0) {
                tile.classList.add("tile-lu");
            }
            if(r == 0 && c == 8) {
                tile.classList.add("tile-ru");
            }
            if(r == 8 && c == 0) {
                tile.classList.add("tile-ld");
            }
            if(r == 8 && c == 8) {
                tile.classList.add("tile-rd");
            }

            if(r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            
            if(c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            tile.classList.add("letter");
            document.getElementById("board").append(tile);
        }
    }
}

function setBoard() {
    do {
        gameBoard = createBoard();
        boardsolution = JSON.parse(JSON.stringify(gameBoard));
        isResolved(boardsolution);
        console.log("Try");
    } while (!isResolved(boardsolution));
    
    //TODO: Pistas
    console.log('%cHacer trampa es MUY MALO', 'color: red; font-size: 21px; margin: 4px;');
    console.log('%cPero aqui hay una pista....', 'color: red; font-size: 12px;');
    console.log("Board: ", gameBoard);
    console.log("Solution: ", boardsolution);
}

function selectNumber() {
    if(numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}

function selectTile() {
    if(numSelected) {
        if(this.innerText != "") {
            return;
        }
        //"0-0" "0-1" ...
        let coords = this.id.split("-");//["0","1"]

        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if(boardsolution[r][c] == numSelected.id) {
            this.innerText = numSelected.id;
            // console.log("Logg")
            // console.log(gameBoard);
            // console.log(numSelected.id);
            gameBoard[r][c] = Number(numSelected.id);
            // console.log(gameBoard);
            // console.log(boardsolution);
            if(boardResolved(gameBoard, boardsolution)) {
                isPlaying = false;
                winGame = true;
                console.log("WIN GAME");
            }else{
                console.log("No win yet");
            }
        }
        else
        {
            errors += 1;
            document.getElementById("errors").innerText = errors;
        }
    }
}

//Create board
function checkRow(board, row, value) {
    return !board[row].includes(value);
}

function checkColumn(board, column, value) {
    for (let i = 0; i < 9; i++) {
        if (board[i][column] === value) {
        return false;
        }
    }
    return true;
}

function checkRegion(board, row, column, value) {
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(column / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (board[i][j] === value) {
                return false;
            }
        }
    }
    return true;
}

function createBoard() {
    // Crear un tablero vacío
    const board = Array.from({ length: 9 }, () => Array(9).fill(0));
    
    // Generar valores iniciales aleatorios
    const numValoresIniciales = Math.floor(Math.random() * (30 - 20 + 1)) + 20; // Cantidad de valores iniciales a establecer
    
    for (let count = 0; count < numValoresIniciales; count++) {
        let row = Math.floor(Math.random() * 9);
        let column = Math.floor(Math.random() * 9);
        let value = Math.floor(Math.random() * 9) + 1;
    
        // Verificar si la celda ya tiene un valor asignado o si se repite en fila, columna o región
        while (
            board[row][column] !== 0 ||
            !checkRow(board, row, value) ||
            !checkColumn(board, column, value) ||
            !checkRegion(board, row, column, value)
        ) {
            row = Math.floor(Math.random() * 9);
            column = Math.floor(Math.random() * 9);
            value = Math.floor(Math.random() * 9) + 1;
        }
    
        // Establecer el valor en la celda
        board[row][column] = value;
    }

    return board;
}


//ResolveBoard
function isResolved(board) {
    const isEmptyCell = findEmptyCell(board);
    if (!isEmptyCell) {
        return true; // El Sudoku está resuelto
    }

    const [row, column] = isEmptyCell;

    for (let num = 1; num <= 9; num++) {
        if (isValidNumber(board, row, column, num)) {
            board[row][column] = num;

            if (isResolved(board)) {
                return true;
            }

            board[row][column] = 0; // Deshacer el número si no conduce a una solución válida
        }
    }

    return false; // No se encontró ninguna solución
}

function findEmptyCell(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === 0) {
                return [i, j];
            }
        }
    }
    return null; // No hay celdas vacías
}

function isValidNumber(board, row, column, num) {
    return (
        !existsInRow(board, row, num) &&
        !existsInColumn(board, column, num) &&
        !existsInRegion(board, row, column, num)
    );
}

function existsInRow(board, row, num) {
    return board[row].includes(num);
}

function existsInColumn(board, column, num) {
    for (let i = 0; i < 9; i++) {
        if (board[i][column] === num) {
        return true;
        }
    }
    return false;
}

function existsInRegion(board, row, column, num) {
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(column / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
        if (board[i][j] === num) {
            return true;
        }
        }
    }
    return false;
}

function boardResolved(boardArr, solutionArr) {
    if (boardArr.length !== solutionArr.length || boardArr[0].length !== solutionArr[0].length) {
      return false;
    }
    
    for (var i = 0; i < boardArr.length; i++) {
      for (var j = 0; j < boardArr[0].length; j++) {
        if (boardArr[i][j] !== solutionArr[i][j]) {
          return false;
        }
      }
    }
    
    return true;
}

window.onload=setGame