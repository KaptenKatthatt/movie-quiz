const endScoreEl = document.querySelector(".endScore");
const highScoreListEl = document.querySelector(".highScoreList");
const rightAnswerCardsEl = document.querySelector(".rightAnswerCards");
const wrongAnswerCardsEl = document.querySelector(".wrongAnswerCards");
function renderAnswerCards(rightAnswersArr, wrongAnswersArr) {
  console.log("rightAnswersArr", rightAnswersArr);
  console.log("wrongAnswersArr", wrongAnswersArr);
  rightAnswerCardsEl.innerHTML = rightAnswersArr.map((answer) => {
    return `
        <div class="card" style="width: 9rem;">
  <img src="${answer.image}" class="card-img-top" alt="${answer.name}">
  <div class="card-body">
    <h5 class="card-title">${answer.name}</h5>
  </div>
</div>
    `;
  });
  wrongAnswerCardsEl.innerHTML = wrongAnswersArr.map((answer) => {
    return `
        <div class="card" style="width: 9rem;">
  <img src="${answer.image}" class="card-img-top" alt="${answer.name}">
  <div class="card-body">
    <h5 class="card-title">${answer.name}</h5>
  </div>
</div>
    `;
  });
}

function renderHighScoreList(highscoreList) {
  highScoreListEl.innerHTML = highscoreList
    .map((score) => `<li>${score}</li>`)
    .join("");
}

export function renderEndScreen(
  finalScore,
  totalQuestions,
  rightAnswersArr,
  wrongAnswersArr
) {
  let highscoreList = [1, 2, 3];
  let previousTry = finalScore;
  let rUWorthy = false;

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
  // Render score to DOM
  endScoreEl.innerText = `You final score is ${finalScore}/${totalQuestions}`;

  renderHighScoreList(highscoreList);
  renderAnswerCards(rightAnswersArr, wrongAnswersArr);
  // Display correct and wrong answers with name and photo with cards

  // Add button to launch restart game function
  // restartGame();
}
