const board = document.querySelector(".boardGrid");
const boardLetters = document.querySelector(".letters");
const boardNumbers = document.querySelector(".numbers");
const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8"];

let index = 0;
let letterIndex = 0;
let black = false;

//Chess pieces
var chessPieces = {
  'white': {
     'king': '&#9812;',
     'queen': '&#9813;',
     'rook': '&#9814;',
     'bishop': '&#9815;',
     'knight': '&#9816;',
     'pawn': '&#9817;'
  },
  'black': {
     'king': '&#9818;',
     'queen': '&#9819;',
     'rook': '&#9820;',
     'bishop': '&#9821;',
     'knight': '&#9822;',
     'pawn': '&#9823;'
  }
};


var setPiece = function(square, color, type) {
  square.innerHTML = chessPieces[color][type];
  square.classList.add("placed");
  board.appendChild(square);
}

var setNewBoard = function(square, x, y) {
  if(y == 7) {
    if(x == 0 || x == 7) {
      setPiece(square, 'white', 'rook');
    } else if(x == 1 || x == 6) {
      setPiece(square, 'white', 'knight');
    } else if(x == 2 || x == 5) {
      setPiece(square, 'white', 'bishop');
    } else if(x == 3) {
      setPiece(square, 'white', 'queen');
    } else if(x == 4) {
      setPiece(square, 'white', 'king');
    }
 } 
 
 else if(y == 6) {
    setPiece(square, 'white', 'pawn');
 } 
 
 else if(y == 1) {
    setPiece(square, 'black', 'pawn');
 } 
 
 else if(y == 0) {
    if(x == 0 || x == 7) {
      setPiece(square, 'black', 'rook');
    } else if(x == 1 || x == 6) {
      setPiece(square, 'black', 'knight');
    } else if(x == 2 || x == 5) {
      setPiece(square, 'black', 'bishop');
    } else if(x == 3) {
      setPiece(square, 'black', 'queen');
    } else if(x == 4) {
      setPiece(square, 'black', 'king');
    }
 }
} 

for (let y = 0; y < 8; y++) {
  for (let x = 0; x < 8; x++) {
  
  const square = document.createElement("div");
  square.classList.add(letters[y] + numbers[x]);

  setNewBoard(square, x, y);


  if (index === 0) {
    square.classList.add("number");  
  }
  
  if (letterIndex === 7){
    square.classList.add("letter");  
  }

  if (black) {
    square.classList.add("square");  
    square.classList.add("dark");
    index++;
    black = !black;
  }

  else{
    square.classList.add("square");  
    square.classList.add("white");  
    index++;
    black = !black;
  }

  board.appendChild(square);

    if (index === 8) {
      black = !black
      index = 0;
      letterIndex++;
    }
  }
}


for (let i = 0; i < 8; i++) {
  let letter = document.createElement("li");
  letter.textContent = letters[i];
  boardLetters.appendChild(letter);

  let number = document.createElement("li");
  number.textContent = numbers[i]
  boardNumbers.appendChild(number);
}
