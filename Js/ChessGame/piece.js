import { Moves } from "./pieceMovment.js";
const wikiLink = "https://upload.wikimedia.org/wikipedia/commons";

//!Chess pieces
var chessPieces = {
  black: {
    king: wikiLink + "/e/e3/Chess_kdt60.png",
    queen: wikiLink + "/a/af/Chess_qdt60.png",
    rook: wikiLink + "/a/a0/Chess_rdt60.png",
    bishop: wikiLink + "/8/81/Chess_bdt60.png",
    knight: wikiLink + "/f/f1/Chess_ndt60.png",
    pawn: wikiLink + "/c/cd/Chess_pdt60.png",
  },
  white: {
    king: wikiLink + "/3/3b/Chess_klt60.png",
    queen: wikiLink + "/4/49/Chess_qlt60.png",
    rook: wikiLink + "/5/5c/Chess_rlt60.png",
    bishop: wikiLink + "/9/9b/Chess_blt60.png",
    knight: wikiLink + "/2/28/Chess_nlt60.png",
    pawn: wikiLink + "/0/04/Chess_plt60.png",
  },
};

// !reset
export var setNewBoard = function (square, x, y) {
  if (y == 7) {
    if (x == 0 || x == 7) {
      setPiece(square, "white", "rook");
    } else if (x == 1 || x == 6) {
      setPiece(square, "white", "knight");
    } else if (x == 2 || x == 5) {
      setPiece(square, "white", "bishop");
    } else if (x == 3) {
      setPiece(square, "white", "queen");
    } else if (x == 4) {
      setPiece(square, "white", "king");
    }
  } else if (y == 6) {
    setPiece(square, "white", "pawn");
  } else if (y == 1) {
    setPiece(square, "black", "pawn");
  } else if (y == 0) {
    if (x == 0 || x == 7) {
      setPiece(square, "black", "rook");
    } else if (x == 1 || x == 6) {
      setPiece(square, "black", "knight");
    } else if (x == 2 || x == 5) {
      setPiece(square, "black", "bishop");
    } else if (x == 3) {
      setPiece(square, "black", "queen");
    } else if (x == 4) {
      setPiece(square, "black", "king");
    }
  }
};

// !Ger info till piecer
var setPiece = function (piece, color, type) {
  piece.src = chessPieces[color][type];
  piece.classList.add("placed");
  piece.classList.add(color);
  piece.classList.add(type);
  piece.classList.add(color + type);
  Moves(type, color, undefined, piece);
};

// !de kan röra sig
export var pieceCheck = function (piece, checkClass) {
  if (piece.classList.contains(checkClass)) {
    piece.setAttribute("draggable", true);
  } else {
    piece.setAttribute("draggable", false);
  }
};
