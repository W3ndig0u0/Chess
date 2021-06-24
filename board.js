const board = document.querySelector(".boardGrid");
const boardLetters = document.querySelector(".letters");
const boardNumbers = document.querySelector(".numbers");
const Letters = ["a", "b", "c", "d", "e", "f", "g"];
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8"];

let index = 0;
let black = false;

for (let i = 0; i < 8; i++) {
  let letter = document.createElement("li");
  letter.textContent = letter[i];
  boardLetters.appendChild(letter);

  let number = document.createElement("li");
  number.textContent = numbers[i]
  boardLetters.appendChild(number);
}

for (let i = 0; i < 64; i++) {
  const square = document.createElement("div");

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
  }

}