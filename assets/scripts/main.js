/* **************** IMPORTS ****************** */

import { renderEndScreen } from "./endScreen.js";
import {
  getPlayerNameFromLocalStorage,
  setPlayerNameToLocalStorage,
} from "./storage.js";
import { ui, game } from "./constants.js";

/* **************** VARIABLES****************** */

let questionButtonNames = []; //The four names on the question buttons

/* **************** FUNCTIONS****************** */
const addPhotoToPhotoContainer = () => {
  // Add image to game.currentQuestion from students array
  ui.photoContainerEl.src = game.currentQuestion.image;
};

// Fisher-Yates algoritm for array shuffling to the rescue! 🤩
const cloneAndShuffleArray = function (array) {
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
const disableAllQuestionButtons = () => {
  ui.questionBtnContainerEl
    .querySelectorAll("button")
    .forEach((button) => (button.disabled = true));
};

/**
 * Creates four answers for answer buttons. 1 right and 3 wrong.
 */
const getAnswerButtonNames = function () {
  questionButtonNames = [game.currentQuestion, ...getThreeRandomAnswers()];
  //Randomize button names
  questionButtonNames = cloneAndShuffleArray(questionButtonNames);

  return questionButtonNames;
};

/**
 *Take game.currentQuestion and throw into an array with three randos
 * @returns Array with 3 wrong answers and 1 right.
 */
const getThreeRandomAnswers = function () {
  return cloneAndShuffleArray(game.filteredWrongStudents).slice(0, 3);
};

const initGame = function () {
  // Create player id & name
  game.player.id = game.getLatestPlayerId() + 1;
  game.player.name = getPlayerNameFromLocalStorage();
};

/**
 * Make an array of wrong answers to choose from, filters out correct answer
 */
const makeWrongAnswersArray = function () {
  game.filteredWrongStudents = game.shuffledQuestions.filter(
    (student) => student.id !== game.currentQuestion.id
  );
};

const renderNewQuestion = function () {
  setCurrentStudent();
  makeWrongAnswersArray();
  addPhotoToPhotoContainer();

  //Inject buttons into DOM
  ui.questionBtnContainerEl.innerHTML = renderFourQuestionButtons();
  //Hide next question button
  ui.nextQuestionBtnEl.classList.add("d-none");
};

const renderFourQuestionButtons = function () {
  // Generate four buttons with answer alternatives
  return getAnswerButtonNames()
    .map(
      (student) =>
        `<button class="btn btn-warning btn-lg">${student.name}</button>`
    )
    .join("");
};

const renderQuestionScreen = function () {
  //Sets player name to stored player name
  ui.playerNameInputEl.value = getPlayerNameFromLocalStorage();

  document.querySelector(".startPhotosContainer").innerHTML = students
    .map((student) => {
      return `
        <div class="card shadow-sm border-dark border-2" style="width: 6rem; height:10rem">
  <img src="${student.image}" class="card-img-top" alt="Images of students to guess the names of.">
  <div class="card-body">
    <h2 class="card-title text-center display-6 fw-bolder" style="height: 1.5rem;">?</h2>
  </div>
</div>
    `;
    })
    .join("");
};

export const restartGame = function () {
  game.restart();
  ui.showNoHighScoreEl.classList.add("d-none");
  ui.endScreenEl.classList.add("d-none");
  ui.startScreenContainerEl.classList.remove("d-none");
  initGame();
};

const startGame = function () {
  // Shuffles the student array to create random order on buttons
  game.shuffledQuestions = cloneAndShuffleArray(students);
  //Create an array with selected nbr of students
  game.nbrOfSelectedQuestions = game.shuffledQuestions.slice(
    0,
    game.nbrOfQuestions
  );

  updateScoreDisplay(game.isCurrentAnswerCorrect && game.nbrOfRightAnswers > 0);

  // Trigger view transition on game start if supported
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      // Hide startscreen
      ui.startScreenContainerEl.classList.add("d-none");

      // Show questionScreen
      ui.questionScreenContainerEl.classList.remove("d-none");

      // Render the questionPage content
      renderNewQuestion();
    });
  } else {
    ui.startScreenContainerEl.classList.add("d-none");
    // Show questionScreen
    ui.questionScreenContainerEl.classList.remove("d-none");
    // Render the questionPage content
    renderNewQuestion();
  }
};

/**
 * Creates current right answer from first index of game.nbrOfSelectedQuestions array.
 */
const setCurrentStudent = function () {
  game.currentQuestion = game.nbrOfSelectedQuestions[0];
};

/**
 * Fires score animation if user scored a point
 * @param {boolean} shouldAnimate
 */
const updateScoreDisplay = function (shouldAnimate = false) {
  ui.pointsEl.innerHTML = `<span class="points d-inline-block fw-bold">${game.nbrOfRightAnswers}/${game.nbrOfQuestions}</span>`;

  if (shouldAnimate) {
    ui.pointsEl.classList.add("addScoreAnimation");
    ui.pointsEl.addEventListener(
      "animationend",
      () => {
        ui.pointsEl.classList.remove("addScoreAnimation");
      },
      { once: true }
    );
  }
};

/* **************** EVENT LISTENERS****************** */

ui.playerNameInputFormEl.addEventListener("input", (e) => {
  e.stopPropagation();
  setPlayerNameToLocalStorage(e.target.value);
});

// Check if answer is correct, then set button to green, else red. Show nextQuestionBtn when clicked.
ui.questionScreenContainerEl.addEventListener("click", (e) => {
  if (
    e.target.tagName === "BUTTON" &&
    e.target.textContent !== "Next question"
  ) {
    if (game.currentQuestion.name === e.target.textContent) {
      e.target.classList.add("btn-success");
      e.target.classList.remove("btn-warning");
      game.rightAnswersArr.push(game.currentQuestion);
      game.isCurrentAnswerCorrect = true;
    } else if (game.currentQuestion.name !== e.target.textContent) {
      e.target.classList.add("btn-danger");
      e.target.classList.remove("btn-warning");
      game.wrongAnswersArr.push(game.currentQuestion);
      game.isCurrentAnswerCorrect = false;
    }

    disableAllQuestionButtons();

    //Show nextQuestionBtn
    ui.nextQuestionBtnEl.classList.remove("d-none");

    updateScoreDisplay(
      game.isCurrentAnswerCorrect && game.nbrOfRightAnswers > 0
    );
  }
});

ui.nextQuestionBtnEl.addEventListener("click", () => {
  game.nbrOfSelectedQuestions.shift();

  // Checks if there is any students left to question about
  if (game.nbrOfSelectedQuestions.length > 0) {
    document.startViewTransition //Checks if view transition is supported, if not skip it.
      ? document.startViewTransition(() => {
          renderNewQuestion();
        })
      : renderNewQuestion();
  } else {
    // Game is over, go to endScreen
    //Hide question screen
    ui.nextQuestionBtnEl.classList.add("d-none");
    ui.questionScreenContainerEl.classList.add("d-none");

    renderEndScreen();
  }
});

/* **************** GAME START****************** */
//Listen for nbr of questions selected and start game
ui.startBtnContainerEl.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    if (e.target.textContent.includes("5")) {
      game.nbrOfQuestions = 5;
    } else if (e.target.textContent.includes("10")) {
      game.nbrOfQuestions = 10;
    } else if (e.target.textContent.includes("ALL")) {
      game.nbrOfQuestions = students.length;
    }
    startGame();
  }
});

initGame();
//Render initial game screen
renderQuestionScreen();
