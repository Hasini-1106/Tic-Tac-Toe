// Select all required elements
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restartBtn");

// Game variables
let currentPlayer = "X";
let gameActive = true;

// This array keeps track of the board state
let boardState = ["", "", "", "", "", "", "", "", ""];

// All possible winning combinations
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

// Add click event to each cell
cells.forEach(cell => {
  cell.addEventListener("click", handleCellClick);
});

// Restart button event
restartButton.addEventListener("click", restartGame);

// Handles what happens when a cell is clicked
function handleCellClick() {
  const index = this.dataset.index;

  // Ignore click if cell is filled or game is over
  if (boardState[index] !== "" || !gameActive) return;

  // Update board and UI
  boardState[index] = currentPlayer;
  this.textContent = currentPlayer;

  checkGameResult();
}

// Checks for win or draw after every move
function checkGameResult() {
  let hasWon = false;

  for (let combo of winningCombinations) {
    const [a, b, c] = combo;

    if (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    ) {
      highlightWinningCells(combo);
      hasWon = true;
      break;
    }
  }

  if (hasWon) {
    statusText.textContent = `🎉 Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  // Check for draw
  if (!boardState.includes("")) {
    statusText.textContent = "It's a draw 😄";
    gameActive = false;
    return;
  }

  // Switch player
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}, your move 👇`;
}

// Highlights the winning cells
function highlightWinningCells(combo) {
  combo.forEach(index => {
    cells[index].classList.add("winner");
  });
}

// Resets the game
function restartGame() {
  currentPlayer = "X";
  gameActive = true;
  boardState = ["", "", "", "", "", "", "", "", ""];

  statusText.textContent = "Player X, your move 👇";

  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("winner");
  });
}
