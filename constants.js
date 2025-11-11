export const ui = {
  // Main
  photoContainerEl: document.querySelector(".photoContainer"),
  playerNameInputEl: document.querySelector("#playerNameInput"),
  playerNameInputFormEl: document.querySelector(".playerNameInputForm"),
  pointsEl: document.querySelector(".points"),
  questionBtnContainerEl: document.querySelector(".questionBtnContainer"),
  questionScreenContainerEl: document.querySelector(".questionScreenContainer"),
  siteContainerEl: document.querySelector(".siteContainer"),
  startBtnContainerEl: document.querySelector(".startBtnContainer"),
  startScreenContainerEl: document.querySelector(".startScreenContainer"),

  // Endscreen
  finalScoreEl: document.querySelector(".finalScore"),
  highScoreListEl: document.querySelector(".highScoreList"),
  restartGameBtnEl: document.querySelector(".restartGameBtn"),
  rightAnswerCardsEl: document.querySelector(".rightAnswerCards"),
  rightAnswersHeadingEl: document.querySelector(".rightAnswersHeading"),
  wrongAnswerCardsEl: document.querySelector(".wrongAnswerCards"),
  wrongAnswersHeadingEl: document.querySelector(".wrongAnswersHeading"),

  // Shared
  endScreenEl: document.querySelector(".endScreen"),
  nextQuestionBtnEl: document.querySelector(".nextQuestionBtn"),
  noHighScoreEl: document.querySelector(".noHighScore"),
};

//HishScoreList
// Läggs i game obj för att kunna uppdateras lättare.

//currentPlayer inside of gameObject

/* 
//Create player object
export const currentPlayerObj = {
  id: latestPlayerId + 1,
  score: rightAnswersArr.length,
  totalQuestions: totalQuestions,
  name: getPlayerName() || "someNonameDude",
};

//Maybe make a single object to bind them all?
export const game = {
  score: 0,
  nbrOfRightAnswers: 0,
  nbrOfWrongAnswers: 0,
  nbrOfQuestions: 0,
  highScorelist : [],
  player: {
    id: latestPlayerId + 1,
    score: rightAnswersArr.length,
    totalQuestions: totalQuestions,
    name: getPlayerName() || "someNonameDude",
  },
};
 */
