const endScoreEl = document.querySelector(".endScore");
const highScoreListEl = document.querySelector(".highScoreList");
const rightAnswerCardsEl = document.querySelector(".rightAnswerCards");
const rightAnswersHeadingEl = document.querySelector(".rightAnswersHeading");
const wrongAnswerCardsEl = document.querySelector(".wrongAnswerCards");
const wrongAnswersHeadingEl = document.querySelector(".wrongAnswersHeading");

function renderAnswerCards(rightAnswersArr, wrongAnswersArr) {
  // Checks whether some right answers or none
  rightAnswersHeadingEl.innerText =
    rightAnswersArr.length > 0
      ? "These were correct!"
      : "No right answers... try again";
  // Render right answer cards
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
  // Checks whether some wrong answers or none
  wrongAnswersHeadingEl.innerHTML =
    wrongAnswersArr.length > 0
      ? "These were wrong..."
      : `<h2 class="text-black fw-bold">No wrong answers! Good job!</h2>`;

  // Render wrong answer cards
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

let highScoreList = [];
function renderHighScoreList(finalScore, totalQuestions) {
  //Creates object with both score and nbrOfQuestions that game. Sort on finalScore for highscore list.
  let highScoreObj = {
    finalScore,
    totalQuestions,
    timeStamp: new Date(),
    lastPlayer: false,
  };
  highScoreList.push(highScoreObj);

  // Goes through all players and resets lastPlayer to false for the styling to work on latest player in the next stage
  highScoreList.forEach((player) => (player.lastPlayer = false));

  //Check if this player is the latest player and sets to true
  if (highScoreList.length > 0) {
    const latest = highScoreList.reduce((prev, current) =>
      prev.timeStamp > current.timeStamp ? prev : current
    );
    latest.lastPlayer = true;
  }
  let timePlayed;
  highScoreList.sort((a, b) => b.finalScore - a.finalScore);
  let playerName = "J.O";
  highScoreListEl.innerHTML = highScoreList
    .map(
      (score) =>
        `<li class="list-group-item ${
          score.lastPlayer ? "bg-success text-light" : "bg-light text-dark"
        }"> ${playerName}
    <span class="">${score.finalScore}/${score.totalQuestions}</span></li>
    `
    )
    .join("");
}

export function renderEndScreen(
  finalScore,
  totalQuestions,
  rightAnswersArr,
  wrongAnswersArr
) {
  // Start animation by adding class
  endScoreEl.classList.add("embiggenFinalScore");
  // Render score to DOM
  endScoreEl.innerHTML = `Your final score is <span class="bg-success rounded-3">${finalScore}/${totalQuestions}</span>`;

  renderHighScoreList(finalScore, totalQuestions);
  // Display correct and wrong answers with name and photo with cards
  renderAnswerCards(rightAnswersArr, wrongAnswersArr);
}
