"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderEndScreen = void 0;
const main_1 = require("./main");
const storage_1 = require("./storage");
const constants_1 = require("./constants");
/* **************** FUNCTIONS****************** */
/**
 * Check if player score is higher than lowest score
 */
const checkIfHighScoreWorthy = function () {
    if (constants_1.game.player.score > constants_1.game.getLowestHighScore()) {
        constants_1.game.removeLowestHighScore();
        constants_1.game.highScoreList.push(constants_1.game.player);
    }
    else {
        constants_1.ui.showNoHighScoreEl?.classList.remove("d-none");
    }
};
const formatCards = function (answerArr, isAnswerCorrect) {
    return answerArr
        .map((student) => `
      <div class="card ${isAnswerCorrect ? "rightAnswerCardShadow" : "wrongAnswerCardShadow"}" style="width: 9rem;">
        <img src="${student.image}" class="card-img-top" alt="${student.name}">
        <div class="card-body">
          <h5 class="card-title">${student.name}</h5>
        </div>
      </div>
    `)
        .join("");
};
/**
 *Checks if the current player is the latest player
 */
const isLastPlayer = function (player) {
    return player.id === constants_1.game.player.id;
};
/**
 * Renders score count banner
 */
const renderFinalScoreBanner = function () {
    // Render final score element to DOM
    constants_1.ui.finalScoreEl.innerHTML = `<span class="finalScoreText">Your final score is -> </span><span class="finalScore">${constants_1.game.player.score}/${constants_1.game.player.nbrOfQuestions}!!!</span>`;
};
/**
 *Adds current player to HSL

  Checks if score higher than lowest score.
  Yes? Remove lowest score before push. No? Don't add

  */
const renderHighScoreList = function () {
    //Get highscorelist from local storage and parse it to array
    //If first play, get premade highscore from game obj.
    const storedList = (0, storage_1.getHighScoreListFromLocalStorage)();
    constants_1.game.highScoreList = storedList ? JSON.parse(storedList) : constants_1.game.highScoreList;
    constants_1.game.player.name = (0, storage_1.getPlayerNameFromLocalStorage)();
    checkIfHighScoreWorthy();
    // Sorts HSL on score before rendering
    constants_1.game.sortHighScoreList();
    //render HighScoreList
    constants_1.ui.highScoreListEl.innerHTML = constants_1.game.highScoreList
        .map((player) => `<li class="list-group-item ${isLastPlayer(player) ? "fw-bolder" : ""}">${player.name} ${player.score}/${player.nbrOfQuestions}</li>`)
        .join("");
    (0, storage_1.setHighScoreListToLocalStorage)(constants_1.game.highScoreList);
};
const renderAnswerCards = function () {
    renderRightAnswerHeading();
    renderRightAnswerCards();
    renderWrongAnswerHeading();
    renderWrongAnswerCards();
};
const renderRightAnswerHeading = function () {
    constants_1.ui.rightAnswersHeadingEl.innerText =
        constants_1.game.nbrOfRightAnswers > 0
            ? "These were correct!"
            : "No right answers... Try again!🙃";
};
const renderRightAnswerCards = function () {
    if (constants_1.ui.rightAnswerCardsEl) {
        constants_1.ui.rightAnswerCardsEl.innerHTML = formatCards(constants_1.game.rightAnswersArr, true);
    }
};
const renderWrongAnswerHeading = function () {
    if (constants_1.ui.wrongAnswersHeadingEl) {
        constants_1.ui.wrongAnswersHeadingEl.innerHTML =
            constants_1.game.nbrOfWrongAnswers > 0
                ? "These were wrong..."
                : `<h2 class="text-black fw-bold">No wrong answers! Good job!</h2>`;
    }
};
const renderWrongAnswerCards = function () {
    if (constants_1.ui.wrongAnswerCardsEl) {
        constants_1.ui.wrongAnswerCardsEl.innerHTML = formatCards(constants_1.game.wrongAnswersArr, false);
    }
};
/* **************** EXPORT ****************** */
const renderEndScreen = function () {
    renderFinalScoreBanner();
    //Show endscreen
    constants_1.ui.endScreenEl?.classList.remove("d-none");
    // Controls animation of final score
    constants_1.ui.finalScoreEl?.classList.add("embiggenFinalScore");
    constants_1.ui.finalScoreEl?.addEventListener("animationend", () => {
        constants_1.ui.finalScoreEl?.classList.remove("embiggenFinalScore");
    }, { once: true });
    renderHighScoreList();
    // Render correct and wrong answers with name and photo with BS-cards
    renderAnswerCards();
};
exports.renderEndScreen = renderEndScreen;
/* **************** EVENT LISTENERS****************** */
constants_1.ui.restartGameBtnEl?.addEventListener("click", () => {
    constants_1.ui.siteContainerEl?.classList.add("flip");
    constants_1.ui.siteContainerEl?.addEventListener("animationend", () => {
        (0, main_1.restartGame)();
        constants_1.ui.siteContainerEl?.classList.remove("flip");
    }, { once: true });
});
//# sourceMappingURL=endScreen.js.map