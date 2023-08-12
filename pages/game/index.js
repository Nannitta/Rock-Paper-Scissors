const rock = document.querySelector('.rock');
const paper = document.querySelector('.paper');
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
paper.addEventListener('click', handleRound);
scissors.addEventListener('click', handleRound);
nextRound.addEventListener('click', handleNextRound);
playAgain.addEventListener('click', handlePlayAgain);


/* HANDLERS */
function handleRound (event) {
  const iaMove = iaMoveGenerator();
  const userMove = handleClickMove(event);

  round.style.display = 'flex';
  round.style.flexDirection = 'column';
  round.style.alignItems = 'center';
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
  homePage.style.display = 'flex';
  round.style.display = 'none';
};

function handlePlayAgain () {
  homePage.style.display = 'flex';
  round.style.display = 'none';
  final.style.display = 'none';
  resetCounters();
};


/* FUNCTIONS */
function iaMoveGenerator () {
  const moves = ['rock', 'paper', 'scissors'];

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
  } else if (iaMove === 'paper' && userMove === 'rock') {
    roundResult.textContent = 'GANA LA IA';
    iaWin++;
    iaScore.textContent = `${iaWin}`;
  } else if (iaMove === 'scissors' && userMove === 'paper') {
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
      localStorageMatch();
    } else {
      finalResult.textContent = 'HAS GANADO!';
      localStorageMatch();
      fireWins();
    };

    final.style.display = 'flex';
    final.style.flexDirection = 'column';
    final.style.alignItems = 'center';
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
  let historyMatches = JSON.parse(localStorage.getItem('partida'));
  const match = {
    resultado: `${finalResult.textContent}`,
    puntuacion: `${userWin} - ${iaWin}`,
    date: new Date().toLocaleString().slice(0, 16).replace(',', '').replaceAll('/', '-')
  }

  if (!historyMatches) {
    historyMatches = [];
  }
    
  historyMatches.push(match);

  localStorage.setItem('partida', JSON.stringify(historyMatches));
  console.log(historyMatches);
};

/*  CONFETTI WIN */
const count = 400;
const defaults = {
  origin: { y: 0.7 }
};

function fire(particleRatio, opts) {
  confetti(Object.assign({}, defaults, opts, {
    particleCount: Math.floor(count * particleRatio)
  }));
}

function fireWins () {
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#073B4C', '#118AB2', '#06D6A0', '#FFD166', '#EF476F'],
  });
  fire(0.2, {
    spread: 60,
    colors: ['#073B4C', '#118AB2', '#06D6A0', '#FFD166', '#EF476F'],
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#073B4C', '#118AB2', '#06D6A0', '#FFD166', '#EF476F'],
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    colors: ['#073B4C', '#118AB2', '#06D6A0', '#FFD166', '#EF476F'],
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ['#073B4C', '#118AB2', '#06D6A0', '#FFD166', '#EF476F'],
  });
};