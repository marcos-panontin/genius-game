const startBtn = document.getElementById("start-btn");
const currentTurn = document.getElementById("current-turn");
const redButton = document.getElementById("color-button-1");
const greenButton = document.getElementById("color-button-2");
const blueButton = document.getElementById("color-button-3");
const yellowButton = document.getElementById("color-button-4");
const clearRecordButton = document.getElementById("clear-record");
const relaxModeButton = document.getElementById("relax-mode-switch");
const insaneModeButton = document.getElementById("insane-mode-switch");
const insaneModeDuration = 400;
const defaultModeDuration = 800;

const redSound = document.getElementById("sound1");
const greenSound = document.getElementById("sound2");
const blueSound = document.getElementById("sound3");
const yellowSound = document.getElementById("sound4");
const errorSound = document.getElementById("soundError");

let localRecord = localStorage.getItem("genius-record") || 0;
const localRecordTime = localStorage.getItem("genius-record-date") || "";
const localRecordMode = localStorage.getItem("genius-record-mode") || "";

let turnDuration = defaultModeDuration;
const bestScore = document.getElementById("best-score");
bestScore.innerHTML = `${localRecord} </br> ${localRecordTime} ${
  localRecord !== 0 ? "-" : ""
} ${localRecordMode}`;

//ALLOW SOUNDS

const soundsCheckbox = document.getElementById("user-wants-sounds");
if (JSON.parse(localStorage.getItem("userWantsSounds")) === null) {
  soundsCheckbox.checked = true;
} else {
  soundsCheckbox.checked = JSON.parse(localStorage.getItem("userWantsSounds"));
}
let userWantsSounds = soundsCheckbox.checked;

// RELAX MODE

if (JSON.parse(localStorage.getItem("userWantsRelaxMode")) === true) {
  relaxModeButton.checked = true;
} else {
  relaxModeButton.checked = false;
  localStorage.setItem("userWantsRelaxMode", relaxModeButton.checked);
}
let userWantsRelaxMode = relaxModeButton.checked;

//INSANE MODE

if (JSON.parse(localStorage.getItem("userWantsInsaneMode")) === true) {
  insaneModeButton.checked = true;
} else {
  insaneModeButton.checked = false;
  localStorage.setItem("userWantsInsaneMode", insaneModeButton.checked);
}
let userWantsInsaneMode = insaneModeButton.checked;

if (userWantsInsaneMode) {
  turnDuration = insaneModeDuration;
}

// ENABLING REMOVE RECORD BUTTON, IF RECORD EXISTS IN LOCAL STORAGE

if (typeof JSON.parse(localStorage.getItem("genius-record")) === "number") {
  document.getElementById("open-reset-record-modal").disabled = false;
}

const dateOptions = {
  day: "2-digit",
  month: "2-digit",
  year: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
  hour12: false,
};

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
  startBtn.innerHTML = `TURNO: ${userWantsInsaneMode ? "?" : turn}`;
  startBtn.style.fontSize = "1.5em";
  generateComputerOrder();
  computerTurnInterval = setInterval(gameTurn, turnDuration);
}

function generateComputerOrder() {
  computerOrder = [];
  for (let index = 0; index < 50; index += 1) {
    const randomNumber = Math.floor(Math.random() * 4) + 1;
    computerOrder.push(randomNumber);
  }
}

function gameTurn() {
  allowSound = true;
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
    playerAllGood = true;
  }

  if (
    computerOrder[playerOrder.length - 1] !==
    playerOrder[playerOrder.length - 1]
  ) {
    playerAllGood = false;
    allowSound = false;
    blinkLights();

    if (!userWantsRelaxMode) {
      startBtn.innerHTML = `RECOMEÇAR</br> JOGO`;
      startBtn.style.fontSize = "1.5em";
      startBtn.disabled = false;
    }

    // ZEN MODE

    if (userWantsRelaxMode) {
      startBtn.innerHTML = `TURNO: ${userWantsInsaneMode ? "?" : turn}`;
      playerOrder = [];
      computerTurn = true;
      counter = 0;
      computerTurnInterval = setInterval(gameTurn, 1000);
    }
  }

  if (playerAllGood && playerOrder.length === turn) {
    let currentMode = "Normal";
    if (userWantsInsaneMode) {
      currentMode = "Insano";
    }
    if (userWantsRelaxMode) {
      currentMode = "Relax";
    }

    // CHECKING THE RECORD AND DATE IN THE LOCALSTORAGE:
    if (turn > localRecord) {
      const currentTime = new Date()
        .toLocaleString("pt-br", dateOptions)
        .replace(",", " -");

      localStorage.setItem("genius-record", turn);
      localStorage.setItem("genius-record-date", currentTime);
      localStorage.setItem("genius-record-mode", currentMode);
      document.getElementById("open-reset-record-modal").disabled = false;
      bestScore.innerHTML = `${turn} </br>${currentTime} - ${currentMode}`;
    }

    turn += 1;
    startBtn.innerHTML = `TURNO: ${userWantsInsaneMode ? "?" : turn}`;
    playerOrder = [];
    computerTurn = true;
    counter = 0;
    computerTurnInterval = setInterval(gameTurn, turnDuration);
  }
}

function blinkLights() {
  yellowButton.style.background = "yellow";
  blueButton.style.background = "lightskyblue";
  greenButton.style.background = "lightgreen";
  redButton.style.background = "tomato";
  redButton.classList.add('redShadow');
  greenButton.classList.add('greenShadow');
  blueButton.classList.add('blueShadow');
  yellowButton.classList.add('yellowShadow');
}

function red() {
  redButton.classList.add('redShadow');
  redButton.style.background = "tomato";
  redSound.currentTime = 0;
  if (allowSound && userWantsSounds) redSound.play();
  if (!allowSound && userWantsSounds) errorSound.play();
}

function green() {
    greenButton.classList.add('greenShadow');
  greenButton.style.background = "lightgreen";
  greenSound.currentTime = 0;
  if (allowSound && userWantsSounds) greenSound.play();
  if (!allowSound && userWantsSounds) errorSound.play();
}

function blue() {
    blueButton.classList.add('blueShadow');
  blueButton.style.background = "lightskyblue";
  blueSound.currentTime = 0;
  if (allowSound && userWantsSounds) blueSound.play();
  if (!allowSound && userWantsSounds) errorSound.play();
}

function yellow() {
  yellowButton.classList.add('yellowShadow');
  yellowButton.style.background = "yellow";
  yellowSound.currentTime = 0;
  if (allowSound && userWantsSounds) yellowSound.play();
  if (!allowSound && userWantsSounds) errorSound.play();
}

function resetColors() {
  yellowButton.classList.remove('yellowShadow');
  blueButton.classList.remove('blueShadow');
  greenButton.classList.remove('greenShadow');
  redButton.classList.remove('redShadow');
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

soundsCheckbox.addEventListener("change", () => {
  userWantsSounds = soundsCheckbox.checked;
  localStorage.setItem("userWantsSounds", userWantsSounds);
});

clearRecordButton.addEventListener("click", () => {
  localStorage.removeItem("genius-record-date");
  localStorage.removeItem("genius-record");
  document.getElementById("open-reset-record-modal").disabled = true;
  bestScore.innerHTML = 0;
  localRecord = 0;
});

relaxModeButton.addEventListener("change", () => {
  userWantsRelaxMode = relaxModeButton.checked;
  if (insaneModeButton.checked) {
    insaneModeButton.checked = !relaxModeButton.checked;
    localStorage.setItem("userWantsInsaneMode", insaneModeButton.checked);
    userWantsInsaneMode = insaneModeButton.checked;
  }
  localStorage.setItem("userWantsRelaxMode", userWantsRelaxMode);
  if (userWantsInsaneMode) {
    turnDuration = insaneModeDuration;
  }
  if (!userWantsInsaneMode) {
    turnDuration = defaultModeDuration;
  }
});

insaneModeButton.addEventListener("change", () => {
  userWantsInsaneMode = insaneModeButton.checked;
  if (relaxModeButton.checked) {
    relaxModeButton.checked = !insaneModeButton.checked;
    localStorage.setItem("userWantsRelaxMode", relaxModeButton.checked);
    userWantsRelaxMode = relaxModeButton.checked;
  }
  if (userWantsInsaneMode) {
    turnDuration = insaneModeDuration;
  }
  if (!userWantsInsaneMode) {
    turnDuration = defaultModeDuration;
  }
  localStorage.setItem("userWantsInsaneMode", userWantsInsaneMode);
});
