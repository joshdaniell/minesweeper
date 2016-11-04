document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
// var board = {
//   cells: [
//     {row:0, col:0, isMine:false, hidden:true},
//     {row:0, col:1, isMine:false, hidden:true},
//     {row:0, col:2, isMine:true, hidden:true},
//     {row:1, col:0, isMine:true, hidden:true},
//     {row:1, col:1, isMine:false, hidden:true},
//     {row:1, col:2, isMine:false, hidden:true},
//     {row:2, col:0, isMine:false, hidden:true},
//     {row:2, col:1, isMine:true, hidden:true},
//     {row:2, col:2, isMine:false, hidden:true},
//   ]
// }

var board = {};
board.cells = createBoard(4);

function createBoard (size) {
  var cells = new Array();
    for (var r = 0; r < size; r ++) {
      for (var c = 0; c < size; c ++) {
        cells.push(new newCell(r, c));
      }
    } return cells;
}

function newCell (row, col) {
  this.row = row;
  this.col = col;
  this.isMine = minegenerator();
  this.isMarked = false;
  this.hidden = true;
}

function mineGenerator () {
  var minGen = Math.random()+0.3;
  if (mineGen < 0.5) {
    return true;
  } else {
    return false;
  }
}

function resetBoard () {
  location.reload ();
  board.cells = createBoard();
}

function startGame () {
  // Don't remove this function call: it makes the game work!
  for (var i = 0; i < board.cells.length; i ++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
    document.addEventListener("click", checkForWin);
    document.addEventListener("contextmenu", checkForWin);
  }

  lib.initBoard()
}



// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  for (var i = 0; i < board.cells.length; i ++) {
    if ((board.cells[i].isMine && board.cells[i].isMarked) || (!board.cells[i].isMine && !board.cells[i].hidden)) {
  } else {
    return;
  }
}
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  lib.displayMessage('You win!');
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`:
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
var count = 0;
  var surroundingCells = lib.getSurroundingCells(cell.row, cell.col)
  for (var i = 0; i < surroundingCells.length; i ++) {
    if (surroundingCells[i].isMine) {
      count ++;
    }
  }
  return count;
}
