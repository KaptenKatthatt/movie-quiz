export const ui = {
  siteContainerEl: document.querySelector(".site-container") as HTMLDivElement,
  startScreen: {
    nextQuestionBtnEl: document.querySelector(
      ".next-question-btn"
    ) as HTMLButtonElement,
    playerNameInputEl: document.querySelector(
      "#player-name-input-field"
    ) as HTMLInputElement,
    startBtnContainerEl: document.querySelector(
      ".start-btn-container"
    ) as HTMLDivElement,
    startScreenContainerEl: document.querySelector(
      ".start-screen-container"
    ) as HTMLDivElement,
  },
  endScreen: {
    endScreenEl: document.querySelector(".end-screen") as HTMLDivElement,
    finalScoreEl: document.querySelector(".final-score") as HTMLDivElement,
    highScoreListEl: document.querySelector(
      ".high-score-list"
    ) as HTMLUListElement,
    restartGameBtnEl: document.querySelector(
      ".restart-game-btn"
    ) as HTMLButtonElement,
    rightAnswerCardsEl: document.querySelector(
      ".right-answer-cards"
    ) as HTMLDivElement,
    rightAnswersHeadingEl: document.querySelector(
      ".right-answers-heading"
    ) as HTMLDivElement,
    showNoHighScoreEl: document.querySelector(
      ".no-high-score-header"
    ) as HTMLDivElement,
    wrongAnswerCardsEl: document.querySelector(
      ".wrong-answer-cards"
    ) as HTMLDivElement,
    wrongAnswersHeadingEl: document.querySelector(
      ".wrong-answers-heading"
    ) as HTMLDivElement,
  },
  questionScreen: {
    photoContainerEl: document.querySelector(
      ".photo-container"
    ) as HTMLImageElement,
    pointsEl: document.querySelector(".points"),
    questionBoardEl: document.querySelector(
      ".nbrOfQuestions"
    ) as HTMLDivElement,
    questionBtnContainerEl: document.querySelector(
      ".question-btn-container"
    ) as HTMLDivElement,
    questionScreenContainerEl: document.querySelector(
      ".question-screen-container"
    ) as HTMLDivElement,
  },
};
