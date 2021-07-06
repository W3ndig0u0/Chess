import { Moves, Promotion } from "./pieceMovment.js";
import { board } from "./board.js";
var availablePlaces = new Boolean(true);
var move1 = new Audio('Sound/move2.wav');
var move2 = new Audio('Sound/move3.wav');
var dragged, lastdragged, prevPlace, newPlace;


export function Drag(square)
{
  square.addEventListener("dragover", dragOver);
  square.addEventListener("dragleave", dragLeave);
  square.addEventListener("drop", onDrop);
  square.addEventListener("dragstart", dragStart);
  square.addEventListener("dragend", dragEnd);
}

function dragStart(event) {
  if (event.target.classList.contains("placed") && !event.target.classList.contains("square")) {
    Moves(event.target.classList[2], event.target.classList[1], event.target.parentNode.classList[0], event.target);

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
  Promotion(event);
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

