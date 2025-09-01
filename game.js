var score = document.getElementById("score");
var timer = document.getElementById("time");
var gameArea = document.getElementById("gameArea");
var start = document.getElementById("startGame");
var alertb = document.getElementById("alertBox");
var finalScore = document.getElementById("Fscore");
var alertClose = document.getElementById("alertClose");

var numOfScore = 0;
var time = 15;
var timerInterval;
var popTimeout;
var newPop;

function createPop() {
  const pop = document.createElement("div");
  pop.classList.add("clickButton");
  pop.innerText = "Click Me..";

  let x = Math.random() * (gameArea.offsetWidth - 100);
  let y = Math.random() * (gameArea.offsetHeight - 100);
  pop.style.left = `${x}px`;
  pop.style.top = `${y}px`;

  pop.addEventListener("click", () => {
    numOfScore++;
    score.innerText = numOfScore;
    pop.remove();
  });

  gameArea.appendChild(pop);

  popTimeout = setTimeout(() => {
    if (gameArea.contains(pop)) {
      pop.remove();
    }
  }, 2000);
}

function startFunc() {
  gameArea.style.pointerEvents = "";
  
  start.disabled = true;
  resetGame();

  timerInterval = setInterval(() => {
    time--;
    timer.innerText = time;
    if (time <= 0) {
      endGame();
    }
  }, 1000);

  newPop = setInterval(createPop, 1000);
}
start.addEventListener("click", startFunc);

function endGame() {
  clearInterval(timerInterval);
  clearTimeout(popTimeout);
  clearInterval(newPop);
  start.disabled = false;
  alertb.style.display = "flex";
  finalScore.innerText = numOfScore;

  gameArea.style.pointerEvents = "none";
}
alertClose.addEventListener("click", () => {
  alertb.style.display = "none";
});

function resetGame() {
  numOfScore = 0;
  time = 15;
  score.innerText = numOfScore;
  timer.innerText = time;
  while (gameArea.firstChild) {
    gameArea.removeChild(gameArea.firstChild);
  }
}
