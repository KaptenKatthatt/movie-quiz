import { renderEndScreen } from "./endScreen.js";

const selectFiveBtnEl = document.querySelector(".selectFiveBtn");
const selectTenBtnEl = document.querySelector(".selectTenBtn");
const selectAllBtnEl = document.querySelector(".selectAllBtn");
const startBtnContainerEl = document.querySelector(".startBtnContainer");
const questionScreenContainerEl = document.querySelector(
  ".questionScreenContainer"
);
const questionBtnContainerEl = document.querySelector(".questionBtnContainer");
const nextQuestionBtnEl = document.querySelector(".nextQuestionBtn");
const photoContainerEl = document.querySelector(".photoContainer");
const scoreBoardEl = document.querySelector(".scoreBoard");
const endScreenEl = document.querySelector(".endScreen");
const restartGameBtn = document.querySelector(".restartGameBtn");

let currentStudent = {};
let nbrOfSelectedStudents = 0;
let shuffledStudents = []; //Complete shuffled student array
let studentSliced = false;
let slicedStudents = []; //Student array sliced to nbr of selected guesses
let filteredWrongStudents = []; //Student array with correct answer filtered out
let questionButtonNames = []; //The four names on the question buttons

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

function setScore() {
  scoreBoardEl.innerText = `Score: ${rightAnswers.length}/${nbrOfSelectedStudents}`;
}

function renderNewQuestion() {
  // first index is currentStudent
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
    (student) => `<button class="btn btn-warning">${student.name}</button>`
  );

  console.log("Currstudent", currentStudent);
  // Add image to currentStudent from students array
  photoContainerEl.src = currentStudent.image;

  //Inject buttons into html and join array
  questionBtnContainerEl.innerHTML = buttonMeButtons.join("");
  nextQuestionBtnEl.classList.add("d-none");
}

function restartGame() {
  console.log("Before reset arrays", rightAnswers, wrongAnswers);

  rightAnswers = [];
  wrongAnswers = [];

  console.log("Reset arrays", rightAnswers, wrongAnswers);

  endScreenEl.classList.add("d-none");
  startBtnContainerEl.classList.remove("d-none");
}

//Eventlistener for selecting number of questions
startBtnContainerEl.addEventListener("click", (e) => {
  if (e.target.textContent.includes("5")) {
    nbrOfSelectedStudents = 5;
  } else if (e.target.textContent.includes("10")) {
    nbrOfSelectedStudents = 10;
  } else if (e.target.textContent.includes("Yes")) {
    nbrOfSelectedStudents = students.length;
  }
  // Shuffles the student array to create random order on buttons
  shuffledStudents = cloneAndShuffleArray(students);
  //Create an array with selected nbr of students
  slicedStudents = shuffledStudents.slice(0, nbrOfSelectedStudents);
  console.log("SlicedStuds before", slicedStudents);

  // Hide startPage
  startBtnContainerEl.classList.add("d-none");
  // Show questionPage
  questionScreenContainerEl.classList.remove("d-none");
  //Update score
  setScore();

  // Render the questionPage content
  renderNewQuestion();
});

// Check if answer is correct, then set button to green, else red. Show nextQuestionBtn when clicked.
questionScreenContainerEl.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    if (currentStudent.name === e.target.textContent) {
      e.target.classList.add("btn-success");
      e.target.classList.remove("btn-warning");
      rightAnswers.push(currentStudent);
    } else {
      e.target.classList.add("btn-danger");
      e.target.classList.remove("btn-warning");
      wrongAnswers.push(currentStudent);
    }
    //Disables all buttons from being clicked twice
    const buttons = questionBtnContainerEl.querySelectorAll("button");
    buttons.forEach((button) => (button.disabled = true));

    nextQuestionBtnEl.classList.remove("d-none");
    // Update scoreboard
    setScore();
  }
});

nextQuestionBtnEl.addEventListener("click", () => {
  studentSliced = false;

  //Deletes currentStudent
  console.log("SlicedStuds before", slicedStudents);
  studentSliced ? "" : slicedStudents.shift();
  studentSliced = true;
  console.log("SlicedStuds after", slicedStudents);

  // Checks if there is any students left to question about
  if (slicedStudents.length > 0) {
    document.startViewTransition
      ? document.startViewTransition(() => {
          renderNewQuestion();
        })
      : renderNewQuestion();
  } else {
    // Game is over, go to endScreen
    //Hide question screen
    nextQuestionBtnEl.classList.add("d-none");
    questionScreenContainerEl.classList.add("d-none");

    //Show endscreen
    endScreenEl.classList.remove("d-none");
    // Render endscreen and send over nbr of correct answers and total nbr of questions
    renderEndScreen(
      rightAnswers.length,
      nbrOfSelectedStudents,
      rightAnswers,
      wrongAnswers
    );
  }
});
// Button to launch restart game function
restartGameBtn.addEventListener("click", () => restartGame());
