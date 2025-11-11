import { restartGame } from "./main.js";
import {
  getHighScoreList,
  setHighScoreList,
  getPlayerName,
} from "./storage.js";
import { ui } from "./constants.js";

let highScoreList = [
  {
    id: 1,
    score: 10,
    totalQuestions: 10,
    name: "J.O",
  },
  {
    id: 2,
    score: 9,
    totalQuestions: 10,
    name: "J.O",
  },
  {
    id: 3,
    score: 8,
    totalQuestions: 10,
    name: "J.O",
  },
  {
    id: 4,
    score: 7,
    totalQuestions: 10,
    name: "J.O",
  },
  {
    id: 5,
    score: 6,
    totalQuestions: 10,
    name: "J.O",
  },
  {
    id: 6,
    score: 5,
    totalQuestions: 10,
    name: "J.O",
  },
  {
    id: 7,
    score: 4,
    totalQuestions: 10,
    name: "J.O",
  },
  {
    id: 8,
    score: 3,
    totalQuestions: 10,
    name: "J.O",
  },
  {
    id: 9,
    score: 2,
    totalQuestions: 10,
    name: "J.O",
  },
  {
    id: 10,
    score: 0,
    totalQuestions: 10,
    name: "J.O",
  },
];

function renderAnswerCards(rightAnswersArr, wrongAnswersArr) {
  function formatCards(arr, isRight) {
    return arr
      .map((student) => {
        return `
        <div class="card ${
          isRight ? "rightAnswerCardShadow" : "wrongAnswerCardShadow"
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
  ui.rightAnswerCardsEl.innerHTML = formatCards(rightAnswersArr, true);

  // Checks whether some wrong answers or none
  ui.wrongAnswersHeadingEl.innerHTML =
    wrongAnswersArr.length > 0
      ? "These were wrong..."
      : `<h2 class="text-black fw-bold">No wrong answers! Good job!</h2>`;

  // Render wrong answer cards
  ui.wrongAnswerCardsEl.innerHTML = formatCards(wrongAnswersArr, false);
}

function renderHighScoreList(totalQuestions, rightAnswersArr) {
  let storedList = getHighScoreList();
  if (storedList) {
    highScoreList = JSON.parse(storedList);
  } else {
    setHighScoreList(highScoreList);
  }

  let latestPlayerId = Math.max(0, ...highScoreList.map((player) => player.id));

  //Create player object
  let currentPlayerObj = {
    id: latestPlayerId + 1,
    score: rightAnswersArr.length,
    totalQuestions: totalQuestions,
    name: getPlayerName() || "someNonameDude",
  };

  // Adds current player to HSL
  //Before adding player player to HSL, check if score higher than lowest score.
  // Yes? Remove lowest score before push. No? Don't add
  if (highScoreList.length >= 10) {
    let lowestScore = Math.min(...highScoreList.map((player) => player.score));
    if (currentPlayerObj.score > lowestScore) {
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

  // Sorts HSL on score.
  highScoreList.sort((a, b) => b.score - a.score);
  ui.highScoreListEl.innerHTML = highScoreList
    .map(
      (player) =>
        `<li class="list-group-item ${
          isLastPlayer(player) ? "fw-bolder" : ""
        }">${player.name} ${player.score}/${player.totalQuestions}</li>`
    )
    .join("");
  setHighScoreList(highScoreList);

  // Render score to DOM
  ui.finalScoreEl.innerHTML = `<span class="finalScoreText">Your final score is -></span><span class="finalScore">${currentPlayerObj.score}/${currentPlayerObj.totalQuestions}!!!</span>`;
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
  ui.finalScoreEl.classList.add("embiggenFinalScore");
  ui.finalScoreEl.addEventListener(
    "animationend",
    () => {
      ui.finalScoreEl.classList.remove("embiggenFinalScore");
    },
    { once: true }
  );
  // // Render HSL
  renderHighScoreList(totalQuestions, rightAnswersArr);

  // Display correct and wrong answers with name and photo with BS-cards
  renderAnswerCards(rightAnswersArr, wrongAnswersArr);
}
