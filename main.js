import { renderEndScreen } from "./endScreen.js";
import { getPlayerName, setPlayerName } from "./storage.js";

const ui = {
  nextQuestionBtnEl: document.querySelector(".nextQuestionBtn"),
  noHighScoreEl: document.querySelector(".noHighScore"),
  endScreenEl: document.querySelector(".endScreen"),
  photoContainerEl: document.querySelector(".photoContainer"),
  playerNameInputFormEl: document.querySelector(".playerNameInputForm"),
  playerNameInputEl: document.querySelector("#playerNameInput"),
  pointsEl: document.querySelector(".points"),

  questionBtnContainerEl: document.querySelector(".questionBtnContainer"),
  startScreenContainerEl: document.querySelector(".startScreenContainer"),
  startBtnContainerEl: document.querySelector(".startBtnContainer"),
  questionScreenContainerEl: document.querySelector(".questionScreenContainer"),
};

let isCorrectAnswer = false; //Boolean for score animation update
let currentStudent = {};
let filteredWrongStudents = []; //Student array with correct answer filtered out
let nbrOfSelectedQuestions = 0;
let questionButtonNames = []; //The four names on the question buttons
let shuffledStudents = []; //All students shuffled
let nbrOfSelectedStudents = []; //Student array sliced to nbr of selected guesses

//Result arrays
let rightAnswersArr = [];
let wrongAnswersArr = [];

// Fisher-Yates algoritm for array shuffling to the rescue! 🤩
function cloneAndShuffleArray(array) {
  const shuffledArrayClone = [...array];
  for (let i = shuffledArrayClone.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffledArrayClone[i];
    shuffledArrayClone[i] = shuffledArrayClone[j];
    shuffledArrayClone[j] = temp;
  }
  return shuffledArrayClone;
}

function renderStartScreen() {
  ui.playerNameInputEl.value = getPlayerName();

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
}

export function restartGame() {
  rightAnswersArr = [];
  wrongAnswersArr = [];
  isCorrectAnswer = false;

  ui.noHighScoreEl.classList.add("d-none");
  ui.endScreenEl.classList.add("d-none");
  ui.startScreenContainerEl.classList.remove("d-none");
}

function startGame() {
  // Shuffles the student array to create random order on buttons
  shuffledStudents = cloneAndShuffleArray(students);
  //Create an array with selected nbr of students
  nbrOfSelectedStudents = shuffledStudents.slice(0, nbrOfSelectedQuestions);

  updateScoreDisplay(isCorrectAnswer && rightAnswersArr.length > 0);

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
}

function renderNewQuestion() {
  // Make first index currentStudent
  currentStudent = nbrOfSelectedStudents[0];
  // Make an array of wrong students to choose from, filters out correct answer
  filteredWrongStudents = shuffledStudents.filter(
    (student) => student.id !== currentStudent.id
  );
  //Take currentStudent and throw into an array with three randos
  let threeRandos = cloneAndShuffleArray(filteredWrongStudents).slice(0, 3);
  questionButtonNames = [currentStudent, ...threeRandos];
  //Randomize button names
  questionButtonNames = cloneAndShuffleArray(questionButtonNames);

  // Generate one button for each student name alternative
  let fourQuestionButtons = questionButtonNames
    .map(
      (student) =>
        `<button class="btn btn-warning btn-lg">${student.name}</button>`
    )
    .join("");

  // Add image to currentStudent from students array
  ui.photoContainerEl.src = currentStudent.image;

  //Inject buttons into html and join array
  ui.questionBtnContainerEl.innerHTML = fourQuestionButtons;
  ui.nextQuestionBtnEl.classList.add("d-none");
}

function updateScoreDisplay(shouldAnimate = false) {
  ui.pointsEl.innerHTML = `<span class="points d-inline-block fw-bold">${rightAnswersArr.length}/${nbrOfSelectedQuestions}</span>`;

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
}

/* **************** GAME START****************** */

//Renders initial game screen
renderStartScreen();

//Listen for nbr of questions selected and start game
ui.startBtnContainerEl.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    if (e.target.textContent.includes("5")) {
      nbrOfSelectedQuestions = 5;
    } else if (e.target.textContent.includes("10")) {
      nbrOfSelectedQuestions = 10;
    } else if (e.target.textContent.includes("ALL")) {
      nbrOfSelectedQuestions = students.length;
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
    if (currentStudent.name === e.target.textContent) {
      e.target.classList.add("btn-success");
      e.target.classList.remove("btn-warning");
      rightAnswersArr.push(currentStudent);
      isCorrectAnswer = true;
    } else if (currentStudent.name !== e.target.textContent) {
      e.target.classList.add("btn-danger");
      e.target.classList.remove("btn-warning");
      wrongAnswersArr.push(currentStudent);
      isCorrectAnswer = false;
    }

    //Disables all buttons from being clicked twice
    ui.questionBtnContainerEl
      .querySelectorAll("button")
      .forEach((button) => (button.disabled = true));

    ui.nextQuestionBtnEl.classList.remove("d-none");

    updateScoreDisplay(isCorrectAnswer && rightAnswersArr.length > 0);
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

    // Render endscreen in endScreen.js, send over nbrOfStudents(totalQuestions), right/wrong answersArr
    renderEndScreen(nbrOfSelectedQuestions, rightAnswersArr, wrongAnswersArr);
  }
});
