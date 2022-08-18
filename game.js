let grid = [
  [' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' '],
];
const GRID_HEIGHT = grid.length;
const COLUMN_FULL = -1;
let currentToken = 'x';

dropToken = (col) => {
  row = findHighestEmptyCell(col);

  if (row != COLUMN_FULL) {
    setCell(row, col, currentPlayer());
    showToken(row, col);

    if (playerHasWon()) {
      showWinner();
    }

    changePlayer();
  }
};

playerHasWon = () => {
  if (checkDiagonalsForWinner()) {
    return true;
  }

  for (let i = 0; i < GRID_HEIGHT; i++) {
    if (checkRowForWinner(i) || checkColForWinner(i)) {
      return true;
    }
  }
  return false;
};

checkRowForWinner = (rowIndex) => {
  const tokenVal = getCell(rowIndex, 0);

  if (tokenVal === ' ') {
    return false;
  }

  for (let col = 1; col <= 3; col++) {
    if (getCell(rowIndex, col) !== tokenVal) {
      return false;
    }
  }

  return true;
};

checkColForWinner = (colIndex) => {
  const tokenVal = getCell(0, colIndex);

  if (tokenVal === ' ') {
    return false;
  }

  for (let row = 1; row <= 3; row++) {
    if (getCell(row, colIndex) !== tokenVal) {
      return false;
    }
  }

  return true;
};

checkDiagonalsForWinner = () => {
  if (checkFirstDiagonal() || checkSecondDiagonal()) {
    return true;
  }

  return false;
};

checkFirstDiagonal = () => {
  const tokenVal = getCell(0, 3);

  if (tokenVal === ' ') {
    return false;
  }

  for (let i = 1; i < GRID_HEIGHT; i++) {
    if (getCell(i, GRID_HEIGHT - 1 - i) !== tokenVal) {
      return false;
    }
  }

  return true;
};

checkSecondDiagonal = () => {
  const tokenVal = getCell(0, 0);

  if (tokenVal === ' ') {
    return false;
  }

  for (let i = 1; i < GRID_HEIGHT; i++) {
    if (getCell(i, i) !== tokenVal) {
      return false;
    }
  }

  return true;
};

findHighestEmptyCell = (col) => {
  for (let row = GRID_HEIGHT - 1; row >= 0; row--) {
    if (getCell(row, col) === ' ') {
      return row;
    }
  }

  return COLUMN_FULL;
};

getCell = (row, col) => {
  return grid[row][col];
};

setCell = (row, col, token) => {
  grid[row][col] = token;
};

showToken = (row, col) => {
  let cellId = 'cell' + row + col;
  let cell = document.getElementById(cellId);
  cell.innerHTML = getCell(row, col);
};

showWinner = () => {
  let uiWinner = document.getElementById('winner');
  uiWinner.innerHTML = currentToken + ' wins!';
  let coolMessage = document.getElementById('cool-message');
  coolMessage.style.display = 'block';
};

currentPlayer = () => {
  return currentToken;
};

changePlayer = () => {
  if (currentToken === 'x') {
    currentToken = 'o';
  } else {
    currentToken = 'x';
  }
};
