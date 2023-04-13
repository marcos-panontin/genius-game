const startBtn = document.getElementById("start-btn");
const currentTurn = document.getElementById("current-turn");
const redButton = document.getElementById("color-button-1");
const greenButton = document.getElementById("color-button-2");
const blueButton = document.getElementById("color-button-3");
const yellowButton = document.getElementById("color-button-4");

const redSound = document.getElementById("sound1");
const greenSound = document.getElementById("sound2");
const blueSound = document.getElementById("sound3");
const yellowSound = document.getElementById("sound4");
const errorSound = document.getElementById("soundError");

let playerOrder = [];
let computerOrder = [];
let playerAllGood;
let gameWon;
let turn = 1;
let counter = 0;
let computerTurnInterval;
let allowSound = true;
let buttonsDisabled = true;

function resetVariables() {
  playerOrder = [];
  computerOrder = [];
  playerAllGood;
  gameWon;
  turn = 1;
  counter = 0;
  computerTurnInterval;
  allowSound = true;
  buttonsDisabled = true;
}

function startGame() {
  resetVariables();
  startBtn.disabled = true;
  startBtn.innerHTML = `TURNO: ${turn}`;
  startBtn.style.fontSize = "1.5em";
  generateComputerOrder();
  computerTurnInterval = setInterval(gameTurn, 1000);
}

function generateComputerOrder() {
  computerOrder = [];
  for (let index = 0; index < 20; index += 1) {
    const randomNumber = Math.floor(Math.random() * 4) + 1;
    computerOrder.push(randomNumber);
  }
}

function gameTurn() {
  buttonsDisabled = true;
  computerTurn = true;
  if (counter === turn) {
    computerTurn = false;
    clearInterval(computerTurnInterval);
    resetColors();
    buttonsDisabled = false;
  }
  if (computerTurn) {
    setTimeout(() => {
      if (computerOrder[counter] === 1) red();
      if (computerOrder[counter] === 2) green();
      if (computerOrder[counter] === 3) blue();
      if (computerOrder[counter] === 4) yellow();
      counter += 1;
    }, 300);
    resetColors();
  }
}

function check() {
  if (
    computerOrder[playerOrder.length - 1] ===
    playerOrder[playerOrder.length - 1]
  ) {
    console.log("Acertou");
    playerAllGood = true;
  }

  if (
    computerOrder[playerOrder.length - 1] !==
    playerOrder[playerOrder.length - 1]
  ) {
    playerAllGood = false;
    allowSound = false;
    blinkLights();
    startBtn.innerHTML = `RESTART</br> GAME`;
    startBtn.style.fontSize = "2em";
      startBtn.disabled = false;

  }

  if (playerAllGood && playerOrder.length === turn) {
    turn += 1;
    startBtn.innerHTML = `TURNO: ${turn}`;
    playerOrder = [];
    computerTurn = true;
    counter = 0;
    computerTurnInterval = setInterval(gameTurn, 1000);
  }

  if (!playerAllGood) {
    console.log("vamos começar do zero");
  }
}

function blinkLights() {
  yellowButton.style.background = "yellow";
  blueButton.style.background = "lightskyblue";
  greenButton.style.background = "lightgreen";
  redButton.style.background = "tomato";
}

function red() {
  redButton.style.background = "tomato";
  redSound.currenTime = 0;
  if (allowSound) redSound.play();
  if (!allowSound) errorSound.play();
}

function green() {
  greenButton.style.background = "lightgreen";
  greenSound.currenTime = 0;
  if (allowSound) greenSound.play();
  if (!allowSound) errorSound.play();
}

function blue() {
  blueButton.style.background = "lightskyblue";
  blueSound.currenTime = 0;
  if (allowSound) blueSound.play();
  if (!allowSound) errorSound.play();
}

function yellow() {
  yellowButton.style.background = "yellow";
  yellowSound.currenTime = 0;
  if (allowSound) yellowSound.play();
  if (!allowSound) errorSound.play();
}

function resetColors() {
  yellowButton.style.background = "goldenrod";
  blueButton.style.background = "darkblue";
  greenButton.style.background = "darkgreen";
  redButton.style.background = "darkred";
}

//////////////////
//EVENT LISTENERS
//////////////////

startBtn.addEventListener("click", startGame);

redButton.addEventListener("click", () => {
  if (!buttonsDisabled) {
    playerOrder.push(1);
    check();
    red();
    setTimeout(resetColors, 300);
  }
});

greenButton.addEventListener("click", () => {
  if (!buttonsDisabled) {
    playerOrder.push(2);
    check();
    green();
    setTimeout(resetColors, 300);
  }
});

blueButton.addEventListener("click", () => {
  if (!buttonsDisabled) {
    playerOrder.push(3);
    check();
    blue();
    setTimeout(resetColors, 300);
  }
});

yellowButton.addEventListener("click", () => {
  if (!buttonsDisabled) {
    playerOrder.push(4);
    check();
    yellow();
    setTimeout(resetColors, 300);
  }
});
