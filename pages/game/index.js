const rock = document.querySelector('.rock');
const papper = document.querySelector('.papper');
const scissors = document.querySelector('.scissors');
const roundCounter = document.querySelector('h2');
const roundResult = document.querySelector('.round-result');
const playerScore = document.querySelector('.player-score');
const iaScore = document.querySelector('.ia-score');
const nextRound = document.querySelector('.next-round');
const iaMoveImg = document.querySelector('.ia-move-img');
const userMoveImg = document.querySelector('.user-move-img');
const finalResult = document.querySelector('.final-round');
const round = document.querySelector('.round');
const final = document.querySelector('.final');
const homePage = document.querySelector('.choose-move');
const playAgain = document.querySelector('.play-again');

let roundActive = 1;
let userSelectMove;
let iaMove;
let userWin = 0;
let iaWin = 0;

roundCounter.textContent = `RONDA ${roundActive}`;
final.style.display = 'none';
round.style.display = 'none';


/* EVENT LISTENER */
rock.addEventListener('click', handleRound);
papper.addEventListener('click', handleRound);
scissors.addEventListener('click', handleRound);
nextRound.addEventListener('click', handleNextRound);
playAgain.addEventListener('click', handlePlayAgain);


/* HANDLERS */
function handleRound (event) {
  const iaMove = iaMoveGenerator();
  const userMove = handleClickMove(event);

  round.style.display = 'initial';
  homePage.style.display = 'none';
  userMoveImg.style.width = '125px';
  userMoveImg.setAttribute('src', `../../assets/${userMove}.png`);
  userMoveImg.setAttribute('alt', `${userMove}`);
  
  currentRoundResult(iaMove, userMove);
  game(); 
};

function handleClickMove (event) {
  event.preventDefault();
  
  return event.target.className;
}; 

function handleNextRound () {
  final.style.display = 'none';
  homePage.style.display = 'initial';
  round.style.display = 'none';
};

function handlePlayAgain () {
  homePage.style.display = 'initial';
  round.style.display = 'none';
  final.style.display = 'none';
  localStorageMatch();
  resetCounters();
};


/* FUNCTIONS */
function iaMoveGenerator () {
  const moves = ['rock', 'papper', 'scissors'];

  let iaNum = Math.floor((Math.random() * (2 - 0 + 1)));
  for(let i = 0; i <= moves.length; i++) {
    if(iaNum === i) {
      iaMove = moves[i];
    }
  }

  iaMoveImg.style.width = '125px';
  iaMoveImg.setAttribute('src', `../../assets/${iaMove}.png`);
  iaMoveImg.setAttribute('alt', `${iaMove}`);

  return iaMove;
};

function currentRoundResult (iaMove, userMove) {
  if(userMove === iaMove) {
    roundResult.textContent = 'EMPATE';
  } else if (iaMove === 'rock' && userMove === 'scissors') {
    roundResult.textContent = 'GANA LA IA';
    iaWin++;
    iaScore.textContent = `${iaWin}`;
  } else if (iaMove === 'papper' && userMove === 'rock') {
    roundResult.textContent = 'GANA LA IA';
    iaWin++;
    iaScore.textContent = `${iaWin}`;
  } else if (iaMove === 'scissors' && userMove === 'papper') {
    roundResult.textContent = 'GANA LA IA';
    iaWin++;
    iaScore.textContent = `${iaWin}`;
  } else {
    roundResult.textContent = 'GANASTE';
    userWin++;
    playerScore.textContent = `${userWin}`;
  }

  roundActive++;
  roundCounter.textContent = `RONDA ${roundActive}`;
};

function game () {
  if (iaWin === 3 || userWin === 3) {
    if (iaWin > userWin) {
      finalResult.textContent = 'HAS PERDIDO!';
    } else {
      finalResult.textContent = 'HAS GANADO!';
    };

    final.style.display = 'initial';
    round.style.display = 'none';
    homePage.style.display = 'none';
  }
};

function resetCounters () {
  roundActive = 1;
  roundCounter.textContent = `RONDA ${roundActive}`;
  iaWin = 0;
  userWin = 0;
  playerScore.textContent = `${userWin}`;
  iaScore.textContent = `${iaWin}`;
};

function localStorageMatch () {
  const match = {
    resultado: `${finalResult.textContent}`,
    puntuacion: `${userWin} - ${iaWin}`,
    date: new Date()
  }
  localStorage.setItem('partida', JSON.stringify(match));
};