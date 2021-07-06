
import {pieceCheck, setNewBoard} from "./piece.js";
import { Drag } from "./drag.js";

export const board = document.querySelector(".boardGrid");
const boardLetters = document.querySelector(".letters");
const boardNumbers = document.querySelector(".numbers");
export const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
export const numbers = ["1", "2", "3", "4", "5", "6", "7", "8"];
let i = 0;
let letterIndex = 0;
let black = false;


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

      Drag(square);

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