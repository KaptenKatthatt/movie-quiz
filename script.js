const selectFiveBtnEl = document.querySelector(".selectFiveBtn");
const selectTenBtnEl = document.querySelector(".selectTenBtn");
const selectAllBtnEl = document.querySelector(".selectAllBtn");
const btnContainerEl = document.querySelector(".btnContainer");

const students = [
  {
    id: 1,
    name: "Kalle Kallesson",
    image: URL("img/jonas_olson.jpg"),
  },
  {
    id: 2,
    name: "Anna Andersson",
    image: URL("img/anna_andersson.jpg"),
  },
  {
    id: 3,
    name: "Erik Eriksson",
    image: URL("img/erik_eriksson.jpg"),
  },
  {
    id: 4,
    name: "Maria Nilsson",
    image: URL("img/maria_nilsson.jpg"),
  },
  {
    id: 5,
    name: "Johan Johansson",
    image: URL("img/johan_johansson.jpg"),
  },
  {
    id: 6,
    name: "Lisa Larsson",
    image: URL("img/lisa_larsson.jpg"),
  },
  {
    id: 7,
    name: "Peter Petersson",
    image: URL("img/peter_petersson.jpg"),
  },
  {
    id: 8,
    name: "Sara Svensson",
    image: URL("img/sara_svensson.jpg"),
  },
  {
    id: 9,
    name: "Mikael Karlsson",
    image: URL("img/mikael_karlsson.jpg"),
  },
  {
    id: 10,
    name: "Emma Gustafsson",
    image: URL("img/emma_gustafsson.jpg"),
  },
  {
    id: 11,
    name: "David Davidsson",
    image: URL("img/david_davidsson.jpg"),
  },
  {
    id: 12,
    name: "Jenny Persson",
    image: URL("img/jenny_persson.jpg"),
  },
  {
    id: 13,
    name: "Magnus Olsson",
    image: URL("img/magnus_olsson.jpg"),
  },
  {
    id: 14,
    name: "Camilla Jonsson",
    image: URL("img/camilla_jonsson.jpg"),
  },
  {
    id: 15,
    name: "Fredrik Lindberg",
    image: URL("img/fredrik_lindberg.jpg"),
  },
  {
    id: 16,
    name: "Helena Holm",
    image: URL("img/helena_holm.jpg"),
  },
];

btnContainerEl.addEventListener("click", (e) => {
  //An event listener on the ul containing the buttons listens for the clicked button and sets answer to that.
});

console.log(students);

// Fishes-Yates algoritm for array shuffling to the rescue! 🤩
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

console.log(shuffleArray(students));

//Show startscreen

// Ask how many persons you wish to guess on, 5, 10 or ALL?

// Randomize array

// Filter out 5,10 or all

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
