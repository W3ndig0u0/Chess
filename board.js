const board = document.querySelector(".boardGrid");
const boardLetters = document.querySelector(".letters");
const boardNumbers = document.querySelector(".numbers");
const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8"];

let index = 0;
let letterIndex = 0;
let black = false;

const wikiLink = "https://upload.wikimedia.org/wikipedia/commons";

//!Chess pieces
var chessPieces = {
  'black': {
     'king': wikiLink + '/e/e3/Chess_kdt60.png',
     'queen': wikiLink + '/a/af/Chess_qdt60.png',
     'rook': wikiLink + '/a/a0/Chess_rdt60.png',
     'bishop': wikiLink + '/8/81/Chess_bdt60.png',
     'knight': wikiLink +  '/f/f1/Chess_ndt60.png',
     'pawn': wikiLink + '/c/cd/Chess_pdt60.png'
  },
  'white': {
     'king': wikiLink +  '/3/3b/Chess_klt60.png',
     'queen': wikiLink +  '/4/49/Chess_qlt60.png',
     'rook': wikiLink +  '/5/5c/Chess_rlt60.png',
     'bishop': wikiLink +  '/9/9b/Chess_blt60.png',
     'knight': wikiLink +  '/2/28/Chess_nlt60.png',
     'pawn': wikiLink +  '/0/04/Chess_plt60.png'
  }
};


var drawBoard = function(){
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
    
    const square = document.createElement("div");
    const Piece = document.createElement("img");
    square.classList.add(letters[x] + numbers[y]);
    
    setNewBoard(Piece, x, y);
    pieceCheck(Piece, "placed");
    square.classList.add("square");
    
    square.addEventListener("dragover", dragOver);
    square.addEventListener("dragleave", dragLeave);
    square.addEventListener("drop", onDrop);
    square .addEventListener("dragstart", dragStart);
    square.addEventListener("dragend", dragEnd)
    
    boardInfo(square);
    square.appendChild(Piece);
    board.appendChild(square);
    }
  }
}

var dragged;
var lastdragged;

function dragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.id); 
    dragged = event.target;
    lastdragged = event.target.parentNode;
};

function dragEnd(event) {
  event.target.parentNode.classList.remove("placed");
}

// !Musen över
function dragOver(event) {
  event.preventDefault();
  if (event.target.classList != "placed") {
    event.target.classList.add("hover");
  }  
  else{
    return false
  }
};

function dragLeave(event) {
  if (event.target.classList != "placed") {
    event.target.classList.remove("hover");
  }
  else{
    return false
  }
}


function onDrop(event) { 
  event.preventDefault();
  event.target.classList.remove("hover");
  event.target.classList.add("placed");

  // !Vad som drogs
  console.log(dragged);
  // !Vart den drogs TILL
  console.log(event.target);
  // !Vart den drogs FRÅN
  console.log(lastdragged);
  
  // !Om den hamnar i samma eller inte
  if (dragged != event.target) {
    event.target.appendChild(dragged);
  }

  else{
    return false
  }
}



var pieceCheck = function (piece, checkClass) {
  if (piece.classList.contains(checkClass))
  {
    piece.setAttribute('draggable', true);
  }
  else {
    piece.setAttribute('draggable', false);
  }
}


var LetterNumber = function(){ 
  for (let i = 0; i < 8; i++) {
    let letter = document.createElement("li");
    letter.textContent = letters[i];
    boardLetters.appendChild(letter);
    
    let number = document.createElement("li");
    number.textContent = numbers[i]
    boardNumbers.appendChild(number);
  }
}

var setPiece = function(square, color, type) {
  square.src = chessPieces[color][type];
  square.classList.add("placed");
  square.classList.add(color);
  square.classList.add(type);
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


var boardInfo = function(square){
  if (index === 0) {
    square.classList.add("number");
  }
  
  else if (index === 8) {
    black = !black
    index = 0;
    letterIndex++;
  }
  
  if (letterIndex === 7){
    square.classList.add("letter");  
  }
  
  if (black) { 
    square.classList.add("darkSquare");
    index++;
    black = !black;
  }

  else{
    square.classList.add("whiteSquare");  
    index++;
    black = !black;
  }
}

LetterNumber();
drawBoard();