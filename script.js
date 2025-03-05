
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
  const getGameboard = () => {
    return gameBoard;
  }

return {
  render,
  update,
  getGameboard
}

})();

const game = (() => {
  let currentPlayerIndex;
  const players = [{
    name: document.querySelector('.player1-name').value,
    marker: 'X'
  }, { name: document.querySelector('.player2-name').value,
       marker: 'O'
  }]



  const start = () => {
    currentPlayerIndex = 0;
  gameboard.render();
  const squares = document.querySelectorAll('.square').forEach((square) => {
    square.addEventListener('click', handleClick)
  })
}
const handleClick = (event) => {
  const targ = parseInt(event.target.id.split('-')[1]);
  if ( gameboard.getGameboard()[targ] !== '') {
    return;
  } 
  gameboard.update(targ, players[currentPlayerIndex].marker)
  
   currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0
  
}

return {
  start,
  handleClick
 
}

})();












const startBtn = document.querySelector('.start-game');
 startBtn.addEventListener('click', game.start)









