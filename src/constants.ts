import { getPlayerNameFromLocalStorage } from "./storage.js";
import type { Student } from "./students";

export const ui = {
  endScreenEl: document.querySelector(".endScreen") as HTMLDivElement,
  finalScoreEl: document.querySelector(".finalScore") as HTMLDivElement,
  highScoreListEl: document.querySelector(".highScoreList") as HTMLUListElement,
  nextQuestionBtnEl: document.querySelector(
    ".nextQuestionBtn"
  ) as HTMLButtonElement,
  photoContainerEl: document.querySelector(
    ".photoContainer"
  ) as HTMLImageElement,
  playerNameInputEl: document.querySelector(
    "#playerNameInput"
  ) as HTMLInputElement,
  pointsEl: document.querySelector(".points"),
  questionBoardEl: document.querySelector(".nbrOfQuestions") as HTMLDivElement,
  questionBtnContainerEl: document.querySelector(
    ".questionBtnContainer"
  ) as HTMLDivElement,
  questionScreenContainerEl: document.querySelector(
    ".questionScreenContainer"
  ) as HTMLDivElement,
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
  siteContainerEl: document.querySelector(".siteContainer") as HTMLDivElement,
  startBtnContainerEl: document.querySelector(
    ".startBtnContainer"
  ) as HTMLDivElement,
  startScreenContainerEl: document.querySelector(
    ".startScreenContainer"
  ) as HTMLDivElement,
  wrongAnswerCardsEl: document.querySelector(
    ".wrongAnswerCards"
  ) as HTMLDivElement,
  wrongAnswersHeadingEl: document.querySelector(
    ".wrongAnswersHeading"
  ) as HTMLDivElement,
};

//A single object to bind them all
export interface HighScoreList {
  id: number;
  score: number;
  nbrOfQuestions: number;
  name: string;
}

export interface Player {
  id: number;
  score: number;
  name: string;
  rightAnswers: number;
  wrongAnswers: number;
  nbrOfQuestions: number;
}

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
    ui.highScoreListEl!.innerHTML = "";
    this.currentQuestionNbr = 1;
  },
  /* **************** VARIABLES & ARRAYS ****************** */

  rightAnswersArr: [],
  wrongAnswersArr: [],
  filteredWrongStudents: [], //Student array with correct answer filtered out
  shuffledQuestions: [] as Student[], //All students shuffled
  nbrOfSelectedQuestions: [] as Student[], //Student array sliced to nbr of selected guesses
  nbrOfQuestions: 0,
  currentQuestionNbr: 1,
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
    nbrOfQuestions: 0,
    get score() {
      return game.nbrOfRightAnswers;
    },
    name: getPlayerNameFromLocalStorage(),
  },
  currentQuestion: {
    id: 0,
    name: "",
    image: "",
  }, //Current question/student
};
