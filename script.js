const board = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart-btn');
const playVsComputerBtn = document.getElementById('play-vs-computer');
const playVsPlayerBtn = document.getElementById('play-vs-player');

let currentPlayer = 'X';
let gameActive = true;
let isVsComputer = false;
let gameState = ['', '', '', '', '', '', '', '', '']; // Board state

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Function to check win condition
function checkWinner() {
    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            statusText.textContent = `${currentPlayer} wins!`;
            gameActive = false;
            return true;
        }
    }
    if (!gameState.includes('')) {
        statusText.textContent = "It's a draw!";
        gameActive = false;
        return true;
    }
    return false;
}

// Function to handle click event on cells
function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');
    if (gameState[index] === '' && gameActive) {
        gameState[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        if (checkWinner()) return;
        switchPlayer();
        if (isVsComputer && currentPlayer === 'O') {
            computerMove();
        }
    }
}

// Function to switch player
function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `It's ${currentPlayer}'s turn`;
}

// Function for the computer to make a move
function computerMove() {
    setTimeout(() => {
        let availableCells = [];
        for (let i = 0; i < gameState.length; i++) {
            if (gameState[i] === '') {
                availableCells.push(i);
            }
        }
        const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        gameState[randomIndex] = 'O';
        board[randomIndex].textContent = 'O';
        if (!checkWinner()) switchPlayer();
    }, 500); // Delay for more realistic feel
}

// Function to restart the game
function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusText.textContent = `It's ${currentPlayer}'s turn`;
    board.forEach(cell => (cell.textContent = ''));
}

// Add event listeners for the cells
board.forEach(cell => cell.addEventListener('click', handleCellClick));

// Event listener for restart button
restartBtn.addEventListener('click', restartGame);

// Event listener for playing against computer
playVsComputerBtn.addEventListener('click', () => {
    restartGame();
    isVsComputer = true;
    statusText.textContent = 'You are playing against the Computer. It\'s X\'s turn.';
});

// Event listener for playing against player
playVsPlayerBtn.addEventListener('click', () => {
    restartGame();
    isVsComputer = false;
    statusText.textContent = 'You are playing against another player. It\'s X\'s turn.';
});
