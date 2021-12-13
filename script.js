const colorButtons = Array.from(document.querySelectorAll(".board__color"));
let randomNum = 0;
let currentPlayer = "ai";
let aiPressedButtons = [];
let playerPressedButtons = [];
let counter = 0;

const greenAudio = new Audio(
  "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"
);

const redAudio = new Audio(
  "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"
);

const yellowAudio = new Audio(
  "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
);

const blueAudio = new Audio(
  "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"
);

const errorAudio = new Audio(
  "https://s3.amazonaws.com/adam-recvlohe-sounds/error.wav"
);

const generateRandomNumber = function () {
  randomNum = Math.floor(Math.random() * 4) + 1;
};

const findButton = function (color) {
  return colorButtons.find((b) => (b.dataset.color = color));
};

const findButtonColor = function (btn) {
  return btn.dataset.color;
};

const handleAiClick = function (btn) {
  aiPressedButtons.push(btn);
};

const handlePlayerClick = function (btn) {
  playerPressedButtons.push(btn);
};

const handleAudio = function (btn) {
  const btnColor = findButtonColor(btn);
  switch (btnColor) {
    case "red":
      redAudio.play();
      break;

    case "blue":
      blueAudio.play();
      break;

    case "green":
      greenAudio.play();
      break;

    case "yellow":
      yellowAudio.play();
      break;
  }
};

const toggleBtnColor = function (btn) {
  btn.classList.toggle(`${btn.dataset.color}--dark`);
  btn.classList.toggle(`${btn.dataset.color}`);
};

const handleButtonColor = function (btn) {
  toggleBtnColor(btn);
  setTimeout(() => {
    toggleBtnColor(btn);
  }, 500);
};

const delay = function (time) {
  return new Promise((r) => setTimeout(r, time));
};

const ai = function () {
  playerPressedButtons = [];
  generateRandomNumber();
  const btnSelected = document.querySelector(`[data-num='${randomNum}']`);
  aiPressedButtons.push(btnSelected);

  currentPlayer = "ai";
  console.log("ppppppp", currentPlayer);

  var i = 0;
  (function loopIt(i) {
    setTimeout(function () {
      handleButtonColor(aiPressedButtons[i]);
      handleAudio(aiPressedButtons[i]);
      if (i < aiPressedButtons.length - 1) loopIt(i + 1);
    }, 750);
  })(i);

  setTimeout(
    () => (currentPlayer = "player"),
    750 * aiPressedButtons.length + 500
  );
};

document.querySelector(".reset").addEventListener("click", () => {
  window.location.reload();
});

document.querySelector(".start").addEventListener("click", ai);

colorButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (currentPlayer == "player") {
      console.log(currentPlayer);
      handleButtonColor(btn);
      handleAudio(btn);
      playerPressedButtons.push(btn);
      console.log(playerPressedButtons, "p");
      console.log(aiPressedButtons, "a");

      if (
        !playerPressedButtons.every((button) => {
          return (
            button == aiPressedButtons[playerPressedButtons.indexOf(button)]
          );
        })
      ) {
        errorAudio.play();
        playerPressedButtons = [];
        console.log("you lose");
        currentPlayer = "ai";
      }

      if (playerPressedButtons.length === aiPressedButtons.length) {
        counter++;
        document.querySelector(".counter").textContent = counter;
        setTimeout(ai, 500);
      }
    }
  });
});
