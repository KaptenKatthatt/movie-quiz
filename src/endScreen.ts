import { restartGame } from "./main";
import { getHighScoreList, setHighScoreListToLocalStorage } from "./storage";
import { ui } from "./ui";
import { getNumberOfQuestions, getPlayerScore } from "./player";
import {
  addPlayerToHighScoreList,
  getLowestHighScore,
  removeLowestHighScore,
  sortHighScoreList,
} from "./highscorelist";
import type { Movie } from "./data/movies";
import type { Player } from "./types";
import { getNbrOfWrong } from "./game";
import { getPlayer } from "./state";

/* **************** FUNCTIONS****************** */

/**
 * Check if player score is higher than lowest score.
 * Add player to updated HSL if so, else return old HSL.
 */
const isHighScoreWorthy = function (
  currentPlayer: Player,
  currentHighScoreList: Player[]
) {
  if (currentPlayer.score > getLowestHighScore(currentHighScoreList)) {
    const updatedList = removeLowestHighScore(currentHighScoreList);
    return addPlayerToHighScoreList(currentPlayer, updatedList);
  } else {
    return currentHighScoreList;
  }
};

const formatCards = function (answerArr: Movie[], isAnswerCorrect: boolean) {
  return answerArr
    .map(
      (movie) => `
      <div class="card ${
        isAnswerCorrect
          ? "right-answer-card-shadow"
          : "wrong-answer-card-shadow"
      }" style="width: 9rem;">
        <img src="${movie.image}" class="card-img-top" alt="${movie.name}">
        <div class="card-body">
          <h5 class="card-title">${movie.name}</h5>
        </div>
      </div>
    `
    )
    .join("");
};

/**
 * Renders score count banner
 */
const renderFinalScoreBanner = function () {
  // Render final score element to DOM
  ui.endScreen.finalScoreEl.innerHTML = `<span class="final-score-text">Your final score is -> </span><span class="final-score">${getPlayerScore(
    getPlayer()
  )}/${getNumberOfQuestions(getPlayer())}!!!</span>`;
};

/**
 *Adds current player to HSL

  Checks if score higher than lowest score.
  Yes? Remove lowest score before push. No? Don't add

  Get highscorelist from local storage and parse it to array
  //If first play, get premade high score list.
  */
const renderHighScoreList = function () {
  const highScoreList = getHighScoreList();
  const finalHighScoreList = isHighScoreWorthy(getPlayer(), highScoreList);

  if (finalHighScoreList === highScoreList) {
    ui.endScreen.showNoHighScoreEl.classList.remove("d-none");
  }

  const sortedFinalHighScoreList = sortHighScoreList(finalHighScoreList);

  //render HighScoreList
  ui.endScreen.highScoreListEl.innerHTML = sortedFinalHighScoreList
    .map(
      (highScorePlayer: Player) =>
        `<li class="list-group-item ${
          highScorePlayer.id === getPlayer().id ? "fw-bolder" : ""
        }">${highScorePlayer.name} ${highScorePlayer.score}/${
          highScorePlayer.nbrOfQuestions
        }</li>`
    )
    .join("");

  setHighScoreListToLocalStorage(sortedFinalHighScoreList);
};

const renderAnswerCards = function () {
  renderRightAnswerHeading();
  renderRightAnswerCards();
  renderWrongAnswerHeading();
  renderWrongAnswerCards();
};

const renderRightAnswerHeading = function () {
  ui.endScreen.rightAnswersHeadingEl.innerText =
    getPlayerScore(getPlayer()) > 0
      ? "These were correct!"
      : "No right answers... Try again!🙃";
};

const renderRightAnswerCards = function () {
  ui.endScreen.rightAnswerCardsEl.innerHTML = formatCards(
    getPlayer().rightAnswersArr,
    true
  );
};

const renderWrongAnswerHeading = function () {
  ui.endScreen.wrongAnswersHeadingEl.innerHTML =
    getNbrOfWrong(getPlayer()) > 0
      ? "These were wrong..."
      : `<h2 class="text-black fw-bold">No wrong answers! Good job!</h2>`;
};

const renderWrongAnswerCards = function () {
  ui.endScreen.wrongAnswerCardsEl.innerHTML = formatCards(
    getPlayer().wrongAnswersArr,
    false
  );
};

/* **************** EXPORT ****************** */

export const renderEndScreen = function () {
  renderFinalScoreBanner();

  //Show endscreen
  ui.endScreen.endScreenEl.classList.remove("d-none");

  // Controls animation of final score
  ui.endScreen.finalScoreEl.classList.add("embiggen-final-score");
  ui.endScreen.finalScoreEl.addEventListener(
    "animationend",
    () => {
      ui.endScreen.finalScoreEl.classList.remove("embiggen-final-score");
    },
    { once: true }
  );

  renderHighScoreList();
  // Render correct and wrong answers with name and photo with BS-cards
  renderAnswerCards();
};

/* **************** EVENT LISTENERS****************** */

ui.endScreen.restartGameBtnEl.addEventListener("click", () => {
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
