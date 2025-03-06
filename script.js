// this module is responsible for rendering gameboard
const gameboard = (() => {
  let gameBoard = ['','','','','','','','',''];

  const render = () => {
    let gameboardHTML = '';
    gameBoard.forEach((square, index) => {
      gameboardHTML += `<div class="square" id="square-${index}">${square}</div>`;
      document.querySelector('.gameboard').innerHTML = gameboardHTML;
    })
    const squares = document.querySelectorAll('.square').forEach((square) => {
      square.addEventListener('click', game.handleClick)
    })
  }
  const update = (index, marker) => {
    gameBoard[index] = marker;
    gameboard.render();
  }
  const getGameboard = () => gameBoard;

  
return {
  render,
  update,
  getGameboard,
  
}

})();
// this module is responsible for controlling game and logic
const game = (() => {
  let gameOver;
  let currentPlayerIndex;
  const players = [{
    name: '',
    marker: 'X'
  }, { name: '',
       marker: 'O'
  }];
  const start = () => {
    players[0].name = document.querySelector('.player1-name').value;
    players[1].name = document.querySelector('.player2-name').value;
    
    gameOver = false;
    currentPlayerIndex = 0;
  gameboard.render();
  const squares = document.querySelectorAll('.square').forEach((square) => {
    square.addEventListener('click', handleClick)
  })
}
const handleClick = (event) => {
  if (gameOver) return;
  const targ = parseInt(event.target.id.split('-')[1]);
  if ( gameboard.getGameboard()[targ] !== '') {
    return;
  } 
  
  gameboard.update(targ, players[currentPlayerIndex].marker)
 
   currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0
   if ( checkForWin(gameboard.getGameboard())) {
    
    displayMessage(players[currentPlayerIndex].name);
    return;
  } else if (game.checkForTie()) {
    displayMessage('Tie')
    return;

  }
}
const restart = () => {
  displayMessage();
  gameOver = false;
  gameboard.getGameboard().forEach((square, index, arr) => {
    arr[index] = '';
  })
    gameboard.render();
  }
  function checkForWin(arr) {
    
    const winCombos = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]
    for (let i = 0; i < winCombos.length; i++) {
      const [a, b, c] = winCombos[i];
      if (arr[a] && arr[a] === arr[b] && arr[a] === arr[c]) {
        [a, b, c].forEach((index ) => {
          document.querySelectorAll('.square')[index].style.backgroundColor = "blue"
        })
        gameOver = true;
        return true;
      }
    }
    return false;
  }
  const checkForTie = () => {
    for (let i = 0; i < gameboard.getGameboard().length; i++) {
      if (gameboard.getGameboard()[i] === '') return false;
    }
    gameOver = true;
     return true;
    }
    const displayMessage = (value='') => {
      const message = document.querySelector('.message')
      if (value === players[currentPlayerIndex].name) {
      message.innerHTML = `${value} won the game!`
      } else if (value === 'Tie') {
        message.innerHTML = "It's Tie!";
      } else {
        message.innerHTML = ''
      }
    }
   

return {
  start,
  handleClick,
  restart,
  checkForWin,
  checkForTie,
  gameOver,
 
}

})();


const restartBtn = document.querySelector('.reset-game');
restartBtn.addEventListener('click', game.restart)

const startBtn = document.querySelector('.start-game');
 startBtn.addEventListener('click', game.start)









