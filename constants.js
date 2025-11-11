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
  player: {
    id: latestPlayerId + 1,
    score: rightAnswersArr.length,
    totalQuestions: totalQuestions,
    name: getPlayerName() || "someNonameDude",
  },
};
