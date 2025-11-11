import { restartGame } from "./main.js";
import {
  getHighScoreList,
  setHighScoreList,
  getPlayerName,
} from "./storage.js";

const ui = {
  finalScore: document.querySelector(".finalScore"),
  endScreenEl: document.querySelector(".endScreen"),
  nextQuestionBtnEl: document.querySelector(".nextQuestionBtn"),
  noHighScoreEl: document.querySelector(".noHighScore"),
  playerNameInputEl: document.querySelector("#playerNameInput"),
  playerNameInputFormEl: document.querySelector(".playerNameInputForm"),
  photoContainerEl: document.querySelector(".photoContainer"),
  questionBtnContainerEl: document.querySelector(".questionBtnContainer"),
  questionScreenContainerEl: document.querySelector(".questionScreenContainer"),
  restartGameBtnEl: document.querySelector(".restartGameBtn"),
  startBtnContainerEl: document.querySelector(".startBtnContainer"),
  startScreenContainerEl: document.querySelector(".startScreenContainer"),
  startPhotosContainer: document.querySelector(".startPhotosContainer"),
  pointsEl: document.querySelector(".points"),
};

let highScoreList = [
  {
    id: 1,
    finalScore: 10,
    totalQuestions: 10,
    name: "J.O",
  },
  {
    id: 2,
    finalScore: 9,
    totalQuestions: 10,
    name: "J.O",
  },
  {
    id: 3,
    finalScore: 8,
    totalQuestions: 10,
    name: "J.O",
  },
  {
    id: 4,
    finalScore: 7,
    totalQuestions: 10,
    name: "J.O",
  },
  {
    id: 5,
    finalScore: 6,
    totalQuestions: 10,
    name: "J.O",
  },
  {
    id: 6,
    finalScore: 5,
    totalQuestions: 10,
    name: "J.O",
  },
  {
    id: 7,
    finalScore: 4,
    totalQuestions: 10,
    name: "J.O",
  },
  {
    id: 8,
    finalScore: 3,
    totalQuestions: 10,
    name: "J.O",
  },
  {
    id: 9,
    finalScore: 2,
    totalQuestions: 10,
    name: "J.O",
  },
  {
    id: 10,
    finalScore: 0,
    totalQuestions: 10,
    name: "J.O",
  },
];

function renderAnswerCards(rightAnswersArr, wrongAnswersArr) {
  function drawCards(arr, isRight) {
    return arr
      .map((student) => {
        return `
        <div class="card ${
          isRight ? "rightColor" : "wrongColor"
        }" style="width: 9rem;">
         <img src="${student.image}" class="card-img-top" alt="${student.name}">
          <div class="card-body">
            <h5 class="card-title">${student.name}</h5>
          </div>
        </div>
    `;
      })
      .join("");
  }

  // Checks whether some right answers or none
  ui.rightAnswersHeadingEl.innerText =
    rightAnswersArr.length > 0
      ? "These were correct!"
      : "No right answers... Try again!🙃";
  // Render right answer cards
  ui.rightAnswerCardsEl.innerHTML = drawCards(rightAnswersArr, true);

  // Checks whether some wrong answers or none
  ui.wrongAnswersHeadingEl.innerHTML =
    wrongAnswersArr.length > 0
      ? "These were wrong..."
      : `<h2 class="text-black fw-bold">No wrong answers! Good job!</h2>`;

  // Render wrong answer cards
  ui.wrongAnswerCardsEl.innerHTML = drawCards(wrongAnswersArr, false);
}

function renderHighScoreList(totalQuestions, rightAnswersArr) {
  //Checks if there is a HS-list in localStore, then go get it.
  if (getHighScoreList() !== null) {
    highScoreList = JSON.parse(getHighScoreList());
  } else {
    setHighScoreList(highScoreList);
  }

  let latestPlayerId = Math.max(0, ...highScoreList.map((player) => player.id));

  //Create player object
  let currentPlayerObj = {
    id: latestPlayerId + 1,
    finalScore: rightAnswersArr.length,
    totalQuestions: totalQuestions,
    name: getPlayerName() || "someNonameDude",
  };

  // Adds current player to HSL
  //Before adding player player to HSL, check if score higher than lowest score.
  // Yes? Remove lowest score before push. No? Don't add
  if (highScoreList.length >= 10) {
    let lowestScore = Math.min(
      ...highScoreList.map((player) => player.finalScore)
    );
    if (currentPlayerObj.finalScore > lowestScore) {
      highScoreList.pop();
      highScoreList.push(currentPlayerObj);
    } else {
      ui.noHighScoreEl.classList.remove("d-none");
    }
  } else {
    highScoreList.push(currentPlayerObj);
  }

  //Checks if the current player is the latest player
  function isLastPlayer(player) {
    return player.id === currentPlayerObj.id;
  }

  // Sorts HSL on finalScore.
  highScoreList.sort((a, b) => b.finalScore - a.finalScore);
  ui.highScoreListEl.innerHTML = highScoreList
    .map(
      (player) =>
        `<li class="list-group-item ${
          isLastPlayer(player) ? "fw-bolder" : ""
        }">${player.name} ${player.finalScore}/${player.totalQuestions}</li>`
    )
    .join("");
  setHighScoreList(highScoreList);

  // Render score to DOM
  ui.finalScore.innerHTML = `<span class="finalScoreText">Your final score is -></span><span class="finalScore">${currentPlayerObj.finalScore}/${currentPlayerObj.totalQuestions}!!!</span>`;
}

//Restart game
ui.restartGameBtnEl.addEventListener("click", () => {
  ui.siteContainerEl.classList.add("flip");
  ui.siteContainerEl.addEventListener(
    "animationend",
    () => {
      restartGame();
      ui.siteContainerEl.classList.remove("flip");
    },
    { once: true }
  );
});

export function renderEndScreen(
  totalQuestions,
  rightAnswersArr,
  wrongAnswersArr
) {
  //Show endscreen
  ui.endScreenEl.classList.remove("d-none");
  // Controls animation of final score
  ui.finalScore.classList.add("embiggenFinalScore");
  ui.finalScore.addEventListener(
    "animationend",
    () => {
      ui.finalScore.classList.remove("embiggenFinalScore");
    },
    { once: true }
  );
  // // Render HSL
  renderHighScoreList(totalQuestions, rightAnswersArr);

  // Display correct and wrong answers with name and photo with BS-cards
  renderAnswerCards(rightAnswersArr, wrongAnswersArr);
}
