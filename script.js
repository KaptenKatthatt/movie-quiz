const selectFiveBtnEl = document.querySelector(".selectFiveBtn");
const selectTenBtnEl = document.querySelector(".selectTenBtn");
const selectAllBtnEl = document.querySelector(".selectAllBtn");
const startBtnContainerEl = document.querySelector(".startBtnContainer");
const questionScreenContainerEl = document.querySelector(
  ".questionScreenContainer"
);
const questionBtnContainerEl = document.querySelector(".questionBtnContainer");
const nextQuestionBtnEl = document.querySelector(".nextQuestionBtn");

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
let currentStudent;

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

// Ask how many persons you wish to guess on, 5, 10 or ALL?
//An event listener on the container containing the buttons listens for the clicked button and sets answer to that.
// Filter out 5,10 or all

//Eventlistener for selecting number of questions
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
  startBtnContainerEl.classList.add("d-none");
  questionScreenContainerEl.classList.remove("d-none");
  slicedStudents = shuffledStudents.slice(0, nbrOfSelectedStudents);
  console.log("Shuffled students", shuffledStudents);
  console.log("Sliced students", slicedStudents);
  currentStudent = slicedStudents[0];
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

  //Take the currentStudent and throw into an array with three randos
  let threeRandos = cloneAndShuffleArray(filteredWrongStudents).slice(0, 3);
  console.log("3 randos", threeRandos);
  let questionButtonNames = [currentStudent, ...threeRandos];
  console.log("Questionbutton array", questionButtonNames);
  //Randomize button names
  questionButtonNames = cloneAndShuffleArray(questionButtonNames);

  let buttonMeButtons = questionButtonNames.map(
    (name) => `<button class="btn btn-warning">${name.name}</button>`
  );

  console.log("Sliced students", slicedStudents);
  questionBtnContainerEl.innerHTML = buttonMeButtons.join("");
});

questionScreenContainerEl.addEventListener("click", (e) => {
  selectedAnswer = e.target.textContent;
  if (currentStudent.name === selectedAnswer) {
    e.target.classList.add("btn-success");
    e.target.classList.remove("btn-warning");
  } else {
    e.target.classList.add("btn-danger");
    e.target.classList.remove("btn-warning");
  }

  nextQuestionBtnEl.classList.remove("d-none");
});
