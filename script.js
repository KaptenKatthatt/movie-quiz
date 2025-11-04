const selectFiveBtnEl = document.querySelector(".selectFiveBtn");
const selectTenBtnEl = document.querySelector(".selectTenBtn");
const selectAllBtnEl = document.querySelector(".selectAllBtn");
const startBtnContainerEl = document.querySelector(".startBtnContainer");
const questionScreenContainerEl = document.querySelector(
  ".questionScreenContainer"
);

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

let nbrOfSelected = 0;

console.log("Students before shuffle", students);

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
const shuffledStudents = cloneAndShuffleArray(students);
console.log("Students after shuffle", shuffledStudents);

//Show startscreen

// Ask how many persons you wish to guess on, 5, 10 or ALL?
//An event listener on the container containing the buttons listens for the clicked button and sets answer to that.
// Filter out 5,10 or all

startBtnContainerEl.addEventListener("click", (e) => {
  if (e.target.textContent.includes("5")) {
    nbrOfSelected = 5;
    console.log("5 selected", nbrOfSelected);
    console.log(shuffledStudents.slice(0, nbrOfSelected));
  } else if (e.target.textContent.includes("10")) {
    nbrOfSelected = 10;
    console.log("10 selected", nbrOfSelected);
    console.log(shuffledStudents.slice(0, nbrOfSelected));
  } else if (e.target.textContent.includes("Yes")) {
    nbrOfSelected = students.length;
    console.log("All selected", nbrOfSelected);
    console.log(shuffledStudents.slice(0, nbrOfSelected));
  }
  startBtnContainerEl.classList.add("d-none");
  questionScreenContainerEl.classList.remove("d-none");
});

const gameArray = [];

// Map the results to buttons

//An event listener on the div containing the buttons listens for the clicked button and sets answer to that.

//If 5 or 10, pick 5 or 10 random objects from array.
//If ALL, pick array.length number of people and randomize

// Load game screen with 1 photo and four choice buttons, and a disabled next question button.

//make an array with the correct name and three wrong ones. Randomize the array before showing it.

// User clicks on an option
//  Correct? Change class to correct which colors the button green(bs-success)
//Wrong? Change class to wrong that makes the button red(bs-danger).

//Enable Next question button -> Generates next question

//Update score

//Game finished?
// No, goto next question
// Yes, show finishscreen with score and high score.
//Check If highschore, if yes update highscore
//Show Play again button -> Goes to startscreen
