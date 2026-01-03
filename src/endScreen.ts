import { restartGame } from "./game";
import { getHighScoreList, setHighScoreListToLocalStorage } from "./storage";
import { ui } from "./ui";
import { getNumberOfQuestions, getPlayerScore } from "./player";
import {
  getLowestHighScore,
  removeLowestHighScore,
  sortHighScoreList,
} from "./highscorelist";
import type { Movie } from "./types";
import type { Player } from "./types";
import { getNbrOfWrongAnswers } from "./game";
import { getPlayer } from "./state";

/* **************** FUNCTIONS****************** */

function formatCards(answerArr: Movie[], isAnswerCorrect: boolean) {
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
}

function isHighScoreWorthy(currentPlayerScore: number) {
  if (currentPlayerScore > getLowestHighScore()) {
    return true;
  } else {
    return false;
  }
}

export const addPlayerToHighScoreList = () => {
  removeLowestHighScore();
  const currentHighScoreList = getHighScoreList();
  const updatedHighScoreList = [...currentHighScoreList, getPlayer()];
  setHighScoreListToLocalStorage(updatedHighScoreList);
};

function renderAnswerCards() {
  renderRightAnswerHeading();
  renderRightAnswerCards();
  renderWrongAnswerHeading();
  renderWrongAnswerCards();
}

function renderFinalScoreBanner() {
  ui.endScreen.finalScoreEl.innerHTML = `<span class="final-score-text">Your final score is -> </span><span class="final-score">${getPlayerScore()}/${getNumberOfQuestions()}!!!</span>`;
}

function renderHighScoreList() {
  if (isHighScoreWorthy(getPlayerScore())) {
    addPlayerToHighScoreList();
  } else {
    ui.endScreen.showNoHighScoreEl.classList.remove("d-none");
  }
  const sortedFinalHighScoreList = sortHighScoreList(getHighScoreList());

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
}

function renderRightAnswerCards() {
  const currentPlayer = getPlayer();
  const rightAnswersArr = currentPlayer.answers
    .filter((answer) => answer.isCorrect)
    .map((answer) => answer.movie);

  ui.endScreen.rightAnswerCardsEl.innerHTML = formatCards(
    rightAnswersArr,
    true
  );
}

function renderRightAnswerHeading() {
  ui.endScreen.rightAnswersHeadingEl.innerText =
    getPlayerScore() > 0
      ? "These were correct!"
      : "No right answers... Try again!🙃";
}

function renderWrongAnswerCards() {
  const currentPlayer = getPlayer();
  const wrongAnswersArr = currentPlayer.answers
    .filter((answer) => !answer.isCorrect)
    .map((answer) => answer.movie);

  ui.endScreen.wrongAnswerCardsEl.innerHTML = formatCards(
    wrongAnswersArr,
    false
  );
}

function renderWrongAnswerHeading() {
  ui.endScreen.wrongAnswersHeadingEl.innerHTML =
    getNbrOfWrongAnswers() > 0
      ? "These were wrong..."
      : `<h2 class="text-black fw-bold">No wrong answers! Good job!</h2>`;
}

export function renderEndScreen() {
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
}

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
