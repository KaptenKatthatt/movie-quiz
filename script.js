const selectFiveBtnEl = document.querySelector(".selectFiveBtn");
const selectTenBtnEl = document.querySelector(".selectTenBtn");
const selectAllBtnEl = document.querySelector(".selectAllBtn");
const startBtnContainerEl = document.querySelector(".startBtnContainer");
const questionScreenContainerEl = document.querySelector(
  ".questionScreenContainer"
);
const questionBtnContainerEl = document.querySelector(".questionBtnContainer");

const students = [
  {
    id: 1,
    name: "Kalle Kallesson",
    image: "img/jonas_olson.jpg",
  },
  {
    id: 2,
    name: "Anna Andersson",
    image: "img/anna_andersson.jpg",
  },
  {
    id: 3,
    name: "Erik Eriksson",
    image: "img/erik_eriksson.jpg",
  },
  {
    id: 4,
    name: "Maria Nilsson",
    image: "img/maria_nilsson.jpg",
  },
  {
    id: 5,
    name: "Johan Johansson",
    image: "img/johan_johansson.jpg",
  },
  {
    id: 6,
    name: "Lisa Larsson",
    image: "img/lisa_larsson.jpg",
  },
  {
    id: 7,
    name: "Peter Petersson",
    image: "img/peter_petersson.jpg",
  },
  {
    id: 8,
    name: "Sara Svensson",
    image: "img/sara_svensson.jpg",
  },
  {
    id: 9,
    name: "Mikael Karlsson",
    image: "img/mikael_karlsson.jpg",
  },
  {
    id: 10,
    name: "Emma Gustafsson",
    image: "img/emma_gustafsson.jpg",
  },
  {
    id: 11,
    name: "David Davidsson",
    image: "img/david_davidsson.jpg",
  },
  {
    id: 12,
    name: "Jenny Persson",
    image: "img/jenny_persson.jpg",
  },
  {
    id: 13,
    name: "Magnus Olsson",
    image: "img/magnus_olsson.jpg",
  },
  {
    id: 14,
    name: "Camilla Jonsson",
    image: "img/camilla_jonsson.jpg",
  },
  {
    id: 15,
    name: "Fredrik Lindberg",
    image: "img/fredrik_lindberg.jpg",
  },
  {
    id: 16,
    name: "Helena Holm",
    image: "img/helena_holm.jpg",
  },
];

let nbrOfSelectedStudents = 0;
let shuffledStudents = []; //Complete shuffled student array
let slicedStudents = []; //Student array reduced to nbr of selected guesses

// console.log("Students before shuffle", students);

// Fishes-Yates algoritm for array shuffling to the rescue! 🤩
const cloneAndShuffleArray = (array) => {
  const shuffledArrayClone = [...array];
  for (let i = shuffledArrayClone.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffledArrayClone[i];
    shuffledArrayClone[i] = shuffledArrayClone[j];
    shuffledArrayClone[j] = temp;
  }
  return shuffledArrayClone;
};

// Randomize array
//Clone and shuffle students array
shuffledStudents = cloneAndShuffleArray(students);
// console.log("Students after shuffle", shuffledStudents);

//Show startscreen

// Ask how many persons you wish to guess on, 5, 10 or ALL?
//An event listener on the container containing the buttons listens for the clicked button and sets answer to that.
// Filter out 5,10 or all

startBtnContainerEl.addEventListener("click", (e) => {
  if (e.target.textContent.includes("5")) {
    nbrOfSelectedStudents = 5;
    // console.log("5 selected", nbrOfSelectedStudents);
    // console.log(shuffledStudents.slice(0, nbrOfSelectedStudents));
  } else if (e.target.textContent.includes("10")) {
    nbrOfSelectedStudents = 10;
    // console.log("10 selected", nbrOfSelectedStudents);
    // console.log(shuffledStudents.slice(0, nbrOfSelectedStudents));
  } else if (e.target.textContent.includes("Yes")) {
    nbrOfSelectedStudents = students.length;
    // console.log("All selected", nbrOfSelectedStudents);
    // console.log(shuffledStudents.slice(0, nbrOfSelectedStudents));
  }
  // startBtnContainerEl.classList.add("d-none");
  // questionScreenContainerEl.classList.remove("d-none");
  slicedStudents = shuffledStudents.slice(0, nbrOfSelectedStudents);
  console.log("Shuffled students", shuffledStudents);
  console.log("Sliced students", slicedStudents);
  let currentStudent = slicedStudents[0];
  console.log("currentStudent", currentStudent);
  let filteredWrongStudents = shuffledStudents.filter((student) => {
    return student.id !== currentStudent.id;
  });
  console.log("Filtered wrong students", filteredWrongStudents);
  slicedStudents.shift();
  currentStudent = slicedStudents[0];
  console.log("currentStudent", currentStudent);
  filteredWrongStudents = shuffledStudents.filter((student) => {
    return student.id !== currentStudent.id;
  });
  console.log("Filtered wrong students", filteredWrongStudents);

  //Take
  let threeRandos = cloneAndShuffleArray(students).slice(0, 3);
  console.log("3 randos", threeRandos);
  let questionButtonNames = [currentStudent, ...threeRandos];
  console.log("Questionbutton array", questionButtonNames);

  let buttonMeButtons = questionButtonNames.map(
    (name) => `<button class="btn btn-warning">${name.name}</button>`
  );

  console.log("Sliced students", slicedStudents);
  questionBtnContainerEl.innerHTML = buttonMeButtons.join("");
});

// Map the results to buttons
// Make an array with 1 correct name and 3 random names.
// Make each index into a button with the student.name
//Make a function that slices out 3 random people from shuffledStudents
//Make array with the current correct answer and 3 random people from shuffledStudents. Then shuffle that array and present it as buttons.

// currentQuestionArray = slicedStudents[n] + 3 indexes from shuffledStudens

// slicedStudents.map((student) => {
//   `<button class="btn btn-light">${student.name}</button>`;
// });

//An event listener on the div containing the buttons listens for the clicked button and sets answer to that.

//If 5 or 10, pick 5 or 10 random objects from array.
//If ALL, pick array.length number of people and randomize

// Load game screen with 1 photo and four choice buttons, and a disabled next question button.

//make an array with the correct name and three wrong ones. Randomize the array before showing it.

// User clicks on an option
//  Correct? (clicked button id === correctAnswer.id)Change class to correct which colors the button green(bs-success)
//Wrong? Change class to wrong that makes the button red(bs-danger).

//Enable Next question button -> Generates next question

//Update score

//Game finished?
// No, goto next question
// Yes, show finishscreen with score and high score.
//Check If highschore, if yes update highscore
//Show Play again button -> Goes to startscreen
