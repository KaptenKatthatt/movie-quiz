import {
  renderEndScreen,
  getPlayerName,
  getHighScoreList,
} from "./endScreen.js";
import { setPlayerName } from "./storage.js";

const nextQuestionBtnEl = document.querySelector(".nextQuestionBtn");
const noHighScoreEl = document.querySelector(".noHighScore");
const endScreenEl = document.querySelector(".endScreen");
const photoContainerEl = document.querySelector(".photoContainer");
const playerNameInputFormEl = document.querySelector(".playerNameInputForm");
const playerNameInputEl = document.querySelector("#playerNameInput");
const questionBtnContainerEl = document.querySelector(".questionBtnContainer");
const startScreenContainerEl = document.querySelector(".startScreenContainer");
const startBtnContainerEl = document.querySelector(".startBtnContainer");
const questionScreenContainerEl = document.querySelector(
  ".questionScreenContainer"
);
// const scoreBoardEl = document.querySelector(".scoreBoard");

// const endScreenEl = document.querySelector(".endScreen");

// let playerName = "";

let isCorrectAnswer = false; //Boolean for score animation update
let currentStudent = {};
let filteredWrongStudents = []; //Student array with correct answer filtered out
let nbrOfSelectedQuestions = 0;
let questionButtonNames = []; //The four names on the question buttons
let shuffledStudents = []; //All students shuffled
// let studentSliced = false;
let slicedStudents = []; //Student array sliced to nbr of selected guesses

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
  playerNameInputEl.value = getPlayerName();

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

  noHighScoreEl.classList.add("d-none");
  endScreenEl.classList.add("d-none");
  startScreenContainerEl.classList.remove("d-none");
}

function startGame() {
  // Shuffles the student array to create random order on buttons
  shuffledStudents = cloneAndShuffleArray(students);
  //Create an array with selected nbr of students
  slicedStudents = shuffledStudents.slice(0, nbrOfSelectedQuestions);
  //Initiate score counter
  setScore(isCorrectAnswer, rightAnswersArr, nbrOfSelectedQuestions);

  // Trigger view transition on game start if supported
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      // Hide startscreen
      startScreenContainerEl.classList.add("d-none");

      // Show questionScreen
      questionScreenContainerEl.classList.remove("d-none");

      // Render the questionPage content
      renderNewQuestion();
    });
  } else {
    startScreenContainerEl.classList.add("d-none");
    // Show questionScreen
    questionScreenContainerEl.classList.remove("d-none");
    // Render the questionPage content
    renderNewQuestion();
  }
}

function renderNewQuestion() {
  // Make first index currentStudent
  currentStudent = slicedStudents[0];
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
  let buttonMeButtons = questionButtonNames
    .map(
      (student) =>
        `<button class="btn btn-warning btn-lg">${student.name}</button>`
    )
    .join("");

  // Add image to currentStudent from students array
  photoContainerEl.src = currentStudent.image;

  //Inject buttons into html and join array
  questionBtnContainerEl.innerHTML = buttonMeButtons;
  nextQuestionBtnEl.classList.add("d-none");
}

function setScore(isCorrectAnswer, rightAnswersArr, nbrOfSelectedQuestions) {
  const pointsEl = document.querySelector(".points");
  //Initialize score
  pointsEl.innerHTML = `<span class="points d-inline-block fw-bold">${rightAnswersArr.length}/${nbrOfSelectedQuestions}</span>`;

  // Checks if array is > 0 so the animation does not run on first question. Then removes class after animation end. Checks for isCorrectAnswer so animation doesn't run on wrong answer.
  if (rightAnswersArr.length > 0 && isCorrectAnswer) {
    // Add/remove animation
    pointsEl.classList.add("addScore");
    pointsEl.addEventListener(
      "animationend",

      () => {
        pointsEl.classList.remove("addScore");
      },
      { once: true }
    );
  }
}

/* **************** GAME START****************** */

//Renders initial game screen
renderStartScreen();

//Listen for nbr of questions selected and start game
startBtnContainerEl.addEventListener("click", (e) => {
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

playerNameInputFormEl.addEventListener("input", (e) => {
  e.stopPropagation();
  setPlayerName(e.target.value);
});

// Check if answer is correct, then set button to green, else red. Show nextQuestionBtn when clicked.
questionScreenContainerEl.addEventListener("click", (e) => {
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
    questionBtnContainerEl
      .querySelectorAll("button")
      .forEach((button) => (button.disabled = true));

    nextQuestionBtnEl.classList.remove("d-none");
    // Update scoreboard
    setScore(isCorrectAnswer, rightAnswersArr, nbrOfSelectedQuestions);
  }
});

nextQuestionBtnEl.addEventListener("click", () => {
  slicedStudents.shift();

  // studentSliced = false;

  // //Deletes currentStudent
  // studentSliced ? "" : slicedStudents.shift();
  // studentSliced = true;

  // Checks if there is any students left to question about
  if (slicedStudents.length > 0) {
    document.startViewTransition //Checks if view transition is supported, if not skip it.
      ? document.startViewTransition(() => {
          renderNewQuestion();
        })
      : renderNewQuestion();
  } else {
    // Game is over, go to endScreen
    //Hide question screen
    nextQuestionBtnEl.classList.add("d-none");
    questionScreenContainerEl.classList.add("d-none");

    // Render endscreen in endScreen.js, send over nbrOfStudents(totalQuestions), right/wrong answersArr
    renderEndScreen(nbrOfSelectedQuestions, rightAnswersArr, wrongAnswersArr);
  }
});
