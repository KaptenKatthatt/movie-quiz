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
  noHighScoreEl: document.querySelector(".noHighScore"),
};
import { getPlayerName } from "./storage.js";

//HishScoreList
// Läggs i game obj för att kunna uppdateras lättare.

//currentPlayer inside of gameObject

//Create player object
// export const game.player = {
//   id: latestPlayerId + 1,
//   score: rightAnswersArr.length,
//   nbrOfQuestions: nbrOfQuestions,
//   name: getPlayerName() || "someNonameDude",
// };

//Maybe make a single object to bind them all?
export const game = {
  get nbrOfRightAnswers() {
    return this.rightAnswersArr.length;
  },
  get nbrOfWrongAnswers() {
    return this.wrongAnswersArr.length;
  },
  // get latestPlayerId() {
  //   return Math.max(0, ...this.highScoreList.map((player) => player.id));
  // },

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
  player: {
    id: 0,
    get score() {
      return game.nbrOfRightAnswers;
    },
    nbrOfQuestions: 0,
    name: getPlayerName() || "someNonameDude",
  },
  currentStudent: {}, //Current question

  restart() {
    this.rightAnswersArr = [];
    this.wrongAnswersArr = [];
    this.isCurrentAnswerCorrect = false;
  },
};
