document.addEventListener('DOMContentLoaded', () => {
  const cells = document.querySelectorAll('.box');
  const restartButton = document.getElementById('restart');
  let currentPlayer = 'X';
  let board = ['', '', '', '', '', '', '', '', ''];
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  function handleClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');
    if (board[index] !== '') {
        return;
    }
    board[index] = currentPlayer;
    cell.classList.add(currentPlayer === 'X' ? 'boxHuman' : 'boxComputer');
    if (checkWinner()) {
        setTimeout(() => alert(`Player ${currentPlayer} wins!`), 100);
        setTimeout(restartGame, 2000);
    } else if (board.every(cell => cell !== '')) {
        setTimeout(() => alert('Draw!'), 100);
        setTimeout(restartGame, 2000);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (currentPlayer === 'O') {
            setTimeout(computerMove, 500); 
        }
    }
}

  function handleMouseOver(event) {
    const cell = event.target;
    if (cell.textContent === '') {
      cell.style.backgroundImage = `url('img/${currentPlayer === 'X' ? 'x' : 'o'}.svg')`;
    }
  }

  function handleMouseOut(event) {
    const cell = event.target;
    cell.style.backgroundImage = '';
  }

  function computerMove() {
    let emptyCells = [];
    board.forEach((cell, index) => {
      if (cell === '') {
        emptyCells.push(index);
      }
    });
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomIndex] = 'O';
    cells[randomIndex].classList.add('boxComputer');
    if (checkWinner()) {
      setTimeout(() => alert('Player O wins!'), 100);
      setTimeout(restartGame, 2000);
    } else if (board.every(cell => cell !== '')) {
      setTimeout(() => alert('Draw!'), 100);
      setTimeout(restartGame, 2000);
    } else {
      currentPlayer = 'X';
    }
  }

  function checkWinner() {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }

  function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
      cell.classList.remove('boxHuman', 'boxComputer');
      cell.style.backgroundImage = '';
    });
    currentPlayer = 'X';
  }

  cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
    cell.addEventListener('mouseover', handleMouseOver);
    cell.addEventListener('mouseout', handleMouseOut);
  });
  restartButton.addEventListener('click', restartGame);
});