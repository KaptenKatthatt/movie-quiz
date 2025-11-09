const endScreenEl = document.querySelector(".endScreen");
const endScoreEl = document.querySelector(".endScore");
const highScoreListEl = document.querySelector(".highScoreList");
const rightAnswerCardsEl = document.querySelector(".rightAnswerCards");
const rightAnswersHeadingEl = document.querySelector(".rightAnswersHeading");
const wrongAnswerCardsEl = document.querySelector(".wrongAnswerCards");
const wrongAnswersHeadingEl = document.querySelector(".wrongAnswersHeading");

const getPlayerName = () => localStorage.getItem("playerName");

let highScoreList = [
  {
    id: 1,
    finalScore: 8,
    totalQuestions: 10,
    name: "J.O",
  },
  {
    id: 2,
    finalScore: 7,
    totalQuestions: 10,
    name: "J.O",
  },
  {
    id: 3,
    finalScore: 6,
    totalQuestions: 10,
    name: "J.O",
  },
  {
    id: 4,
    finalScore: 5,
    totalQuestions: 10,
    name: "J.O",
  },
  {
    id: 5,
    finalScore: 4,
    totalQuestions: 10,
    name: "J.O",
  },
  {
    id: 6,
    finalScore: 3,
    totalQuestions: 10,
    name: "J.O",
  },
  {
    id: 7,
    finalScore: 2,
    totalQuestions: 10,
    name: "J.O",
  },
  {
    id: 8,
    finalScore: 1,
    totalQuestions: 10,
    name: "J.O",
  },
  {
    id: 9,
    finalScore: 0,
    totalQuestions: 10,
    name: "J.O",
  },
];

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

function renderHighScoreList(playerObj) {
  //Creates high score object with both score and nbrOfQuestions that game. Sort on finalScore for highscore list. Convert to player object and send through game instead?
  // let highScoreObj = {
  //   id: latestPlayerId + 1,
  //   finalScore,
  //   totalQuestions,
  //   playerName,
  // };

  //Checks if there is a HS-list in localStore, then go get it.
  if (localStorage.getItem("highScoreList") !== null) {
    highScoreList = JSON.parse(localStorage.getItem("highScoreList"));
  }
  // Adds current player to HS-list
  highScoreList.push(playerObj);

  //**TODO**Find lowest score and remove from HSL if HSL is 10 indexes

  //Find the playerObj.id with the highest id and set playerObj.name as the latest player on HSL
  let lastPlayerObj = highScoreList.reduce((highest, curr) => {
    return curr.id > highest.id ? curr : highest;
  }, highScoreList[0]);

  //Checks if the current player is the latest player
  function isLastPlayer(playerObj) {
    return playerObj.id === lastPlayerObj.id;
  }

  // Goes through all players and resets lastPlayer to false for the styling to work on latest player in the next stage
  // highScoreList.forEach((player) => (player.lastPlayer = false));

  //Check if this player is the latest player and sets to true
  // if (highScoreList.length > 0) {
  //   const latest = highScoreList.reduce((prev, current) =>
  //     prev.timeStamp > current.timeStamp ? prev : current
  //   );
  //   latest.lastPlayer = true;
  // }

  // let timePlayed;

  // Sorts HSL on finalScore.
  highScoreList.sort((a, b) => b.finalScore - a.finalScore);
  highScoreListEl.innerHTML = highScoreList
    .map(
      (player) =>
        `<li class="list-group-item ${
          isLastPlayer(player) ? "fw-bolder" : ""
        }">${player.name} ${player.finalScore}/${player.totalQuestions}</li>`
    )
    .join("");
  localStorage.setItem("highScoreList", JSON.stringify(highScoreList));
}

export function renderEndScreen(
  totalQuestions,
  rightAnswersArr,
  wrongAnswersArr
) {
  //Find the highest id of players on the HSL.
  let latestPlayerId = highScoreList.reduce(
    (max, curr) => (curr.id > max ? curr.id : max),
    0
  );

  console.log("Highest id:", latestPlayerId);

  //Create player object
  let playerObj = {
    id: latestPlayerId + 1,
    finalScore: rightAnswersArr.length,
    totalQuestions: totalQuestions,
    name: getPlayerName() || "someDude",
  };

  //Show endscreen
  endScreenEl.classList.remove("d-none");
  // Start animation by adding class
  endScoreEl.classList.add("embiggenFinalScore");
  endScoreEl.addEventListener(
    "animationend",
    () => {
      endScoreEl.classList.remove("embiggenFinalScore");
    },
    { once: true }
  );
  // Render score to DOM
  endScoreEl.innerHTML = `Your final score is <span class="bg-success rounded-3">${playerObj.finalScore}/${playerObj.totalQuestions}</span>`;

  renderHighScoreList(playerObj);
  // Display correct and wrong answers with name and photo with BS-cards
  renderAnswerCards(rightAnswersArr, wrongAnswersArr);
}
