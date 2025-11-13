import { restartGame } from "./main.js";
import {
  getHighScoreListFromLocalStorage,
  setHighScoreListToLocalStorage,
} from "./storage.js";
import { ui, game } from "./constants.js";

// ============ ANSWER CARDS SECTION ============

function formatCards(answerArr, isAnswerCorrect) {
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
}

function renderRightAnswerHeading() {
  ui.rightAnswersHeadingEl.innerText =
    game.nbrOfRightAnswers > 0
      ? "These were correct!"
      : "No right answers... Try again!🙃";
}

function renderRightAnswerCards() {
  ui.rightAnswerCardsEl.innerHTML = formatCards(game.rightAnswersArr, true);
}

function renderWrongAnswerHeading() {
  ui.wrongAnswersHeadingEl.innerHTML =
    game.nbrOfWrongAnswers > 0
      ? "These were wrong..."
      : `<h2 class="text-black fw-bold">No wrong answers! Good job!</h2>`;
}

function renderWrongAnswerCards() {
  ui.wrongAnswerCardsEl.innerHTML = formatCards(game.wrongAnswersArr, false);
}

function renderAnswerCards() {
  renderRightAnswerHeading();
  renderRightAnswerCards();
  renderWrongAnswerHeading();
  renderWrongAnswerCards();
}

// ============ HIGH SCORE SECTION ============

function renderHighScoreList() {
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
  if (game.highScoreList.length >= 10) {
    let lowestScore = game.getLowestHighScore();
    if (game.player.score > lowestScore) {
      game.removeLowestHighScore();
    } else {
      ui.showNoHighScoreEl.classList.remove("d-none");
    }
  } else {
    game.highScoreList.push(game.player);
  }

  //Checks if the current player is the latest player
  function isLastPlayer(player) {
    return player.id === game.player.id;
  }

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
}

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

export function renderEndScreen() {
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
}
