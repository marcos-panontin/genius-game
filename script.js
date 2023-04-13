// DOM CAPTURES
const startBtn = document.getElementById("start-btn");
const colorButtons = document.querySelectorAll(".color-button");
const newGameText = document.getElementById("new-game-text");

// DECLARING VARIABLES
let randomizedColorsArray = [];
let isGameStarted = false;

const pickRandomColorButton = () =>
  colorButtons[Math.floor(Math.random() * colorButtons.length)];

const generateColorSequence = () =>
  randomizedColorsArray.push(pickRandomColorButton());

const initialCountdown = () => {
  setTimeout(() => {
    newGameText.textContent = "3";
  }, 200);
  setTimeout(() => {
    newGameText.textContent = "2";
  }, 400);
  setTimeout(() => {
    newGameText.textContent = "1";
  }, 600);
  setTimeout(() => {
    newGameText.textContent = "";
  }, 800);
};

const illuminateButtons = () => {
  console.log(randomizedColorsArray);
  randomizedColorsArray.forEach((button, index) => {
    setTimeout(() => {
      button.classList.add("change-opacity");
    }, 1200 * (index + 1));

    setTimeout(function () {
      button.classList.remove("change-opacity");
    }, 1500 + 1200 * (index + 1));
  });
};

let playerProgress = 0;
const checkAnswers = (eventTarget) => {
  console.log("playerProgress - INÍCIO DA FUNÇÃO CHECKANSWERS", playerProgress);
  if (eventTarget === randomizedColorsArray[playerProgress]) {
    if (playerProgress === randomizedColorsArray.length - 1) {
      console.log("novo turno");
      // SHOWING CHECKMARK IF ALL ANSWERS ARE CORRECT
      newGameText.textContent = "✓";
      newGameText.style.fontSize = "2em";
      // WAITING TO DISAPPEAR THE CHECKMARK AND INITIATING ANOTHER TURN
      setTimeout(() => {
        newGameText.textContent = "";
        newTurn();
      }, 500);
    } else {
      console.log('ACERTOU');
      playerProgress += 1;
    }

    //CHECKING IF EVENTTARGET ISNT UNDEFINED AND IS DIFFERENT THAN THE playerProgress IN THE ARRAY
  } else {
    console.log(
      `ERROU! VOCÊ CLICOU EM ${eventTarget.outerHTML} e o esperado era ${randomizedColorsArray[playerProgress].outerHTML}.O playerProgress está em ${playerProgress}.`
    );
    // RESETING EVERYTHING
    randomizedColorsArray = [];
    playerProgress = 0;
  }

  console.log("-------------------------------------------");
};

const listenForClicks = () => {
  console.log('ENTROU NA LISTENFORCLICKS');
  colorButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      checkAnswers(event.target);
    });
  });
};

const newTurn = () => {
  playerProgress = 0;
  generateColorSequence();
  illuminateButtons();
  listenForClicks();
};

const newGame = () => {
  startBtn.disabled = "disabled";
  isGameStarted = true;
  initialCountdown();
  newTurn();
};

startBtn.addEventListener("click", newGame);

// colorButtons.forEach((colorButton) => {
//   console.log(randomizedColorsArray, "randomizedCollorsArray");

//   // colorButton.addEventListener("click", (event) => {
//   //   if (randomizedColorsArray[playerProgress] === event.target) {
//   //     console.log(randomizedColorsArray, "randomizedCollorsArray");
//   //     console.log("resposta correta");
//   //     areAnswersCorrect = true;
//   //     playerProgress += 1;
//   //   } else if (randomizedColorsArray[playerProgress] !== event.target) {
//   //     console.log("resposta errada");
//   //     areAnswersCorrect = false;
//   //   }
//   //   if (playerProgress === randomizedColorsArray.length && areAnswersCorrect) {
//   //     console.log("playerProgress = array.length; all answers are correct");
//   //     return true;
//   //   }
// });
// });
// };
