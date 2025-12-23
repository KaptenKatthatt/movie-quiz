import type { Movie } from "./movies";

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
export type HighScoreList = Player[];

export interface Player {
  id: number;
  score: number;
  name: string;
  wrongAnswers: number;
  nbrOfQuestions: number;
  rightAnswersArr: Movie[];
  wrongAnswersArr: Movie[];
}

export const game = {
  /* **************** METHODS****************** */
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
    return player.rightAnswersArr.length;
  },
  get nbrOfWrongAnswers() {
    return player.wrongAnswersArr.length;
  },
  restart() {
    player.rightAnswersArr = [];
    player.wrongAnswersArr = [];
    this.isCurrentAnswerCorrect = false;
    ui.highScoreListEl!.innerHTML = "";
    this.currentQuestionNbr = 1;
  },
  /* **************** VARIABLES & ARRAYS ****************** */

  filteredWrongStudents: [] as Movie[], //Movie array with correct answer filtered out
  shuffledQuestions: [] as Movie[], //All movies shuffled
  nbrOfSelectedQuestions: [] as Movie[], //Movie array sliced to nbr of selected guesses
  nbrOfQuestions: 0,
  currentQuestionNbr: 1,
  isCurrentAnswerCorrect: false,
  highScoreList: [
    {
      id: 1,
      score: 10,
      nbrOfQuestions: 10,
      name: "J.O",
      wrongAnswers: 0,
      rightAnswersArr: [] as Movie[],
      wrongAnswersArr: [] as Movie[],
    },
    {
      id: 2,
      score: 9,
      nbrOfQuestions: 10,
      name: "J.O",
      wrongAnswers: 0,
      rightAnswersArr: [] as Movie[],
      wrongAnswersArr: [] as Movie[],
    },
    {
      id: 3,
      score: 8,
      nbrOfQuestions: 10,
      name: "J.O",
      wrongAnswers: 0,
      rightAnswersArr: [] as Movie[],
      wrongAnswersArr: [] as Movie[],
    },
    {
      id: 4,
      score: 7,
      nbrOfQuestions: 10,
      name: "J.O",
      wrongAnswers: 0,
      rightAnswersArr: [] as Movie[],
      wrongAnswersArr: [] as Movie[],
    },
    {
      id: 5,
      score: 6,
      nbrOfQuestions: 10,
      name: "J.O",
      wrongAnswers: 0,
      rightAnswersArr: [] as Movie[],
      wrongAnswersArr: [] as Movie[],
    },
    {
      id: 6,
      score: 5,
      nbrOfQuestions: 10,
      name: "J.O",
      wrongAnswers: 0,
      rightAnswersArr: [] as Movie[],
      wrongAnswersArr: [] as Movie[],
    },
    {
      id: 7,
      score: 4,
      nbrOfQuestions: 10,
      name: "J.O",
      wrongAnswers: 0,
      rightAnswersArr: [] as Movie[],
      wrongAnswersArr: [] as Movie[],
    },
    {
      id: 8,
      score: 3,
      nbrOfQuestions: 10,
      name: "J.O",
      wrongAnswers: 0,
      rightAnswersArr: [] as Movie[],
      wrongAnswersArr: [] as Movie[],
    },
    {
      id: 9,
      score: 2,
      nbrOfQuestions: 10,
      name: "J.O",
      wrongAnswers: 0,
      rightAnswersArr: [] as Movie[],
      wrongAnswersArr: [] as Movie[],
    },
    {
      id: 10,
      score: 0,
      nbrOfQuestions: 10,
      name: "J.O",
      wrongAnswers: 0,
      rightAnswersArr: [] as Movie[],
      wrongAnswersArr: [] as Movie[],
    },
  ],
  currentQuestion: [] as Movie[], //Current question/student
};

/* **************** PLAYER OBJECT ****************** */
export const player: Player = {
  id: 0,
  score: 0,
  name: "",
  wrongAnswers: 0,
  nbrOfQuestions: 0,
  rightAnswersArr: [] as Movie[],
  wrongAnswersArr: [] as Movie[],
};
