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
    finalScore: 10,
    totalQuestions: 10,
    name: "J.O",
  },
  {
    id: 2,
    finalScore: 9,
    totalQuestions: 10,
    name: "J.O",
  },
  {
    id: 3,
    finalScore: 8,
    totalQuestions: 10,
    name: "J.O",
  },
  {
    id: 4,
    finalScore: 7,
    totalQuestions: 10,
    name: "J.O",
  },
  {
    id: 5,
    finalScore: 6,
    totalQuestions: 10,
    name: "J.O",
  },
  {
    id: 6,
    finalScore: 5,
    totalQuestions: 10,
    name: "J.O",
  },
  {
    id: 7,
    finalScore: 4,
    totalQuestions: 10,
    name: "J.O",
  },
  {
    id: 8,
    finalScore: 3,
    totalQuestions: 10,
    name: "J.O",
  },
  {
    id: 9,
    finalScore: 2,
    totalQuestions: 10,
    name: "J.O",
  },
  {
    id: 10,
    finalScore: 0,
    totalQuestions: 10,
    name: "J.O",
  },
];
function renderHighScoreList(totalQuestions, rightAnswersArr) {
  //Checks if there is a HS-list in localStore, then go get it.
  if (localStorage.getItem("highScoreList") !== null) {
    highScoreList = JSON.parse(localStorage.getItem("highScoreList"));
  } else {
    localStorage.setItem("highScoreList", highScoreList);
  }

  let latestPlayerId = Math.max(0, ...highScoreList.map((player) => player.id));

  // console.log("Highest id:", latestPlayerId);
  //Create player object
  let playerObj = {
    id: latestPlayerId + 1,
    finalScore: rightAnswersArr.length,
    totalQuestions: totalQuestions,
    name: getPlayerName() || "someDude",
  };

  // Adds current player to HS-list
  //Before adding player player to HSL, check if score higher than lowest score.
  // Yes? Remove lowest score before push. No? Don't add
  if (highScoreList.length >= 10) {
    // let lowestScore = highScoreList.reduce((lowest, curr) => {
    //   return curr.finalScore > lowest.finalScore
    //     ? curr.finalScore
    //     : lowest.finalScore;
    // });
    let lowestScore = Math.min(
      ...highScoreList.map((player) => player.finalScore)
    );
    console.log("lowest score", lowestScore);
    console.log("playerobj", playerObj);
    if (playerObj.finalScore > lowestScore) {
      highScoreList.pop();
      highScoreList.push(playerObj);
      // console.log("player pushed score:", playerObj.finalScore);
    } else {
      alert("Too low score, no high score list for you!");
    }
  } else {
    highScoreList.push(playerObj);
  }

  //Find the playerObj.id with the highest id and set playerObj.name as the latest player on HSL
  // let lastPlayerObj = highScoreList.reduce((highest, curr) => {
  //   return curr.id > highest.id ? curr : highest;
  // }, highScoreList[0]);

  //Checks if the current player is the latest player
  function isLastPlayer(player) {
    // console.log("islastplayer playerobj:", playerObj);
    return player.id === playerObj.id;
  }

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

  // Render score to DOM
  endScoreEl.innerHTML = `Your final score is <span class="bg-success rounded-3">${playerObj.finalScore}/${playerObj.totalQuestions}</span>`;
}

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
export function renderEndScreen(
  totalQuestions,
  rightAnswersArr,
  wrongAnswersArr
) {
  //Find the highest id of players on the HSL.
  // let latestPlayerId = highScoreList.reduce(
  //   (max, curr) => (curr.id > max ? curr.id : max),
  //   0
  // );
  // Finds highest id of player on HSL. Used for styling last player on HSL and creating new player obj.

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
  // // Render HSL
  // endScoreEl.innerHTML = `Your final score is <span class="bg-success rounded-3">${playerObj.finalScore}/${playerObj.totalQuestions}</span>`;
  renderHighScoreList(totalQuestions, rightAnswersArr);

  // Display correct and wrong answers with name and photo with BS-cards
  renderAnswerCards(rightAnswersArr, wrongAnswersArr);
}
