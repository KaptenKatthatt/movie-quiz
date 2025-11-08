import { renderEndScreen } from "./endScreen.js";
const siteContainerEl = document.querySelector(".siteContainer");
const startScreenContainerEl = document.querySelector(".startScreenContainer");
const startBtnContainerEl = document.querySelector(".startBtnContainer");
const questionScreenContainerEl = document.querySelector(
  ".questionScreenContainer"
);
const questionBtnContainerEl = document.querySelector(".questionBtnContainer");
const nextQuestionBtnEl = document.querySelector(".nextQuestionBtn");
const photoContainerEl = document.querySelector(".photoContainer");
const scoreBoardEl = document.querySelector(".scoreBoard");
const restartGameBtn = document.querySelector(".restartGameBtn");
const endScreenEl = document.querySelector(".endScreen");

const playerNameInputFormEl = document.querySelector(".playerNameInputForm");
let playerName = "";

let currentStudent = {};
let nbrOfSelectedStudents = 0;
let shuffledStudents = []; //All students shuffled
let studentSliced = false;
let slicedStudents = []; //Student array sliced to nbr of selected guesses
let filteredWrongStudents = []; //Student array with correct answer filtered out
let questionButtonNames = []; //The four names on the question buttons
let correctAnswer = false; //Boolean for score animation update

//Result arrays
let rightAnswers = [];
let wrongAnswers = [];

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

function startGame() {
  // Shuffles the student array to create random order on buttons
  shuffledStudents = cloneAndShuffleArray(students);
  //Create an array with selected nbr of students
  slicedStudents = shuffledStudents.slice(0, nbrOfSelectedStudents);

  // Trigger view transition on game start
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      // Hide startscreen
      startScreenContainerEl.classList.add("d-none");

      // Show questionScreen
      questionScreenContainerEl.classList.remove("d-none");

      //Reset score for first question
      setScore(correctAnswer);
      // Render the questionPage content
      renderNewQuestion();
    });
  }
}

function setScore(correctAnswer) {
  // Checks if it is > 0 so it does not run on first question. Then removes class after animation end.
  if (rightAnswers.length > 0 && correctAnswer) {
    scoreBoardEl.classList.add("addScore");
    scoreBoardEl.addEventListener("animationend", () => {
      scoreBoardEl.classList.remove("addScore");
    });
  }
  scoreBoardEl.innerHTML = `Score: <span class="fw-bold">${rightAnswers.length}/${nbrOfSelectedStudents}</span>`;
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

  // Generate one button for each student
  let buttonMeButtons = questionButtonNames.map(
    (student) =>
      `<button class="btn btn-warning btn-lg">${student.name}</button>`
  );

  // Add image to currentStudent from students array
  photoContainerEl.src = currentStudent.image;

  //Inject buttons into html and join array
  questionBtnContainerEl.innerHTML = buttonMeButtons.join("");
  nextQuestionBtnEl.classList.add("d-none");
}

function restartGame() {
  rightAnswers = [];
  wrongAnswers = [];

  endScreenEl.classList.add("d-none");
  startScreenContainerEl.classList.remove("d-none");
}

/* **************** GAME START****************** */

//Renders initial game screen
renderStartScreen();

//Listen for nbr of questions selected and start game
startBtnContainerEl.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    if (e.target.textContent.includes("5")) {
      nbrOfSelectedStudents = 5;
    } else if (e.target.textContent.includes("10")) {
      nbrOfSelectedStudents = 10;
    } else if (e.target.textContent.includes("ALL")) {
      nbrOfSelectedStudents = students.length;
    }
    startGame();
  }
});

playerNameInputFormEl.addEventListener("input", (e) => {
  e.stopPropagation();
  e.preventDefault();
  playerName = e.target.value;
  console.log(playerName);
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
      rightAnswers.push(currentStudent);
      correctAnswer = true;
    } else if (currentStudent.name !== e.target.textContent) {
      e.target.classList.add("btn-danger");
      e.target.classList.remove("btn-warning");
      wrongAnswers.push(currentStudent);
      correctAnswer = false;
    }

    //Disables all buttons from being clicked twice
    const buttons = questionBtnContainerEl.querySelectorAll("button");
    buttons.forEach((button) => (button.disabled = true));

    nextQuestionBtnEl.classList.remove("d-none");
    // Update scoreboard
    setScore(correctAnswer);
  }
});

nextQuestionBtnEl.addEventListener("click", () => {
  studentSliced = false;

  //Deletes currentStudent
  studentSliced ? "" : slicedStudents.shift();
  studentSliced = true;

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

    // Render endscreen and send over nbr of correct answers and total nbr of questions
    renderEndScreen(
      rightAnswers.length,
      nbrOfSelectedStudents,
      rightAnswers,
      wrongAnswers,
      playerName
    );
  }
});
//Restart game
restartGameBtn.addEventListener("click", () => {
  siteContainerEl.classList.add("flip");
  siteContainerEl.addEventListener("animationend", () => {
    restartGame();
    siteContainerEl.classList.remove("flip");
  });
});
