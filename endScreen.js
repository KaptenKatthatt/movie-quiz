const endScoreEl = document.querySelector(".endScore");
const highScoreListEl = document.querySelector(".highScoreList");
const rightAnswerCardsEl = document.querySelector(".rightAnswerCards");
const wrongAnswerCardsEl = document.querySelector(".wrongAnswerCards");

function renderAnswerCards(rightAnswersArr, wrongAnswersArr) {
  console.log("rightAnswersArr", rightAnswersArr);
  console.log("wrongAnswersArr", wrongAnswersArr);
  rightAnswerCardsEl.innerHTML = rightAnswersArr
    .map((student) => {
      return `
        <div class="card" style="width: 9rem;">
  <img src="${student.image}" class="card-img-top" alt="${student.name}">
  <div class="card-body">
    <h5 class="card-title">${student.name}</h5>
  </div>
</div>
    `;
    })
    .join("");
  wrongAnswerCardsEl.innerHTML = wrongAnswersArr
    .map((student) => {
      return `
        <div class="card" style="width: 9rem;">
  <img src="${student.image}" class="card-img-top" alt="${student.name}">
  <div class="card-body">
    <h5 class="card-title">${student.name}</h5>
  </div>
</div>
    `;
    })
    .join("");
}

let highscoreList = [1, 1, 1];
let previousTry = [2, 3, 4];
function renderHighScoreList(finalScore) {
  let rUWorthy = false;

  previousTry.push(finalScore);
  console.log("Previous attempts", previousTry);
  console.log("Last score", previousTry[previousTry.length - 1]);

  previousTry.sort((a, b) => b - a);
  highScoreListEl.innerHTML = previousTry
    .map(
      (score, index) =>
        `<li class="list-group-item ${
          index === previousTry.length - 1 ? "bg-primary" : ""
        }"><span class="fw-bold">${score}</span></li>`
    )
    .join("");
  /* 
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
 */
  // highScoreListEl.innerHTML = previousTry
  //   .map((score) => `<li>${score}</li>`)
  //   .join("");
}

export function renderEndScreen(
  finalScore,
  totalQuestions,
  rightAnswersArr,
  wrongAnswersArr
) {
  // Render score to DOM
  endScoreEl.innerText = `You final score is ${finalScore}/${totalQuestions}`;

  renderHighScoreList(finalScore);
  // Display correct and wrong answers with name and photo with cards
  renderAnswerCards(rightAnswersArr, wrongAnswersArr);
}
