import { letters, numbers } from "./board.js";

let eventIndexLetterGlobal;
let eventIndexNumberGlobal;
export let whereLetterGlobal;
let whereNumberGlobal;
export let NewWhereNumberGlobal ;

// !Movement
export var Moves = function(type, color, square){ 
  Castle(square, color, type);
  switch(type) {
     case 'pawn':
      getPawnMoves(square, color);
       break;
       case 'rook':
        getRookMoves(square, color);
        break;
      case 'knight':
      	getKnightMoves(square, color);
      	break;
      case 'bishop':
        getBishopMoves(square, color);
      	break;
      case 'queen':
        getQueenMoves(square, color);
        break;
      case 'king':
        getKingMoves(square, color);
        break;
        default: 
        break;
    }
}

export var CheckLooker = function(type, color, square) {
  getMoveIndex(square);

  if (type == "king") {
    if (document.getElementsByClassName(square)[0] != undefined){
      if (document.getElementsByClassName(square)[0].classList.contains("availablePlaces") ){
        console.log("ASAD");
      }
    }
   }  
    
  if (whereNumberGlobal != undefined) {
    let whereLetter = square.charAt(0);
    let KingWhereNumber = square.charAt(1);
    KingWhereNumber--;

    function FunctionWhereLetter(letter) {
      return letter >= whereLetter;
    }

  let eventIndexLetterGlobal = letters.findIndex(FunctionWhereLetter);

    // for (let y = -2; y < 1; y++) {
      // for (let i = -1; i < 2; i++) {
        // let kingWhereNumberLoop = KingWhereNumber - y;
        // if (document.getElementsByClassName(letters[eventIndexLetterGlobal - i] + kingWhereNumberLoop)[0] != undefined)
        // {
          // if (document.getElementsByClassName(letters[eventIndexLetterGlobal - i] + kingWhereNumberLoop).classList.contains("availablePlaces")) {
            // alert("GameOver!!");
            // console.log("GameOver");
          // }
          // else if (document.getElementsByClassName(square)[0].classList.classList.contains("availablePlaces")) {
            // alert("Check");
            // console.log("Check");
          // }
    //     }
    //   } 
    // }
  }
}


export function Promotion(event)
{
  if( eventIndexNumberGlobal == 0){
    if (event.target.classList.contains("whitepawn")) {
      event.target.src = "https://upload.wikimedia.org/wikipedia/commons/4/49/Chess_qlt60.png";
      event.target.classList.replace("pawn", "queen");
    }
    else if(eventIndexNumberGlobal == 7)
      if (event.target.classList.contains("blackpawn")) {
        event.target.src = "https://upload.wikimedia.org/wikipedia/commons/a/af/Chess_qdt60.png";
        event.target.classList.replace("pawn", "queen");
    }
  }
}


var getPawnMoves = function(square, color) {
  getMoveIndex(square);

  if (whereNumberGlobal != undefined) {
    let NewPawnNumber;
    let whereLetter = square.charAt(0);
    let PawnWhereNumber = square.charAt(1);
    
    function FunctionWhereLetter(letter) {
      return letter >= whereLetter;
    }
    
    let eventIndexLetterGlobal = letters.findIndex(FunctionWhereLetter);

    if (color == "white") {
      
      // !om det är i start
    if (PawnWhereNumber == 7) {
      for (let i = 0; i < 3; i++) {
        NewPawnNumber = PawnWhereNumber - i;
        document.getElementsByClassName(letters[eventIndexLetterGlobal] + NewPawnNumber)[0].classList.add("availablePlaces");
      }
      document.getElementsByClassName(square)[0].classList.remove("availablePlaces");
      
      PawnWhereNumber--;
      // !om fienden är diagonalt o du är i start
      if (document.getElementsByClassName(letters[eventIndexLetterGlobal + 1] + PawnWhereNumber)[0] != undefined) {
        if (document.getElementsByClassName(letters[eventIndexLetterGlobal + 1] + PawnWhereNumber)[0].children[0] != undefined) {
          if (document.getElementsByClassName(letters[eventIndexLetterGlobal + 1] + PawnWhereNumber)[0].children[0].classList.contains("black")) 
          {
            document.getElementsByClassName(letters[eventIndexLetterGlobal + 1] + PawnWhereNumber)[0].classList.add("availablePlaces");
          }
        }
      }
      
      if (document.getElementsByClassName(letters[eventIndexLetterGlobal + -1] + PawnWhereNumber)[0] != undefined) {
        if (document.getElementsByClassName(letters[eventIndexLetterGlobal + -1] + PawnWhereNumber)[0].children[0] != undefined) {
          if (document.getElementsByClassName(letters[eventIndexLetterGlobal + -1] + PawnWhereNumber)[0].children[0].classList.contains("black")) 
          {
            document.getElementsByClassName(letters[eventIndexLetterGlobal + -1] + PawnWhereNumber)[0].classList.add("availablePlaces");
          }
        }
      }
      
      // !två steg framför
      if (document.getElementsByClassName(letters[eventIndexLetterGlobal] + PawnWhereNumber)[0].children[0] != undefined) 
      {
        if (document.getElementsByClassName(letters[eventIndexLetterGlobal] + PawnWhereNumber)[0].children[0].classList.contains("white")) 
        {
          document.getElementsByClassName(letters[eventIndexLetterGlobal] + PawnWhereNumber)[0].classList.remove("availablePlaces");
          
          PawnWhereNumber--;
          document.getElementsByClassName(letters[eventIndexLetterGlobal] + PawnWhereNumber)[0].classList.remove("availablePlaces");
        }
        else return false;
      }
      
      // !ett steg framför
      PawnWhereNumber--;
      if (document.getElementsByClassName(letters[eventIndexLetterGlobal] + PawnWhereNumber)[0].children[0] != undefined) 
      {
            if (document.getElementsByClassName(letters[eventIndexLetterGlobal] + PawnWhereNumber)[0].children[0].classList.contains("white")) 
            {
              document.getElementsByClassName(letters[eventIndexLetterGlobal] + PawnWhereNumber)[0].classList.remove("availablePlaces");
            }
          else return false;
      }
    }

      else
        {
          PawnWhereNumber--;
        
        if (document.getElementsByClassName(letters[eventIndexLetterGlobal] + PawnWhereNumber)[0] != undefined) {
          document.getElementsByClassName(letters[eventIndexLetterGlobal] + PawnWhereNumber)[0].classList.add("availablePlaces");
            
        // !kollar om fienden är i sidan
          if (document.getElementsByClassName(letters[eventIndexLetterGlobal + -1] + PawnWhereNumber)[0] != undefined) {
            if (document.getElementsByClassName(letters[eventIndexLetterGlobal + -1] + PawnWhereNumber)[0].children[0] != undefined) {
              if (document.getElementsByClassName(letters[eventIndexLetterGlobal + -1] + PawnWhereNumber)[0].children[0].classList.contains("black")) 
              {
                document.getElementsByClassName(letters[eventIndexLetterGlobal + -1] + PawnWhereNumber)[0].classList.add("availablePlaces");
              }
            }
          }
              
          if (document.getElementsByClassName(letters[eventIndexLetterGlobal + 1] + PawnWhereNumber)[0] != undefined) {
            if (document.getElementsByClassName(letters[eventIndexLetterGlobal + 1] + PawnWhereNumber)[0].children[0] != undefined) {
              if (document.getElementsByClassName(letters[eventIndexLetterGlobal + 1] + PawnWhereNumber)[0].children[0].classList.contains("black")) {
                document.getElementsByClassName(letters[eventIndexLetterGlobal + 1] + PawnWhereNumber)[0].classList.add("availablePlaces");
              }
            }
          }

        if (document.getElementsByClassName(letters[eventIndexLetterGlobal] + PawnWhereNumber)[0] != undefined)
        {
          if (document.getElementsByClassName(letters[eventIndexLetterGlobal] + PawnWhereNumber)[0].children[0] != undefined)
            {
              if (document.getElementsByClassName(letters[eventIndexLetterGlobal] + PawnWhereNumber)[0].children[0].classList.contains("black"))
              {
                document.getElementsByClassName(letters[eventIndexLetterGlobal] + PawnWhereNumber)[0].classList.remove("availablePlaces");
              }
            }
          }
        }
      }
    }

    // !svart
      else {
        if (PawnWhereNumber == 2) {
          for (let i = -2; i < 0; i++) {
            NewPawnNumber = PawnWhereNumber - i;
            document.getElementsByClassName(letters[eventIndexLetterGlobal] + NewPawnNumber)[0].classList.add("availablePlaces");
          }
          
          PawnWhereNumber++;
        if (document.getElementsByClassName(letters[eventIndexLetterGlobal + -1] + PawnWhereNumber)[0] != undefined) {
          if (document.getElementsByClassName(letters[eventIndexLetterGlobal + -1] + PawnWhereNumber)[0].children[0] != undefined) {
            if (document.getElementsByClassName(letters[eventIndexLetterGlobal + -1] + PawnWhereNumber)[0].children[0].classList.contains("white")) 
            {
              document.getElementsByClassName(letters[eventIndexLetterGlobal + -1] + PawnWhereNumber)[0].classList.add("availablePlaces");
            }
          }
        }
          
        if (document.getElementsByClassName(letters[eventIndexLetterGlobal + 1] + PawnWhereNumber)[0] != undefined) {
          if (document.getElementsByClassName(letters[eventIndexLetterGlobal + 1] + PawnWhereNumber)[0].children[0] != undefined) {
            if (document.getElementsByClassName(letters[eventIndexLetterGlobal + 1] + PawnWhereNumber)[0].children[0].classList.contains("white")) {
              document.getElementsByClassName(letters[eventIndexLetterGlobal + 1] + PawnWhereNumber)[0].classList.add("availablePlaces");
            }
          }
        }

        if (document.getElementsByClassName(letters[eventIndexLetterGlobal] + PawnWhereNumber)[0] != undefined) 
          if (document.getElementsByClassName(letters[eventIndexLetterGlobal] + PawnWhereNumber)[0].children[0] != undefined) 
          {
            if (document.getElementsByClassName(letters[eventIndexLetterGlobal] + PawnWhereNumber)[0].children[0].classList.contains("white")) 
            {
              document.getElementsByClassName(letters[eventIndexLetterGlobal] + PawnWhereNumber)[0].classList.remove("availablePlaces");
              
              PawnWhereNumber++;
              document.getElementsByClassName(letters[eventIndexLetterGlobal] + PawnWhereNumber)[0].classList.remove("availablePlaces");
            }
            else return false;
          }
          
          PawnWhereNumber++;
        if (document.getElementsByClassName(letters[eventIndexLetterGlobal] + PawnWhereNumber)[0] != undefined) 
          if (document.getElementsByClassName(letters[eventIndexLetterGlobal] + PawnWhereNumber)[0].children[0] != undefined) 
          {
                if (document.getElementsByClassName(letters[eventIndexLetterGlobal] + PawnWhereNumber)[0].children[0].classList.contains("white")) 
                {
                  document.getElementsByClassName(letters[eventIndexLetterGlobal] + PawnWhereNumber)[0].classList.remove("availablePlaces");
                }
              else return false;
          }
        }

      else
      {
          PawnWhereNumber++;

          if (document.getElementsByClassName(letters[eventIndexLetterGlobal] + PawnWhereNumber)[0] != undefined) {
            document.getElementsByClassName(letters[eventIndexLetterGlobal] + PawnWhereNumber)[0].classList.add("availablePlaces");
            
            // !kollar om fienden är framför
          if (document.getElementsByClassName(letters[eventIndexLetterGlobal + -1] + PawnWhereNumber)[0] != undefined) {
            if (document.getElementsByClassName(letters[eventIndexLetterGlobal + -1] + PawnWhereNumber)[0].children[0] != undefined) {
              if (document.getElementsByClassName(letters[eventIndexLetterGlobal + -1] + PawnWhereNumber)[0].children[0].classList.contains("white")) 
              {
                document.getElementsByClassName(letters[eventIndexLetterGlobal + -1] + PawnWhereNumber)[0].classList.add("availablePlaces");
              }
            }
          }
            
          if (document.getElementsByClassName(letters[eventIndexLetterGlobal + 1] + PawnWhereNumber)[0] != undefined) {
            if (document.getElementsByClassName(letters[eventIndexLetterGlobal + 1] + PawnWhereNumber)[0].children[0] != undefined) {
              if (document.getElementsByClassName(letters[eventIndexLetterGlobal + 1] + PawnWhereNumber)[0].children[0].classList.contains("white")) {
                document.getElementsByClassName(letters[eventIndexLetterGlobal + 1] + PawnWhereNumber)[0].classList.add("availablePlaces");
              }
            }
          }
            
          if (document.getElementsByClassName(letters[eventIndexLetterGlobal] + PawnWhereNumber)[0] != undefined)
          {
            if (document.getElementsByClassName(letters[eventIndexLetterGlobal] + PawnWhereNumber)[0].children[0] != undefined)
            {
              if (document.getElementsByClassName(letters[eventIndexLetterGlobal] + PawnWhereNumber)[0].children[0].classList.contains("white"))
              {
                document.getElementsByClassName(letters[eventIndexLetterGlobal] + PawnWhereNumber)[0].classList.remove("availablePlaces");
              }
            }
          }
        }
      }
    }
    document.getElementsByClassName(square)[0].classList.remove("availablePlaces");
  }
}

var getBishopMoves = function(square, color) {
  getMoveIndex(square);
      if (whereNumberGlobal != undefined) {
      let whereLetter = square.charAt(0);
      let KingWhereNumber = square.charAt(1);

      function FunctionWhereLetter(letter) {
        return letter >= whereLetter;
      }

    let eventIndexLetterGlobal = letters.findIndex(FunctionWhereLetter);

      for (let y = -10; y < 10; y++) {
          let kingWhereNumberLoop = KingWhereNumber - y;
          // !höger
          if (document.getElementsByClassName(letters[eventIndexLetterGlobal + y] + kingWhereNumberLoop)[0] != undefined)
          {
            document.getElementsByClassName(letters[eventIndexLetterGlobal + y] + kingWhereNumberLoop)[0].classList.add("availablePlaces");
          }
          
          // !Vänster
          if (document.getElementsByClassName(letters[eventIndexLetterGlobal - y] + kingWhereNumberLoop)[0] != undefined)
          {
            document.getElementsByClassName(letters[eventIndexLetterGlobal - y] + kingWhereNumberLoop)[0].classList.add("availablePlaces");
          }
      }
        
      document.getElementsByClassName(square)[0].classList.remove("availablePlaces");
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

    if (color === "white") {
        for (let i = 0; i < 8; i++) {
          whereLetterGlobal = square.charAt(0);
          document.getElementsByClassName(whereLetterGlobal + NewWhereNumberGlobal)[0].classList.add("availablePlaces");
          NewWhereNumberGlobal--;
      }
    }

    else if((color === "black"))
    {
        for (let i = 0; i < 8; i++) 
        {
          whereLetterGlobal = square.charAt(0);
          document.getElementsByClassName(whereLetterGlobal + NewWhereNumberGlobal)[0].classList.add("availablePlaces");
          NewWhereNumberGlobal++;
        }
    }
        
      for (let i = 0; i < 8; i++) {
        whereLetterGlobal = letters[i];
        NewWhereNumberGlobal = square.charAt(1);
        document.getElementsByClassName(whereLetterGlobal + NewWhereNumberGlobal)[0].classList.add("availablePlaces");
      }
    document.getElementsByClassName(square)[0].classList.remove("availablePlaces");
  } 
}

var Castle = function(square, color, type) {
getMoveIndex(square);

  if (whereNumberGlobal != undefined) {
    // !om kungen e i ordinarie plats
    if (type == "king" && document.getElementsByClassName("E8")[0].children[0].classList.contains("king") || type == "king" && document.getElementsByClassName("E8")[0].children[0].classList.contains("king")) {
      
      // !och om rook är i hörnen
      if(document.getElementsByClassName("A8")[0].children[0].classList.contains("rook") || document.getElementsByClassName("H8")[0].children[0].classList.contains("rook")){

        // if (type == "rook" && document.getElementsByClassName("A1")[0].children[0].classList.contains("rook") || type == "rook" && document.getElementsByClassName("H1")[0].children[0].classList.contains("rook"))
        
        console.log(document.getElementsByClassName("E8")[0].children[0]);
        // !kollar om det finns några mellan de två
        let KingWhereNumber = square.charAt(1);

          for (let y = -2; y < 1; y++) {
            if (document.getElementsByClassName(letters[eventIndexLetterGlobal - y] + KingWhereNumber)[0] != undefined)
            {
              document.getElementsByClassName(letters[eventIndexLetterGlobal - y] + KingWhereNumber)[0].classList.add("availablePlaces");
            }
          } 
        }
        
      }
    }
  }


var getKingMoves = function(square, color) {
    getMoveIndex(square);

    if (whereNumberGlobal != undefined) {
      let whereLetter = square.charAt(0);
      let KingWhereNumber = square.charAt(1);
      KingWhereNumber--;

      function FunctionWhereLetter(letter) {
        return letter >= whereLetter;
      }

    let eventIndexLetterGlobal = letters.findIndex(FunctionWhereLetter);

      for (let y = -2; y < 1; y++) {
        for (let i = -1; i < 2; i++) {
          let kingWhereNumberLoop = KingWhereNumber - y;
          if (document.getElementsByClassName(letters[eventIndexLetterGlobal - i] + kingWhereNumberLoop)[0] != undefined)
          {
            document.getElementsByClassName(letters[eventIndexLetterGlobal - i] + kingWhereNumberLoop)[0].classList.add("availablePlaces");
          }
        } 
      }
      document.getElementsByClassName(square)[0].classList.remove("availablePlaces");
    }
  }
  
  var getKnightMoves = function(square, color) {
    getMoveIndex(square);

    if (whereNumberGlobal != undefined) {
      let whereLetter = square.charAt(0);
      let KingWhereNumber = square.charAt(1);
      let KingWhereNumberDown = KingWhereNumber;
      KingWhereNumberDown++;
      KingWhereNumber--;

      function FunctionWhereLetter(letter) {
        return letter >= whereLetter;
      }

    let eventIndexLetterGlobal = letters.findIndex(FunctionWhereLetter);

      for (let y = -2; y < 2; y++) 
      {
        let kingWhereNumberLoop = KingWhereNumber - y;
        let kingWhereNumberLoopDown = KingWhereNumberDown + y;
      
        // !yeahhhhhh
      if (document.getElementsByClassName(letters[eventIndexLetterGlobal + y] + kingWhereNumberLoop)[0] != undefined)
        {
          document.getElementsByClassName(letters[eventIndexLetterGlobal + y] + kingWhereNumberLoop)[0].classList.add("availablePlaces");
        }
              
      if (document.getElementsByClassName(letters[eventIndexLetterGlobal - y] + kingWhereNumberLoop)[0] != undefined)
        {
          document.getElementsByClassName(letters[eventIndexLetterGlobal - y] + kingWhereNumberLoop)[0].classList.add("availablePlaces");
        }
        
      if (document.getElementsByClassName(letters[eventIndexLetterGlobal + y] + kingWhereNumberLoopDown)[0] != undefined)
        {
          document.getElementsByClassName(letters[eventIndexLetterGlobal + y] + kingWhereNumberLoopDown)[0].classList.add("availablePlaces");
        }
              
      if (document.getElementsByClassName(letters[eventIndexLetterGlobal - y] + kingWhereNumberLoopDown)[0] != undefined)
        {
          document.getElementsByClassName(letters[eventIndexLetterGlobal - y] + kingWhereNumberLoopDown)[0].classList.add("availablePlaces");
        }
      }

      for (let y = -2; y < 1; y++) {
        for (let i = -1; i < 2; i++) {
          let kingWhereNumberLoop = KingWhereNumber - y;
          if (document.getElementsByClassName(letters[eventIndexLetterGlobal - i] + kingWhereNumberLoop)[0] != undefined)
            {
              document.getElementsByClassName(letters[eventIndexLetterGlobal - i] + kingWhereNumberLoop)[0].classList.remove("availablePlaces");
            }
          }
        }
      document.getElementsByClassName(square)[0].classList.remove("availablePlaces");
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
        // !Snett
          let whereLetter = square.charAt(0);
          let KingWhereNumber = square.charAt(1);
    
          function FunctionWhereLetter(letter) {
            return letter >= whereLetter;
          }
    
        let eventIndexLetterGlobal = letters.findIndex(FunctionWhereLetter);
    
        for (let y = -10; y < 10; y++) {
            let kingWhereNumberLoop = KingWhereNumber - y;
            // !höger
            if (document.getElementsByClassName(letters[eventIndexLetterGlobal + y] + kingWhereNumberLoop)[0] != undefined)
            {
              document.getElementsByClassName(letters[eventIndexLetterGlobal + y] + kingWhereNumberLoop)[0].classList.add("availablePlaces");
            }
            
            // !Vänster
            if (document.getElementsByClassName(letters[eventIndexLetterGlobal - y] + kingWhereNumberLoop)[0] != undefined)
            {
              document.getElementsByClassName(letters[eventIndexLetterGlobal - y] + kingWhereNumberLoop)[0].classList.add("availablePlaces");
            }
        }
        // !Ta bort availablePlaces där den är
        document.getElementsByClassName(square)[0].classList.remove("availablePlaces");
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

          const whereLetter = square.charAt(0);
          whereLetterGlobal = whereLetter
      
          function FunctionWhereLetter(letter) {
            return letter >= whereLetter;
          }
        }

          // !Snett
          let whereLetter = square.charAt(0);
          let KingWhereNumber = square.charAt(1);
    
          function FunctionWhereLetter(letter) {
            return letter >= whereLetter;
          }
    
        let eventIndexLetterGlobal = letters.findIndex(FunctionWhereLetter);
    
          for (let y = -10; y < 10; y++) {
              let kingWhereNumberLoop = KingWhereNumber - y;
              // !höger
              if (document.getElementsByClassName(letters[eventIndexLetterGlobal + y] + kingWhereNumberLoop)[0] != undefined)
              {
                document.getElementsByClassName(letters[eventIndexLetterGlobal + y] + kingWhereNumberLoop)[0].classList.add("availablePlaces");
              }
              
              // !Vänster
              if (document.getElementsByClassName(letters[eventIndexLetterGlobal - y] + kingWhereNumberLoop)[0] != undefined)
              {
                document.getElementsByClassName(letters[eventIndexLetterGlobal - y] + kingWhereNumberLoop)[0].classList.add("availablePlaces");
              }
          }
          // !Ta bort availablePlaces där den är
          document.getElementsByClassName(square)[0].classList.remove("availablePlaces");
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