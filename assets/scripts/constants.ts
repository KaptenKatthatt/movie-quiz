import { getPlayerNameFromLocalStorage } from "./storage.js";

export interface Player{
    id: number;
    name: string;
    score: number;
    nbrOfQuestions: number;
}

export interface Student{
    id: number;
    name: string;
    image: string;

}



export interface Gamestate {
  // Methods
  getLowestHighScore(): number;
  removeLowestHighScore(): void;
  sortHighScoreList(): void;
  getLatestPlayerId(): number;
  restart(): void;

  // Getters
  readonly nbrOfRightAnswers: number;
  readonly nbrOfWrongAnswers: number;

  // Arrays and variables
  rightAnswersArr: Student[];
  wrongAnswersArr: Student[];
  filteredWrongStudents: Student[];
  shuffledQuestions: Student[];
  nbrOfSelectedQuestions: Student[];
  nbrOfQuestions: number;
  currentQuestionNbr: number;
  isCurrentAnswerCorrect: boolean;
  highScoreList: Player[];

  // Player and current question
  player: Player;
  currentQuestion: Student;
}

export const ui = {
  // Main.js
  photoContainerEl: document.querySelector(".photoContainer") as HTMLImageElement | null,
  playerNameInputEl: document.querySelector("#playerNameInput") as HTMLInputElement | null,
  playerNameInputFormEl: document.querySelector(".playerNameInputForm") as HTMLFormElement | null,
  pointsEl: document.querySelector(".points") as HTMLElement | null,
  questionBtnContainerEl: document.querySelector(".questionBtnContainer") as HTMLElement | null,
  questionScreenContainerEl: document.querySelector(".questionScreenContainer") as HTMLElement | null,
  questionBoardEl: document.querySelector(".nbrOfQuestions") as HTMLElement | null,
  siteContainerEl: document.querySelector(".siteContainer") as HTMLElement | null,
  startBtnContainerEl: document.querySelector(".startBtnContainer") as HTMLElement | null,
  startScreenContainerEl: document.querySelector(".startScreenContainer") as HTMLElement | null,

  // Endscreen.js
  finalScoreEl: document.querySelector(".finalScore") as HTMLElement | null,
  highScoreListEl: document.querySelector(".highScoreList") as HTMLElement | null,
  restartGameBtnEl: document.querySelector(".restartGameBtn") as HTMLButtonElement | null,
  rightAnswerCardsEl: document.querySelector(".rightAnswerCards") as HTMLElement | null,
  rightAnswersHeadingEl: document.querySelector(".rightAnswersHeading") as HTMLElement | null,
  wrongAnswerCardsEl: document.querySelector(".wrongAnswerCards") as HTMLElement | null,
  wrongAnswersHeadingEl: document.querySelector(".wrongAnswersHeading") as HTMLElement | null,

  // Shared
  endScreenEl: document.querySelector(".endScreen") as HTMLElement | null,
  nextQuestionBtnEl: document.querySelector(".nextQuestionBtn") as HTMLButtonElement | null,
  showNoHighScoreEl: document.querySelector(".noHighScore") as HTMLElement | null,
};

//A single object to bind them all
export const game:Gamestate = {
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
    if (ui.highScoreListEl) {
      ui.highScoreListEl.innerHTML = "";
    }
    this.currentQuestionNbr = 1;
  },
  /* **************** VARIABLES & ARRAYS ****************** */

  rightAnswersArr: [] ,
  wrongAnswersArr: [] ,
  filteredWrongStudents: [] , //Student array with correct answer filtered out
  shuffledQuestions: [] , //All students shuffled
  nbrOfSelectedQuestions: [] , //Student array sliced to nbr of selected guesses
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
  ] ,
  /* **************** PLAYER OBJECT ****************** */

  player: {
    id: 0,
    nbrOfQuestions: 0,
    get score() {
      return game.nbrOfRightAnswers;
    },
    name: getPlayerNameFromLocalStorage() || "someNonameDude",
  } as Player,
  currentQuestion: { id: 0, name: "", image: "" }, //Current question/student
};
