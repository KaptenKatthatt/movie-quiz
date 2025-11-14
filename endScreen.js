import { restartGame } from "./main.js";
import {
  getHighScoreListFromLocalStorage,
  getPlayerNameFromLocalStorage,
  setHighScoreListToLocalStorage,
} from "./storage.js";
import { ui, game } from "./constants.js";

// ============ ANSWER CARDS SECTION ============

const formatCards = function (answerArr, isAnswerCorrect) {
  return answerArr
    .map(
      (student) => `
      <div class="card ${
        isAnswerCorrect ? "rightAnswerCardShadow" : "wrongAnswerCardShadow"
      }" style="width: 9rem;">
        <img src="${student.image}" class="card-img-top" alt="${student.name}">
        <div class="card-body">
          <h5 class="card-title">${student.name}</h5>
        </div>
      </div>
    `
    )
    .join("");
};

const renderRightAnswerHeading = function () {
  ui.rightAnswersHeadingEl.innerText =
    game.nbrOfRightAnswers > 0
      ? "These were correct!"
      : "No right answers... Try again!🙃";
};

const renderRightAnswerCards = function () {
  ui.rightAnswerCardsEl.innerHTML = formatCards(game.rightAnswersArr, true);
};

const renderWrongAnswerHeading = function () {
  ui.wrongAnswersHeadingEl.innerHTML =
    game.nbrOfWrongAnswers > 0
      ? "These were wrong..."
      : `<h2 class="text-black fw-bold">No wrong answers! Good job!</h2>`;
};

const renderWrongAnswerCards = function () {
  ui.wrongAnswerCardsEl.innerHTML = formatCards(game.wrongAnswersArr, false);
};

const renderAnswerCards = function () {
  renderRightAnswerHeading();
  renderRightAnswerCards();
  renderWrongAnswerHeading();
  renderWrongAnswerCards();
};

// ============ HIGH SCORE SECTION ============

const renderHighScoreList = function () {
  // Check if there is a HSL in local storage, if so, go get it and parse it to an array.
  let storedList = getHighScoreListFromLocalStorage();
  if (storedList) {
    game.highScoreList = JSON.parse(storedList);
  } else {
    setHighScoreListToLocalStorage(game.highScoreList);
  }

  // Adds current player to HSL
  //Before adding player player to HSL, check if score higher than lowest score.
  // Yes? Remove lowest score before push. No? Don't add

  if (game.player.score > game.getLowestHighScore()) {
    game.removeLowestHighScore();
    game.highScoreList.push(game.player);
  } else {
    ui.showNoHighScoreEl.classList.remove("d-none");
  }

  //How to get into game object?
  // Create player id & name
  game.player.id = game.getLatestPlayerId() + 1;
  game.player.name = getPlayerNameFromLocalStorage();

  //Checks if the current player is the latest player
  const isLastPlayer = function (player) {
    return player.id === game.player.id;
  };

  // Sorts HSL on score before rendering
  game.sortHighScoreList();
  ui.highScoreListEl.innerHTML = game.highScoreList
    .map(
      (player) =>
        `<li class="list-group-item ${
          isLastPlayer(player) ? "fw-bolder" : ""
        }">${player.name} ${player.score}/${game.nbrOfQuestions}</li>`
    )
    .join("");
  setHighScoreListToLocalStorage(game.highScoreList);

  // Render score to DOM
  ui.finalScoreEl.innerHTML = `<span class="finalScoreText">Your final score is -></span><span class="finalScore">${game.player.score}/${game.nbrOfQuestions}!!!</span>`;
};

// ============ EVENT LISTENERS ============

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

// ============ EXPORTS ============

export const renderEndScreen = function () {
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

  renderHighScoreList();
  // Render correct and wrong answers with name and photo with BS-cards
  renderAnswerCards();
};
