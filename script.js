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

const students = [
  {
    id: 1,
    name: "Kalle Kallesson",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    id: 2,
    name: "Anna Andersson",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "Erik Eriksson",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 4,
    name: "Maria Nilsson",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 5,
    name: "Johan Johansson",
    image: "https://randomuser.me/api/portraits/men/15.jpg",
  },
  {
    id: 6,
    name: "Lisa Larsson",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    id: 7,
    name: "Peter Petersson",
    image: "https://randomuser.me/api/portraits/men/54.jpg",
  },
  {
    id: 8,
    name: "Sara Svensson",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 9,
    name: "Mikael Karlsson",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    id: 10,
    name: "Emma Gustafsson",
    image: "https://randomuser.me/api/portraits/women/50.jpg",
  },
  {
    id: 11,
    name: "David Davidsson",
    image: "https://randomuser.me/api/portraits/men/33.jpg",
  },
  {
    id: 12,
    name: "Jenny Persson",
    image: "https://randomuser.me/api/portraits/women/21.jpg",
  },
  {
    id: 13,
    name: "Magnus Olsson",
    image: "https://randomuser.me/api/portraits/men/41.jpg",
  },
  {
    id: 14,
    name: "Camilla Jonsson",
    image: "https://randomuser.me/api/portraits/women/36.jpg",
  },
  {
    id: 15,
    name: "Fredrik Lindberg",
    image: "https://randomuser.me/api/portraits/men/60.jpg",
  },
  {
    id: 16,
    name: "Helena Holm",
    image: "https://randomuser.me/api/portraits/women/63.jpg",
  },
];
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
  rightAnswers = [];
  wrongAnswers = [];

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
  let selectedAnswer = e.target.textContent;
  if (e.target.tagName === "BUTTON") {
    if (currentStudent.name === selectedAnswer) {
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
    //Deletes currentStudent
    studentSliced ? "" : slicedStudents.shift();
    studentSliced = true;
    console.log("SlicedStuds after", slicedStudents);

    nextQuestionBtnEl.classList.remove("d-none");
    // Update scoreboard
    setScore();
  }
});

nextQuestionBtnEl.addEventListener("click", () => {
  studentSliced = false;
  if (slicedStudents.length > 0) {
    // renderNewQuestion();
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        renderNewQuestion();
      });
    } else {
      renderNewQuestion();
    }
  } else {
    // Game is over, go to endScreen
    //Hide question screen
    nextQuestionBtnEl.classList.add("d-none");
    questionScreenContainerEl.classList.add("d-none");

    //Show endscreen
    endScreenEl.classList.remove("d-none");
    // Send over nbr of correct answers and total nbr of questions
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        try {
          renderEndScreen(
            rightAnswers.length,
            nbrOfSelectedStudents,
            rightAnswers,
            wrongAnswers
          );
        } catch (err) {
          console.error("Error in renderEndScreen:", err);
        }
      });
    } else {
      try {
        renderEndScreen(
          rightAnswers.length,
          nbrOfSelectedStudents,
          rightAnswers,
          wrongAnswers
        );
      } catch (err) {
        console.error("Error in renderEndScreen:", err);
      }
    }
  }
});
// Button to launch restart game function
restartGameBtn.addEventListener("click", () => restartGame());
