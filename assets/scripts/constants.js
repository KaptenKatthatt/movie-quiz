import { getPlayerNameFromLocalStorage } from "./storage.js";

export const ui = {
  // Main.js
  photoContainerEl: document.querySelector(".photoContainer"),
  playerNameInputEl: document.querySelector("#playerNameInput"),
  playerNameInputFormEl: document.querySelector(".playerNameInputForm"),
  pointsEl: document.querySelector(".points"),
  questionBtnContainerEl: document.querySelector(".questionBtnContainer"),
  questionScreenContainerEl: document.querySelector(".questionScreenContainer"),
  siteContainerEl: document.querySelector(".siteContainer"),
  startBtnContainerEl: document.querySelector(".startBtnContainer"),
  startScreenContainerEl: document.querySelector(".startScreenContainer"),

  // Endscreen.js
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
  showNoHighScoreEl: document.querySelector(".noHighScore"),
};

//A single object to bind them all
export const game = {
  /* **************** FUNCTIONS****************** */
  getLowestHighScore() {
    return Math.min(...this.highScoreList.map((player) => player.score));
  },
  removeLowestHighScore() {
    this.sortHighScoreList();
    this.highScoreList.pop();
  },
  sortHighScoreList() {
    this.highScoreList.sort((a, b) => b.score - a.score);
  },
  getLatestPlayerId() {
    return Math.max(...this.highScoreList.map((player) => player.id));
  },
  get nbrOfRightAnswers() {
    return this.rightAnswersArr.length;
  },
  get nbrOfWrongAnswers() {
    return this.wrongAnswersArr.length;
  },
  restart() {
    this.rightAnswersArr = [];
    this.wrongAnswersArr = [];
    this.isCurrentAnswerCorrect = false;
  },
  /* **************** VARIABLES & ARRAYS ****************** */

  rightAnswersArr: [],
  wrongAnswersArr: [],
  nbrOfQuestions: 0,
  isCurrentAnswerCorrect: false,
  highScoreList: [
    {
      id: 1,
      score: 10,
      nbrOfQuestions: 10,
      name: "J.O",
    },
    {
      id: 2,
      score: 9,
      nbrOfQuestions: 10,
      name: "J.O",
    },
    {
      id: 3,
      score: 8,
      nbrOfQuestions: 10,
      name: "J.O",
    },
    {
      id: 4,
      score: 7,
      nbrOfQuestions: 10,
      name: "J.O",
    },
    {
      id: 5,
      score: 6,
      nbrOfQuestions: 10,
      name: "J.O",
    },
    {
      id: 6,
      score: 5,
      nbrOfQuestions: 10,
      name: "J.O",
    },
    {
      id: 7,
      score: 4,
      nbrOfQuestions: 10,
      name: "J.O",
    },
    {
      id: 8,
      score: 3,
      nbrOfQuestions: 10,
      name: "J.O",
    },
    {
      id: 9,
      score: 2,
      nbrOfQuestions: 10,
      name: "J.O",
    },
    {
      id: 10,
      score: 0,
      nbrOfQuestions: 10,
      name: "J.O",
    },
  ],
  /* **************** PLAYER OBJECT ****************** */

  player: {
    id: 0,
    get score() {
      return game.nbrOfRightAnswers;
    },
    nbrOfQuestions: 0,
    name: getPlayerNameFromLocalStorage() || "someNonameDude",
  },
  currentStudent: {}, //Current question
};
