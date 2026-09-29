// Tic-tac-toe, ported from the old React frontend. Mounts into <div id="tictactoe">.
(() => {
  const root = document.getElementById('tictactoe');
  if (!root) return;

  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];

  const winner = squares => {
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { player: squares[a], line: [a, b, c] };
      }
    }
    return null;
  };

  const board = document.createElement('div');
  board.className = 'board';
  const status = document.createElement('p');
  status.className = 'status';
  const reset = document.createElement('button');
  reset.className = 'reset';
  reset.textContent = 'New game';

  const cells = Array.from({ length: 9 }, (_, i) => {
    const cell = document.createElement('button');
    cell.className = 'square';
    cell.setAttribute('aria-label', 'Square ' + (i + 1));
    cell.addEventListener('click', () => play(i));
    board.append(cell);
    return cell;
  });

  let squares, xIsNext;

  const render = () => {
    const won = winner(squares);
    cells.forEach((cell, i) => {
      cell.textContent = squares[i] || '';
      cell.disabled = Boolean(won || squares[i]);
      cell.classList.toggle('win', Boolean(won && won.line.includes(i)));
    });
    if (won) status.textContent = 'Winner: ' + won.player;
    else if (squares.every(Boolean)) status.textContent = 'Draw';
    else status.textContent = 'Next player: ' + (xIsNext ? 'X' : 'O');
  };

  const play = i => {
    if (winner(squares) || squares[i]) return;
    squares[i] = xIsNext ? 'X' : 'O';
    xIsNext = !xIsNext;
    render();
  };

  const start = () => {
    squares = Array(9).fill(null);
    xIsNext = true;
    render();
  };

  reset.addEventListener('click', start);
  root.append(board, status, reset);
  start();
})();
