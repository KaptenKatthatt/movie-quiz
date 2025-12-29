export const ui = {
  siteContainerEl: document.querySelector(".siteContainer") as HTMLDivElement,
  startScreen: {
    nextQuestionBtnEl: document.querySelector(
      ".nextQuestionBtn"
    ) as HTMLButtonElement,
    playerNameInputEl: document.querySelector(
      "#playerNameInput"
    ) as HTMLInputElement,
    startBtnContainerEl: document.querySelector(
      ".startBtnContainer"
    ) as HTMLDivElement,
    startScreenContainerEl: document.querySelector(
      ".startScreenContainer"
    ) as HTMLDivElement,
  },
  endScreen: {
    endScreenEl: document.querySelector(".endScreen") as HTMLDivElement,
    finalScoreEl: document.querySelector(".finalScore") as HTMLDivElement,
    highScoreListEl: document.querySelector(
      ".highScoreList"
    ) as HTMLUListElement,
    restartGameBtnEl: document.querySelector(
      ".restartGameBtn"
    ) as HTMLButtonElement,
    rightAnswerCardsEl: document.querySelector(
      ".rightAnswerCards"
    ) as HTMLDivElement,
    rightAnswersHeadingEl: document.querySelector(
      ".rightAnswersHeading"
    ) as HTMLDivElement,
    showNoHighScoreEl: document.querySelector(".noHighScore") as HTMLDivElement,
    wrongAnswerCardsEl: document.querySelector(
      ".wrongAnswerCards"
    ) as HTMLDivElement,
    wrongAnswersHeadingEl: document.querySelector(
      ".wrongAnswersHeading"
    ) as HTMLDivElement,
  },
  questionScreen: {
    photoContainerEl: document.querySelector(
      ".photoContainer"
    ) as HTMLImageElement,
    pointsEl: document.querySelector(".points"),
    questionBoardEl: document.querySelector(
      ".nbrOfQuestions"
    ) as HTMLDivElement,
    questionBtnContainerEl: document.querySelector(
      ".questionBtnContainer"
    ) as HTMLDivElement,
    questionScreenContainerEl: document.querySelector(
      ".questionScreenContainer"
    ) as HTMLDivElement,
  },
};
