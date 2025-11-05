export function renderEndScreen() {
  // Show endscreen
  endScreenEl.classList.remove("d-none");
  // Render score
  let finalScore = rightAnswers.length;
  endScoreEl.innerText = `You final score is ${finalScore}/${nbrOfSelectedStudents}`;

  let highscoreList = [5, 2, 3];
  let previousTry = finalScore;
  let rUWorthy = false;
  // endScoreEl.innerText = `You final score is ${finalScore}/${nbrOfSelectedStudents}`;

  // Check if finalScore is higher than lowest highscore
  // Remove lowest score and replace with finalScore
  let lowestHighScore = Math.min(...highscoreList);
  console.log("Lowest highscore", lowestHighScore);
  let highestHighScore = Math.max(...highscoreList);
  console.log("Highest highscore", highestHighScore);

  // Check if high score worthy, removes lowest score
  if (finalScore > lowestHighScore) {
    highscoreList.splice(
      highscoreList.findIndex((score) => lowestHighScore < finalScore),
      1
    );
    // Add score to high score list and sort list
    highscoreList.push(finalScore);
    highscoreList.sort((a, b) => b - a);
    // r U worthy of high score?
    rUWorthy = true;
  }
  // Check if finalScore is the highest score
  if (finalScore > highestHighScore) {
    console.log("Winner winner chicken dinner! Highest score!", finalScore);
  }

  console.log("rUWorthy", rUWorthy);
  console.log("Highscore after", highscoreList);

  // Check if high score worthy
  if (finalScore > highestHighScore) {
    console.log("You got the highest score!");
  } else if (highscoreList.length < 3) {
    console.log("You got a high score! List was not full");
  } else {
    console.log("No highscore, do gooder next time plz.");
  }

  // Display correct and wrong answers with name and photo with cards

  // Add button to launch restart game function
  // restartGame();
}
