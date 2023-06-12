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

window.onload = function() {
    shuffleCards();
    startGame();
}

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

function startGame() {
    for (let r = 0; r < rows; r++) {
        let row = []
        for (let c = 0; c < columns; c++) {
            let cardImg = cardSet.pop();
            row.push(cardImg);
            
            //Create card in document
            let card = document.createElement("img");
            card.id = r.toString() + "-" + c.toString();
            card.src = "assets/images/" + cardImg + ".jpg";
            card.classList.add("card");
            card.addEventListener("click", selectCard);
            document.getElementById("board").append(card);
        }
        board.push(row);
    }
    console.log('%cHacer trampa es MUY MALO', 'color: red; font-size: 21px; margin: 4px;');
    console.log('%cPero aqui hay una pista....', 'color: red; font-size: 12px;');
    console.log(board);
    setTimeout(hideCards, 1200);
}

function hideCards() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let card = document.getElementById(r.toString() + "-" + c.toString());
            card.src = "assets/images/back.jpg"
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

            card1Selected.src = "assets/images/" + board[r][c] + ".jpg";
        } else if (!card2Selected && this != card1Selected) {
            card2Selected = this;

            let coords = card2Selected.id.split("-");
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card2Selected.src = "assets/images/" + board[r][c] + ".jpg";
            setTimeout(update, 1000);
        }
    }
}

function update() {
    if(card1Selected.src != card2Selected.src) {
        card1Selected.src = "assets/images/back.jpg";
        card2Selected.src = "assets/images/back.jpg";

        errors += 1;

        document.getElementById("errors").innerText = errors;
    }

    card1Selected = null;
    card2Selected = null;
}