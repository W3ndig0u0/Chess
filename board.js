const board = document.querySelector(".boardGrid");
const boardLetters = document.querySelector(".letters");
const boardNumbers = document.querySelector(".numbers");
const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8"];

var colorGlobal;

let eventIndexLetterGlobal;
let eventIndexNumberGlobal;
let whereLetterGlobal;
let whereNumberGlobal;
let i = 0;
let letterIndex = 0;
let black = false;
var availablePlaces = new Boolean(true);
var PawnMoveTwo = new Boolean(true);
var move1 = new Audio('Sound/move2.wav');
var move2 = new Audio('Sound/move3.wav');

const wikiLink = "https://upload.wikimedia.org/wikipedia/commons";

//!Chess pieces
var chessPieces = {
  'black': {
    'king': wikiLink + '/e/e3/Chess_kdt60.png',
    'queen': wikiLink + '/a/af/Chess_qdt60.png',
    'rook': wikiLink + '/a/a0/Chess_rdt60.png',
    'bishop': wikiLink + '/8/81/Chess_bdt60.png',
    'knight': wikiLink + '/f/f1/Chess_ndt60.png',
    'pawn': wikiLink + '/c/cd/Chess_pdt60.png'
  },
  'white': {
    'king': wikiLink + '/3/3b/Chess_klt60.png',
    'queen': wikiLink + '/4/49/Chess_qlt60.png',
    'rook': wikiLink + '/5/5c/Chess_rlt60.png',
    'bishop': wikiLink + '/9/9b/Chess_blt60.png',
    'knight': wikiLink + '/2/28/Chess_nlt60.png',
    'pawn': wikiLink + '/0/04/Chess_plt60.png'
  }
};

// !ritar bordet
var drawBoard = function () {
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
      square.addEventListener("dragstart", dragStart);
      square.addEventListener("dragend", dragEnd);

      // square.addEventListener("click", dragOver);
      // square.addEventListener("click", dragLeave);
      // square.addEventListener("click", onDrop);
      // square.addEventListener("click", dragStart);
      // square.addEventListener("click", dragEnd);

      boardInfo(square);
      square.appendChild(Piece);
      board.appendChild(square);

      if (square.innerHTML.includes("false")) {
        Piece.remove();
      }

    }
  }
}

// !Ger info till piecer
var setPiece = function (piece, color, type) {
    piece.src = chessPieces[color][type];
    piece.classList.add("placed");
    piece.classList.add(color);
    piece.classList.add(type);
    piece.classList.add(color+type);
    moves(type, color, undefined, piece);
}

var dragged, lastdragged, prevPlace, newPlace, lastPiece;

function dragStart(event) {
  if (event.target.classList.contains("placed") && !event.target.classList.contains("square")) {
    moves(event.target.classList[2], event.target.classList[1], event.target.parentNode.classList[0], event.target);

    event.dataTransfer.setData("text/plain", event.target.id);
    dragged = event.target;
    lastdragged = event.target.parentNode;

    if (prevPlace == null) {
      prevPlace = lastdragged;
    }
    else return false;

    if (newPlace == null) {
      newPlace = dragged;
    }
    else return false;
  }

  else return false;
}

function dragEnd(event) {
  if (event.target.parentNode.classList.contains("square")) {
    event.target.parentNode.classList.remove("placed");
  }
  else return false
}

// !Musen över
function dragOver(event) {
  event.preventDefault();
  if (event.target.classList != "placed") {
    event.target.classList.add("hover");
  }
  else {
    return false
  }
}

function dragLeave(event) {
  if (event.target.classList != "placed") {
    event.target.classList.remove("hover");
  }
  else {
    return false
  }
}

var pieceNow;
var lastPlaceGlobal;

function onDrop(event) {
  event.target.classList.remove("hover");
  pieceNow = event.target;

  // var statsArray = ["Dragged: " + dragged.outerHTML, "where Now: " + event.target.outerHTML, "lastDragged: " + lastdragged.outerHTML, "Dragged Classes: " + dragged.classList, "where Now Classes: " + event.target.classList, "lastDragged Classes: " + lastdragged.classList];

  // console.log(statsArray);
  DropLogic(event);
  
  for (let i = 0; i < board.childNodes.length; i++) {
    board.childNodes[i].classList.remove("availablePlaces");
  }
}

var DropLogic = function (event) {

  if (dragged.classList.contains("white") && event.target.classList.contains("white") || dragged.classList.contains("black") && event.target.classList.contains("black")) {
    availablePlaces = false;
  }
  else {
    availablePlaces = true;
  }

  if (prevPlace != null && dragged != event.target) {
    prevPlace.classList.remove("lastPlaced");
    setTimeout(function () { prevPlace = lastdragged; });
  }
  else return false;

  if (event.target.classList.contains("newPlaced") && event.target.classList.contains("placed") && availablePlaces || event.target.classList.contains("placed") && !event.target.classList.contains("newPlaced") && availablePlaces) {
    if (lastPlaceGlobal === undefined) {
      newPlace.classList.remove("newPlaced");
      dragged.classList.add("newPlaced");
      move1.play();
      lastPlaceGlobal = undefined;
      var lastPlaceLocal = dragged;
      lastPlaceGlobal = lastPlaceLocal;
    }
    
    else {
      newPlace.classList.remove("newPlaced");
      dragged.classList.add("newPlaced");
      move1.play();
      lastPlaceGlobal.classList.remove("newPlaced");
      var lastPlaceLocal = dragged;
      lastPlaceGlobal = lastPlaceLocal;
    }
  }

  else if (!event.target.classList.contains("placed") && dragged != event.target && availablePlaces) {
    if (lastPlaceGlobal === undefined) {
      newPlace.classList.remove("newPlaced");
      dragged.classList.add("newPlaced");
      newPlace = dragged;
      move2.play();
    }

    else {
      lastPlaceGlobal.classList.remove("newPlaced");
      newPlace.classList.remove("newPlaced");
      dragged.classList.add("newPlaced");
      newPlace = dragged;
      move2.play();
      lastPlaceGlobal = undefined;
    };
  }

    if (dragged != event.target && availablePlaces && event.target.classList.contains("availablePlaces")) {
      event.target.appendChild(dragged);
      event.target.classList.add("placed");      
      event.target.classList.add("placed");
      lastdragged.classList.add("lastPlaced");
    }

    else if (dragged != event.target && availablePlaces && event.target.classList.contains("placed") && event.target.parentNode.classList.contains("availablePlaces")) 
    {
      event.target.parentNode.appendChild(dragged);
      dragged.appendChild(event.target);
      event.target.classList.add("placed");      
      lastdragged.classList.add("lastPlaced");
    }
}

// !Movement
var moves = function(type, color, square, event){ 
  switch(type) {
     case 'pawn':
       if(color === 'black') {
          var moves = [
            [0, -1], [0, -2], [1, -1], [-1, -1]
          ];
        } else {
          var moves = [
            [0, 1], [0, 2], [1, 1], [-1, 1]
          ];
       }
       nextMoves = getPawnMoves(moves, square, color, event);
       break;
       case 'rook':
        nextMoves = getRookMoves(square, color);
        break;
      // case 'knight':
      // 	nextMoves = getKnightMoves(i, j, color, moves);
      // 	break;
      // case 'bishop':
      //   nextMoves = getBishopMoves(square, color);
      // 	break;
      case 'queen':
        nextMoves = getQueenMoves(square, color);
        break;
      // case 'king':
      // 	nextMoves = getKnightMoves(i, j, color, moves);
        break;
     default: 
       break;
    }
}

var getPawnMoves = function(moves, square, color, event) {
  getMoveIndex(square);
  
  var moveNumber = moves[0][1];
  var moveNumberDouble = moves[1][1];
  
  let NewWhereNumberGlobalDouble = whereNumberGlobal - moveNumberDouble;
  let NewWhereNumberGlobal = whereNumberGlobal - moveNumber;
  
  // !kollar om den har rört sig eller inte
  if (eventIndexNumberGlobal == 1 && color === 'black' || color == "white" && eventIndexNumberGlobal == 6 ) {
    if (document.getElementsByClassName(whereLetterGlobal + NewWhereNumberGlobal)[0] != undefined) {
      if (document.getElementsByClassName(whereLetterGlobal + NewWhereNumberGlobal)[0].children[0] != undefined) {
          document.getElementsByClassName(whereLetterGlobal + NewWhereNumberGlobal)[0].classList.remove("availablePlaces");
      }

      else {
        document.getElementsByClassName(whereLetterGlobal + NewWhereNumberGlobalDouble)[0].classList.add("availablePlaces");
        document.getElementsByClassName(whereLetterGlobal + NewWhereNumberGlobal)[0].classList.add("availablePlaces");
      }
    }
  }

  else if( eventIndexNumberGlobal == 1 || eventIndexNumberGlobal == 2 || eventIndexNumberGlobal == 3 || eventIndexNumberGlobal == 4 || eventIndexNumberGlobal == 5 || eventIndexNumberGlobal == 6)
  {
    document.getElementsByClassName(whereLetterGlobal + NewWhereNumberGlobal)[0].classList.add("availablePlaces");
  }

  // !om någon framför, kan ej röra fram
  if (document.getElementsByClassName(whereLetterGlobal + NewWhereNumberGlobal)[0] != undefined) {
    if (document.getElementsByClassName(whereLetterGlobal + NewWhereNumberGlobal)[0].children[0] != undefined) {
        document.getElementsByClassName(whereLetterGlobal + NewWhereNumberGlobal)[0].classList.remove("availablePlaces");
    }
    else return false;
  }

  if(document.getElementsByClassName(whereLetterGlobal + NewWhereNumberGlobal)[0]){
    // !kan ej döda sidan om fram e tom!!!!
    const whereLetter = square.charAt(0);
    whereLetterGlobal = whereLetter

    function FunctionWhereLetter(letter) {
      return letter >= whereLetter;
    }

    let eventIndexLetterGlobal = letters.findIndex(FunctionWhereLetter);

    console.log(document.getElementsByClassName(letters[eventIndexLetterGlobal+1] + NewWhereNumberGlobal)[0].children[0]);
    console.log(document.getElementsByClassName(letters[eventIndexLetterGlobal-1] + NewWhereNumberGlobal)[0].children[0]);

    // !Sidan == KILLLL
    if (eventIndexLetterGlobal == 0) {
      if (document.getElementsByClassName(letters[eventIndexLetterGlobal+1] + NewWhereNumberGlobal)[0].children[0] != undefined) {
          document.getElementsByClassName(letters[eventIndexLetterGlobal+1] + NewWhereNumberGlobal)[0].classList.add("availablePlaces");

        // !samma färg = no kill :D
        if(color == "white" && document.getElementsByClassName(letters[eventIndexLetterGlobal+1] + NewWhereNumberGlobal)[0].children[0].classList.contains("white") || (color == "black" && document.getElementsByClassName(letters[eventIndexLetterGlobal+1] + NewWhereNumberGlobal)[0].children[0].classList.contains("black")))
        {
          document.getElementsByClassName(letters[eventIndexLetterGlobal + 1] + NewWhereNumberGlobal)[0].classList.remove("availablePlaces");
        }
        
      }
    }

    else if(eventIndexLetterGlobal == 7){
      if(document.getElementsByClassName(letters[eventIndexLetterGlobal-1] + NewWhereNumberGlobal)[0].children[0] != undefined)
      {

          document.getElementsByClassName(letters[eventIndexLetterGlobal-1] + NewWhereNumberGlobal)[0].classList.add("availablePlaces");
        // !samma färg = no kill :D
        if(color == "white" && document.getElementsByClassName(letters[eventIndexLetterGlobal-1] + NewWhereNumberGlobal)[0].children[0].classList.contains("white") || (color == "black" && document.getElementsByClassName(letters[eventIndexLetterGlobal-1] + NewWhereNumberGlobal)[0].children[0].classList.contains("black")))
        {
          document.getElementsByClassName(letters[eventIndexLetterGlobal-1] + NewWhereNumberGlobal)[0].classList.remove("availablePlaces");
        }

      }
    }
    
    else
    {
        if(document.getElementsByClassName(letters[eventIndexLetterGlobal-1] + NewWhereNumberGlobal)[0].children[0] != undefined)
        {
            document.getElementsByClassName(letters[eventIndexLetterGlobal-1] + NewWhereNumberGlobal)[0].classList.add("availablePlaces");
            // !samma färg = no kill :D
            if(color == "white" && document.getElementsByClassName(letters[eventIndexLetterGlobal-1] + NewWhereNumberGlobal)[0].children[0].classList.contains("white") || (color == "black" && document.getElementsByClassName(letters[eventIndexLetterGlobal-1] + NewWhereNumberGlobal)[0].children[0].classList.contains("black")))
            {
              document.getElementsByClassName(letters[eventIndexLetterGlobal-1] + NewWhereNumberGlobal)[0].classList.remove("availablePlaces");
            }
        }
        
        if (document.getElementsByClassName(letters[eventIndexLetterGlobal+1] + NewWhereNumberGlobal)[0].children[0] != undefined)
        {
          document.getElementsByClassName(letters[eventIndexLetterGlobal+1] + NewWhereNumberGlobal)[0].classList.add("availablePlaces");
          
          // !samma färg = no kill :D
          if(color == "white" && document.getElementsByClassName(letters[eventIndexLetterGlobal+1] + NewWhereNumberGlobal)[0].children[0].classList.contains("white") || (color == "black" && document.getElementsByClassName(letters[eventIndexLetterGlobal+1] + NewWhereNumberGlobal)[0].children[0].classList.contains("black")))
          {
            document.getElementsByClassName(letters[eventIndexLetterGlobal+1] + NewWhereNumberGlobal)[0].classList.remove("availablePlaces");
          }
        }
    }
  }


  // !Bli drottning när framme
  if( eventIndexNumberGlobal == 0 || eventIndexNumberGlobal == 7){
    if (color == "white") {
      event.src = "https://upload.wikimedia.org/wikipedia/commons/4/49/Chess_qlt60.png";
      event.classList.replace("pawn", "queen");
    }
    else if (color == "black"){
      event.src = "https://upload.wikimedia.org/wikipedia/commons/a/af/Chess_qdt60.png";
      event.classList.replace("pawn", "queen");
    }
  }
}

var getBishopMoves = function(square, color) {
getMoveIndex(square);

if (whereNumberGlobal != undefined) {
  if (color === "black") {
    NewWhereNumberGlobal = 1;
  }
  else if (color === "white") {
    NewWhereNumberGlobal = 8;
  }

  if (color === "black") {
    if (document.getElementsByClassName(whereLetterGlobal + NewWhereNumberGlobal)[0] != undefined) {
      for (let i = 0; i < 8; i++) {
          document.getElementsByClassName(whereLetterGlobal + NewWhereNumberGlobal)[0].classList.add("availablePlaces");
          NewWhereNumberGlobal++;
      }
    }
      else return false;
    }
        
  else if(color === "white")
      {
        if (document.getElementsByClassName(whereLetterGlobal + NewWhereNumberGlobal)[0] != undefined) {
          if(eventIndexLetterGlobal == 0)
          {
            for (let i = 0; i < 8; i++) {
              whereLetterGlobal = letters[i];
              console.log(whereLetterGlobal + NewWhereNumberGlobal);
              document.getElementsByClassName(whereLetterGlobal + NewWhereNumberGlobal)[0].classList.add("availablePlaces");
              NewWhereNumberGlobal--;
            }
          }
          else if (eventIndexLetterGlobal == 7) 
          {
            for (let i = 0; i < 8; i++) {
              whereLetterGlobal = letters[i];
              console.log(whereLetterGlobal + NewWhereNumberGlobal);
              document.getElementsByClassName(whereLetterGlobal + NewWhereNumberGlobal)[0].classList.add("availablePlaces");
              NewWhereNumberGlobal--;
            }
          }
      }
        else return false;
    }
  }
}

var getRookMoves = function(square, color) {
getMoveIndex(square);

if (whereNumberGlobal != undefined) {
  if (color === "black") {
    NewWhereNumberGlobal = 1;
  }
  else if (color === "white") {
    NewWhereNumberGlobal = 8;
  }

  if (color === "black") {
    // !NIIIIIIIIOM
    if (document.getElementsByClassName(whereLetterGlobal + NewWhereNumberGlobal)[0] != undefined) {
      for (let i = 0; i < 8; i++) {
        whereLetterGlobal = square.charAt(0);
        document.getElementsByClassName(whereLetterGlobal + NewWhereNumberGlobal)[0].classList.add("availablePlaces");
        NewWhereNumberGlobal++;
      }
      
      for (let i = 0; i < 8; i++) {
        whereLetterGlobal = letters[i];
        NewWhereNumberGlobal = square.charAt(1);
        document.getElementsByClassName(whereLetterGlobal + NewWhereNumberGlobal)[0].classList.add("availablePlaces");
      }
      document.getElementsByClassName(square)[0].classList.remove("availablePlaces");
    }
      else return false;
    }
        
    else if(color === "white")
    {
      // !NIIIIIIIIOM but white
        if (document.getElementsByClassName(whereLetterGlobal + NewWhereNumberGlobal)[0] != undefined) {
          for (let i = 0; i < 8; i++) {
            whereLetterGlobal = square.charAt(0);
            document.getElementsByClassName(whereLetterGlobal + NewWhereNumberGlobal)[0].classList.add("availablePlaces");
            NewWhereNumberGlobal--;
            document.getElementsByClassName(square)[0].classList.remove("availablePlaces");

          // !om samma färg = stanna
          // if (document.getElementsByClassName(whereLetterGlobal + NewWhereNumberGlobal)[0].childNodes[0] != undefined) {
          //   if (document.getElementsByClassName(whereLetterGlobal + NewWhereNumberGlobal)[0].childNodes[0].classList.contains("white")) {
          //       break;
          //     }
          //   }
          }
          
          for (let i = 0; i < 8; i++) {
            whereLetterGlobal = letters[i];
            NewWhereNumberGlobal = square.charAt(1);
            document.getElementsByClassName(whereLetterGlobal + NewWhereNumberGlobal)[0].classList.add("availablePlaces");
          }
          document.getElementsByClassName(square)[0].classList.remove("availablePlaces");
        }
      else return false;
    }
  }
}

var getQueenMoves = function(square, color) {
  getMoveIndex(square);

if (whereNumberGlobal != undefined) {
  if (color === "black") {
    NewWhereNumberGlobal = 1;
  }

  else if (color === "white") {
    NewWhereNumberGlobal = 8;
  }

  // !NIIIIIIIIOM
  if (color === "black") {
    if (document.getElementsByClassName(whereLetterGlobal + NewWhereNumberGlobal)[0] != undefined) {
      for (let i = 0; i < 8; i++) {
        whereLetterGlobal = square.charAt(0);
        document.getElementsByClassName(whereLetterGlobal + NewWhereNumberGlobal)[0].classList.add("availablePlaces");
        NewWhereNumberGlobal++;
      }
      
      for (let i = 0; i < 8; i++) {
        whereLetterGlobal = letters[i];
        NewWhereNumberGlobal = square.charAt(1);
        document.getElementsByClassName(whereLetterGlobal + NewWhereNumberGlobal)[0].classList.add("availablePlaces");
      }
      document.getElementsByClassName(square)[0].classList.remove("availablePlaces");
    }
      else return false;
    }
        
    // !NIIIIIIIIOM but white
    else if(color === "white")
    {
        if (document.getElementsByClassName(whereLetterGlobal + NewWhereNumberGlobal)[0] != undefined) {
          // !Framåt
          for (let i = 0; i < 8; i++) {
            whereLetterGlobal = square.charAt(0);
            document.getElementsByClassName(whereLetterGlobal + NewWhereNumberGlobal)[0].classList.add("availablePlaces");
            NewWhereNumberGlobal--;
            document.getElementsByClassName(square)[0].classList.remove("availablePlaces");
          }

            // !Sidan
          for (let i = 0; i < 8; i++) {
            whereLetterGlobal = letters[i];
            NewWhereNumberGlobal = square.charAt(1);
            document.getElementsByClassName(whereLetterGlobal + NewWhereNumberGlobal)[0].classList.add("availablePlaces");
          }

          // !om samma färg = stanna
          // if (document.getElementsByClassName(whereLetterGlobal + NewWhereNumberGlobal)[0].childNodes[0] != undefined) {
          //   if (document.getElementsByClassName(whereLetterGlobal + NewWhereNumberGlobal)[0].childNodes[0].classList.contains("white")) {
          //       break;
          //     }
          //   }

          const whereLetter = square.charAt(0);
          whereLetterGlobal = whereLetter
      
          function FunctionWhereLetter(letter) {
            return letter >= whereLetter;
          }
      
          let eventIndexLetterLocal = letters.findIndex(FunctionWhereLetter);

          // !Snett
        if (document.getElementsByClassName(whereLetterGlobal + NewWhereNumberGlobal)[0] != undefined) {
            for (let i = 0; i < 8; i++) {
              // letters[eventIndexLetterLocal];
              whereLetterGlobal = letters[i];
              console.log(document.getElementsByClassName(whereLetterGlobal + NewWhereNumberGlobal)[0]);
              document.getElementsByClassName(whereLetterGlobal + NewWhereNumberGlobal)[0].classList.add("availablePlaces");
            }
            NewWhereNumberGlobal--;
          }
            
          // !Ta bort availablePlaces där den är
          document.getElementsByClassName(square)[0].classList.remove("availablePlaces");
        }
      }
    }
  }

var getMoveIndex = function(square) {
var where = square;

if (where != undefined) {
  // !Tar första och andra bokstaven/siffran i squaren som man är i
  const whereLetter = where.charAt(0);
  const whereNumber = where.charAt(1);
  
  whereLetterGlobal = whereLetter
  whereNumberGlobal = whereNumber;

  function FunctionWhereLetter(letter) {
    return letter >= whereLetter;
  }
  
  function FunctionWhereNumber(number) {
    return number >= whereNumber;
  }
  
  // !hittar indexen som bokstäverna är inom arrayen
  let eventIndexLetterLocal = letters.findIndex(FunctionWhereLetter);
  let eventIndexNumberLocal = numbers.findIndex(FunctionWhereNumber);
  
  eventIndexNumberGlobal = eventIndexNumberLocal;
  eventIndexLetterGlobal = eventIndexLetterLocal;
 }
 else return false;
}


// !Bordet
var pieceCheck = function (piece, checkClass) {
  if (piece.classList.contains(checkClass)) {
    piece.setAttribute('draggable', true);
  }
  else {
    piece.setAttribute('draggable', false);
  }
}


var LetterNumber = function () {
  for (let i = 0; i < 8; i++) {
    let letter = document.createElement("li");
    letter.textContent = letters[i];
    boardLetters.appendChild(letter);

    let number = document.createElement("li");
    number.textContent = numbers[i]
    boardNumbers.appendChild(number);
  }
}

// !reset
var setNewBoard = function (square, x, y) {
  if (y == 7) {
    if (x == 0 || x == 7) {
      setPiece(square, 'white', 'rook');
    } else if (x == 1 || x == 6) {
      setPiece(square, 'white', 'knight');
    } else if (x == 2 || x == 5) {
      setPiece(square, 'white', 'bishop');
    } else if (x == 3) {
      setPiece(square, 'white', 'queen');
    } else if (x == 4) {
      setPiece(square, 'white', 'king');
    }
  }

  else if (y == 6) {
    setPiece(square, 'white', 'pawn');
  }

  else if (y == 1) {
    setPiece(square, 'black', 'pawn');
  }

  else if (y == 0) {
    if (x == 0 || x == 7) {
      setPiece(square, 'black', 'rook');
    } else if (x == 1 || x == 6) {
      setPiece(square, 'black', 'knight');
    } else if (x == 2 || x == 5) {
      setPiece(square, 'black', 'bishop');
    } else if (x == 3) {
      setPiece(square, 'black', 'queen');
    } else if (x == 4) {
      setPiece(square, 'black', 'king');
    }
  }
}

var boardInfo = function (square) {
  if (i === 0) {
    square.classList.add("number");
  }

  else if (i === 8) {
    black = !black
    i = 0;
    letterIndex++;
  }

  if (letterIndex === 7) {
    square.classList.add("letter");
  }

  if (black) {
    square.classList.add("darkSquare");
    i++;
    black = !black;
  }

  else {
    square.classList.add("whiteSquare");
    i++;
    black = !black;
  }
}


LetterNumber();
drawBoard();