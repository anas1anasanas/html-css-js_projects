const cells=document.querySelectorAll(".cell")
const statusText=document.getElementById("status")
const scoreX=document.getElementById("scoreX");
const scoreO=document.getElementById("scoreO");
let currentPlayer="X";
let gameBoard=["","","","","","","","",""]; 
let scores={X:0,O:0};
let isGameActive=true;
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
cells.forEach(cell=>cell.addEventListener("click",handleClick));

function handleClick(e){
  const index= e.target.getAttribute('data-index');
  if (gameBoard[index] !== "" || !isGameActive) return;
  gameBoard[index]=currentPlayer;
  e.target.textContent=currentPlayer;
  e.target.classList.add(currentPlayer.toLowerCase());
  e.target.classList.add("pop");
  checkWinner();
}

function checkWinner(){
  let win=false;
  for (let combinations of winConditions) {
    const [a, b, c] = combinations;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      win = true;
      cells[a].classList.add('winning');
      cells[b].classList.add('winning');
      cells[c].classList.add('winning');

      isGameActive = false;
      statusText.textContent = `Player ${currentPlayer} Wins! 🎉`;
      scores[currentPlayer]++;
      updateScore();
      return;
    }
  }
 /*  winConditions.forEach(combinations=>{
    let[a,b,c]=combinations;
    if(gameBoard[a]&& gameBoard[a]===gameBoard[b]&& gameBoard[b]===gameBoard[c]){
      win=true;
      cells[a].classList.add("winning");
      cells[b].classList.add("winning");
      cells[c].classList.add("winning");
     
    }
  }); */
  /* if(won ){
    statusText.textContent=`Player ${currentPlayer} Wins! 🎉`;
    scores[currentPlayer]++;
    updateScore(); 
    isGameActive=false;
    return;
  } */
  if(!win && !gameBoard.includes("")){
    statusText.textContent="it's a Draw!";
    isGameActive=false;
    return;
  }
  
  currentPlayer = currentPlayer === "X" ? "O" : "X";

  statusText.textContent=`Player ${currentPlayer}'s turn.`;
}
function updateScore(){
  scoreX.textContent=scores.X;
  scoreO.textContent=scores.O;
}

function restart(){
  gameBoard=["","","","","","","","",""]; 
  isGameActive=true;
  currentPlayer="X";
  statusText.textContent=`Player ${currentPlayer}'s turn.`;
  cells.forEach(cell=>{
    cell.textContent="";
    cell.classList.remove("x","o","winning","pop");
  });

}
function quitGame(){
  isGameActive=false;
  let winner = currentPlayer === "X" ? "O" : "X";
  statusText.textContent=`Player ${winner} Wins by Quit! 🏳️`;
  scores[winner]++;
  updateScore();
  cells.forEach(cell => {
    if (!cell.textContent) {
      cell.classList.add('winning');
    }
  });
}
