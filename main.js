// filepath: /home/jonas/code/js1/Inlämningsuppgift1/code/fed25-js1-uppgift-1-KaptenKatthatt/main.js
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const students = [
  {
    id: 1,
    name: "Kalle Kallesson",
    image: URL("img/jonas_olson.jpg"),
  },
];

//Show startscreen

// Ask how many persons you wish to guess on, 5, 10 or ALL?

//An event listener on the ul containing the buttons listens for the clicked button and sets answer to that.

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
