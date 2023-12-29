const title = document.querySelector(".board__title");
// querySelectorAll gives us all the squares in nodes
const allSquares = document.querySelectorAll(".board__square");

let currentPlayer = "X";
let gameOver = false;
let board = new Array(9);

allSquares.forEach((square, i) => {
  // same thing as adding onclick to all of the buttons in the html
  square.addEventListener("click", () => {
    // if there's already a value on the square being clicked OR the game is over, break the function
    if (square.innerHTML || gameOver) {
      return;
    }
    square.innerHTML = currentPlayer;
    board[i] = currentPlayer;

    if (checkWin()) {
      title.innerHTML = `${currentPlayer} Won The Game!`;
      return (gameOver = true);
    }

    if (checkTie()) {
      title.innerHTML = "It's A Draw!";
      return (gameOver = true);
    }

    switchPlayers();
    title.innerHTML = `${currentPlayer}'s Turn`;
  });
});

function switchPlayers() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkTie() {
  for (i = 0; i < board.length; ++i) {
    // if the board element at this index does not exist, the game is not over and it's not a tie
    if (!board[i]) {
      return false;
    }
  }
  // if we loop over every single element and the board is full then it's a draw
  return true;
}

function checkWin() {
  const winningIndices = [
    // Horizontal Wins
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Vertical Wins
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagnol Wins
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (i = 0; i < winningIndices.length; ++i) {
    const matchingIndices = winningIndices[i];

    let symbol1 = board[matchingIndices[0]];
    let symbol2 = board[matchingIndices[1]];
    let symbol3 = board[matchingIndices[2]];
    // if any of the symbols are empty, move on to the next iteration of the for loop. Prevents a false win from occuring
    if (!symbol1 || !symbol2 || !symbol3) {
      continue;
    }

    if (symbol1 === symbol2 && symbol2 == symbol3) {
      return true;
    }
  }
}

function restartGame() {
  gameOver = false;
  // Reset board
  board = new Array(9);
  allSquares.forEach((square) => {
    // Reset squares
    square.innerHTML = "";
    // Reset title
    title.innerHTML = `${currentPlayer}'s Turn`;
  });
}
