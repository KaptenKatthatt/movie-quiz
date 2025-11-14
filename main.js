import { renderEndScreen } from "./endScreen.js";
import { getPlayerNameFromLocalStorage, setPlayerName } from "./storage.js";
import { ui, game } from "./constants.js";

// let game.isCurrentAnswerCorrect = false; //Boolean for score animation update
// let game.currentStudent = {};
let filteredWrongStudents = []; //Student array with correct answer filtered out
// let game.nbrOfQuestions = 0;
let questionButtonNames = []; //The four names on the question buttons
let shuffledStudents = []; //All students shuffled
let nbrOfSelectedStudents = []; //Student array sliced to nbr of selected guesses

const addPhotoToPhotoContainer = () => {
  // Add image to game.currentStudent from students array
  ui.photoContainerEl.src = game.currentStudent.image;
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
Disables all buttons from being clicked twice
 * 
 */
const disableAllQuestionButtons = () => {
  ui.questionBtnContainerEl
    .querySelectorAll("button")
    .forEach((button) => (button.disabled = true));
};

const renderStartScreen = function () {
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
  // rightAnswersArr = [];
  // wrongAnswersArr = [];
  // game.isCurrentAnswerCorrect = false;

  game.restart();

  ui.showNoHighScoreEl.classList.add("d-none");
  ui.endScreenEl.classList.add("d-none");
  ui.startScreenContainerEl.classList.remove("d-none");
};

const startGame = function () {
  // Shuffles the student array to create random order on buttons
  shuffledStudents = cloneAndShuffleArray(students);
  //Create an array with selected nbr of students
  nbrOfSelectedStudents = shuffledStudents.slice(0, game.nbrOfQuestions);

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

const renderNewQuestion = function () {
  // Make first index game.currentStudent
  game.currentStudent = nbrOfSelectedStudents[0];
  // Make an array of wrong students to choose from, filters out correct answer
  filteredWrongStudents = shuffledStudents.filter(
    (student) => student.id !== game.currentStudent.id
  );
  //Take game.currentStudent and throw into an array with three randos
  let threeRandomStudents = cloneAndShuffleArray(filteredWrongStudents).slice(
    0,
    3
  );
  questionButtonNames = [game.currentStudent, ...threeRandomStudents];
  //Randomize button names
  questionButtonNames = cloneAndShuffleArray(questionButtonNames);

  // Generate one button for each student name alternative
  let fourQuestionButtons = questionButtonNames
    .map(
      (student) =>
        `<button class="btn btn-warning btn-lg">${student.name}</button>`
    )
    .join("");

  addPhotoToPhotoContainer();

  //Inject buttons into html and join array
  ui.questionBtnContainerEl.innerHTML = fourQuestionButtons;
  ui.nextQuestionBtnEl.classList.add("d-none");
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

/* **************** GAME START****************** */

//Renders initial game screen
renderStartScreen();

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

ui.playerNameInputFormEl.addEventListener("input", (e) => {
  e.stopPropagation();
  setPlayerName(e.target.value);
});

// Check if answer is correct, then set button to green, else red. Show nextQuestionBtn when clicked.
ui.questionScreenContainerEl.addEventListener("click", (e) => {
  if (
    e.target.tagName === "BUTTON" &&
    e.target.textContent !== "Next question"
  ) {
    if (game.currentStudent.name === e.target.textContent) {
      e.target.classList.add("btn-success");
      e.target.classList.remove("btn-warning");
      game.rightAnswersArr.push(game.currentStudent);
      game.isCurrentAnswerCorrect = true;
    } else if (game.currentStudent.name !== e.target.textContent) {
      e.target.classList.add("btn-danger");
      e.target.classList.remove("btn-warning");
      game.wrongAnswersArr.push(game.currentStudent);
      game.isCurrentAnswerCorrect = false;
    }

    disableAllQuestionButtons();

    ui.nextQuestionBtnEl.classList.remove("d-none");

    updateScoreDisplay(
      game.isCurrentAnswerCorrect && game.nbrOfRightAnswers > 0
    );
  }
});

ui.nextQuestionBtnEl.addEventListener("click", () => {
  nbrOfSelectedStudents.shift();

  // Checks if there is any students left to question about
  if (nbrOfSelectedStudents.length > 0) {
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
