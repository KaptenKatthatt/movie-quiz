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
//  Correct? (clicked button id === isCorrectAnswer.id)Change class to correct which colors the button green(bs-success)
//Wrong? Change class to wrong that makes the button red(bs-danger).

//Enable Next question button -> Generates next question

//Update score

//Game finished?
// No, goto next question
// Yes, show finishscreen with score and high score.
//Check If highschore, if yes update highscore
//Show Play again button -> Goes to startscreen
