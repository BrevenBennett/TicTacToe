const title = document.querySelector(".board__title");
// querySelectorAll gives us all the squares in nodes
const allSquares = document.querySelectorAll(".board__square");

let currentPlayer = "X";
let gameOver = false;
let board = new Array(9);

// Could use a for loop here but this is cleaner
allSquares.forEach((square, i) => {
  // same thing as adding onclick to all of the buttons in the html
  square.addEventListener("click", () => {
    // if there's already a value on the square being clicked OR the game is over, break the function
    if (square.innerHTML || gameOver) {
      return;
    }
    
    // change the square to an X or an O
    square.innerHTML = currentPlayer;
    // add the symbol onto the board array
    board[i] = currentPlayer;

    // if someone won, change the title to the winner and set gameover to true
    if (checkWin()) {
      title.innerHTML = `${currentPlayer} Won The Game!`;
      return (gameOver = true);
    }

    // if there's a tie, change title and set gameover to true
    if (checkTie()) {
      title.innerHTML = "It's A Draw!";
      return (gameOver = true);
    }

    // X --> O or O --> X
    switchPlayers();
    title.innerHTML = `${currentPlayer}'s Turn`;
  });
});

function switchPlayers() {
  // ternary operator sets the current player to the opposite of what it is
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

    // Mapping the board at the indices in each array above to the symbol
    let symbol1 = board[matchingIndices[0]]; // checks these indices 0, 3, 6, 0, 1, 2, 0, 2
    let symbol2 = board[matchingIndices[1]]; // checks these indices 1, 4, 7, 3, 4, 5, 4, 4
    let symbol3 = board[matchingIndices[2]]; // checks these indices 2, 5, 8, 6, 7, 8, 8, 6

    // if any of the symbols are empty, move on to the next iteration of the for loop. Prevents a false win from occuring
    if (!symbol1 || !symbol2 || !symbol3) {
      continue;
    }

    // If all the symbols match at the right indices, then it's a win
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
