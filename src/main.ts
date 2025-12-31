import { renderEndScreen } from "./endScreen";
import {
  getHighScoreList,
  getPlayerNameFromLocalStorage,
  setPlayerNameToLocalStorage,
} from "./storage";
import { type Player } from "./types";
import { ui } from "./ui";
import { movies } from "./data/movies";
import type { Movie } from "./data/movies";
import { getPlayerScore, incrementScoreByOne } from "./player";
import { getLatestPlayerId } from "./highscorelist";
import { resetPlayerInfo } from "./game";

/* **************** VARIABLES****************** */

let questionButtonNames = []; //The four names on the question buttons

/* **************** PLAYER OBJECT ****************** */
let player: Player = {
  id: 0,
  score: 0,
  name: "",
  nbrOfQuestions: 0,
  rightAnswersArr: [] as Movie[],
  wrongAnswersArr: [] as Movie[],
};

export const getPlayer = () => player;

//GAME OBJECT
export const game = {
  filteredWrongMovies: [] as Movie[], //Movie array with correct answer filtered out
  shuffledQuestions: [] as Movie[], //All movies shuffled
  nbrOfSelectedQuestions: [] as Movie[], //Movie array sliced to nbr of selected guesses
  nbrOfQuestions: 0,
  currentQuestionNbr: 1,
  isCurrentAnswerCorrect: false,

  currentQuestion: [] as Movie[], //Current question
};

/* **************** FUNCTIONS****************** */
const addPhotoToPhotoContainer = function () {
  // Add image to game.currentQuestion from movies array
  ui.questionScreen.photoContainerEl.src = game.currentQuestion[0].image;
};

// Fisher-Yates algoritm for array shuffling to the rescue! 🤩
const cloneAndShuffleArray = function (array: Movie[]) {
  const shuffledArrayClone = [...array];
  for (let i = shuffledArrayClone.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffledArrayClone[i];
    shuffledArrayClone[i] = shuffledArrayClone[j];
    shuffledArrayClone[j] = temp;
  }
  return shuffledArrayClone;
};

/**
Disables question buttons from being clicked twice
 * 
 */
const disableAllQuestionButtons = function () {
  ui.questionScreen
    .questionBtnContainerEl!.querySelectorAll("button")
    .forEach((button) => (button.disabled = true));
};

/**
 * Creates four answers for answer buttons. 1 right and 3 wrong.
 */
const getAnswerButtonNames = function () {
  questionButtonNames = [game.currentQuestion[0], ...getThreeRandomAnswers()];
  //Randomize button names
  questionButtonNames = cloneAndShuffleArray(questionButtonNames);

  return questionButtonNames;
};

/**
 *Take game.currentQuestion and throw into an array with three randos
 * @returns Array with 3 wrong answers and 1 right.
 */
const getThreeRandomAnswers = function () {
  return cloneAndShuffleArray(game.filteredWrongMovies).slice(0, 3);
};

const initPlayer = function () {
  // Create player id & name
  player.id = getLatestPlayerId(getHighScoreList()) + 1;
  player.name = getPlayerNameFromLocalStorage();
};

/**
 * Make an array of wrong answers to choose from, filters out correct answer
 */
const makeWrongAnswersArray = function () {
  game.filteredWrongMovies = game.shuffledQuestions.filter(
    (movie: Movie) => movie.id !== game.currentQuestion[0].id
  );
};

const renderNewQuestion = function () {
  setCurrentMovie();
  makeWrongAnswersArray();
  addPhotoToPhotoContainer();

  //Inject buttons into DOM
  ui.questionScreen.questionBtnContainerEl!.innerHTML =
    renderFourQuestionButtons();
  //Hide next question button
  ui.startScreen.nextQuestionBtnEl!.classList.add("d-none");
};

const renderFourQuestionButtons = function () {
  // Generate four buttons with answer alternatives
  return getAnswerButtonNames()
    .map(
      (movie) => `<button class="btn btn-warning btn-lg">${movie.name}</button>`
    )
    .join("");
};

const renderQuestionScreen = function () {
  //Sets player name to stored player name
  ui.startScreen.playerNameInputEl!.value = getPlayerNameFromLocalStorage()!;

  document.querySelector(".start-photos-container")!.innerHTML = movies
    .map((movie) => {
      return `
        <div class="card shadow-sm border-dark border-2" style="width: 8rem; height:7.5rem">
  <img src="${movie.image}" class="card-img-top" alt="Images of movies to guess the names of.">
  <div class="card-body p-0">
    <h2 class="card-title text-center display-6 fw-bolder" style="height: 1.5rem;">?</h2>
  </div>
</div>
    `;
    })
    .join("");
};

export const restartGame = function () {
  player = resetPlayerInfo(getPlayer());

  game.isCurrentAnswerCorrect = false;

  ui.endScreen.highScoreListEl!.innerHTML = "";

  game.currentQuestionNbr = 1;

  ui.endScreen.showNoHighScoreEl!.classList.add("d-none");
  ui.endScreen.endScreenEl!.classList.add("d-none");
  ui.startScreen.startScreenContainerEl!.classList.remove("d-none");
  initPlayer();
};

const startGame = (nbrOfSelectedQuestions: number) => {
  // Shuffles the movie array to create random order on buttons
  game.shuffledQuestions = cloneAndShuffleArray(movies);
  //Create an array with selected nbr of movies
  game.nbrOfSelectedQuestions = game.shuffledQuestions.slice(
    0,
    nbrOfSelectedQuestions
  );

  updateScoreDisplay(game.isCurrentAnswerCorrect && getPlayerScore(player) > 0);

  // Trigger view transition on game start if supported
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      // Hide startscreen
      ui.startScreen.startScreenContainerEl.classList.add("d-none");

      // Show questionScreen
      ui.questionScreen.questionScreenContainerEl.classList.remove("d-none");

      // Render the questionPage content
      renderNewQuestion();
    });
  } else {
    ui.startScreen.startScreenContainerEl.classList.add("d-none");
    // Show questionScreen
    ui.questionScreen.questionScreenContainerEl.classList.remove("d-none");
    // Render the questionPage content
    renderNewQuestion();
  }
};

/**
 * Creates current right answer from first index of game.nbrOfSelectedQuestions array.
 */
const setCurrentMovie = function () {
  game.currentQuestion[0] = game.nbrOfSelectedQuestions[0];
};

/**
 * Fires score animation if user scored a point
 * @param {boolean} shouldAnimate
 */
const updateScoreDisplay = function (shouldAnimate = false) {
  ui.questionScreen.questionBoardEl.innerHTML = `<span class="nbrOfQuestions d-inline-block">${game.currentQuestionNbr}/${player.nbrOfQuestions}</span>`;
  ui.questionScreen.pointsEl!.innerHTML = `<span class="points d-inline-block fw-bold">${player.score}/${player.nbrOfQuestions}</span>`;

  if (shouldAnimate) {
    ui.questionScreen.pointsEl!.classList.add("add-score-animation");
    ui.questionScreen.pointsEl!.addEventListener(
      "animationend",
      () => {
        ui.questionScreen.pointsEl!.classList.remove("add-score-animation");
      },
      { once: true }
    );
  }
};

/* **************** EVENT LISTENERS****************** */

ui.startScreen.playerNameInputEl.addEventListener("input", (e) => {
  setPlayerNameToLocalStorage((e.target as HTMLInputElement).value);
});

// Check if answer is correct, then set button to green, else red. Show next-question-btn when clicked.
ui.questionScreen.questionBtnContainerEl.addEventListener("click", (e) => {
  const button = e.target as HTMLButtonElement;
  if (button.tagName === "BUTTON" && button.textContent !== "Next question") {
    if (game.currentQuestion[0].name === button.textContent) {
      player = incrementScoreByOne(player);
      button.classList.add("btn-success");
      button.classList.remove("btn-warning");
      player.rightAnswersArr.push(game.currentQuestion[0]);
      game.isCurrentAnswerCorrect = true;
    } else if (game.currentQuestion[0].name !== button.textContent) {
      button.classList.add("btn-danger");
      button.classList.remove("btn-warning");
      player.wrongAnswersArr.push(game.currentQuestion[0]);
      game.isCurrentAnswerCorrect = false;
    }
    disableAllQuestionButtons();

    //Show next-question-btn
    ui.startScreen.nextQuestionBtnEl.classList.remove("d-none");

    updateScoreDisplay(
      game.isCurrentAnswerCorrect && getPlayerScore(player) > 0
    );
  }
});

ui.startScreen.nextQuestionBtnEl.addEventListener("click", () => {
  game.nbrOfSelectedQuestions.shift();

  game.currentQuestionNbr++;
  updateScoreDisplay();

  // Checks if there is any movies left to question about
  if (game.nbrOfSelectedQuestions.length > 0) {
    if (document.startViewTransition) {
      // Checks if view transition is supported, if not skip it.
      document.startViewTransition(() => {
        renderNewQuestion();
      });
    } else {
      renderNewQuestion();
    }
  } else {
    // Game is over, go to endScreen
    //Hide question screen
    ui.startScreen.nextQuestionBtnEl.classList.add("d-none");
    ui.questionScreen.questionScreenContainerEl.classList.add("d-none");

    renderEndScreen();
  }
});

/* **************** GAME START****************** */
//Listen for nbr of questions selected and start game
ui.startScreen.startBtnContainerEl.addEventListener("click", (e) => {
  const button = e.target as HTMLButtonElement;
  initPlayer();

  if (button.tagName === "BUTTON") {
    player.nbrOfQuestions =
      button.dataset.questions === "all"
        ? movies.length
        : Number(button.dataset.questions);
    startGame(player.nbrOfQuestions);
  }
});
//Render initial game screen
renderQuestionScreen();
