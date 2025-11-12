import { restartGame } from "./main.js";
import {
  getHighScoreList,
  setHighScoreList,
  getPlayerName,
} from "./storage.js";
import { ui, game } from "./constants.js";

// let game.highScoreList = [
//   {
//     id: 1,
//     score: 10,
//     nbrOfQuestions: 10,
//     name: "J.O",
//   },
//   {
//     id: 2,
//     score: 9,
//     nbrOfQuestions: 10,
//     name: "J.O",
//   },
//   {
//     id: 3,
//     score: 8,
//     nbrOfQuestions: 10,
//     name: "J.O",
//   },
//   {
//     id: 4,
//     score: 7,
//     nbrOfQuestions: 10,
//     name: "J.O",
//   },
//   {
//     id: 5,
//     score: 6,
//     nbrOfQuestions: 10,
//     name: "J.O",
//   },
//   {
//     id: 6,
//     score: 5,
//     nbrOfQuestions: 10,
//     name: "J.O",
//   },
//   {
//     id: 7,
//     score: 4,
//     nbrOfQuestions: 10,
//     name: "J.O",
//   },
//   {
//     id: 8,
//     score: 3,
//     nbrOfQuestions: 10,
//     name: "J.O",
//   },
//   {
//     id: 9,
//     score: 2,
//     nbrOfQuestions: 10,
//     name: "J.O",
//   },
//   {
//     id: 10,
//     score: 0,
//     nbrOfQuestions: 10,
//     name: "J.O",
//   },
// ];

function renderAnswerCards(rightAnswersArr, wrongAnswersArr) {
  function formatCards(arr, isAnswerCorrect) {
    return arr
      .map((student) => {
        return `
        <div class="card ${
          isAnswerCorrect ? "rightAnswerCardShadow" : "wrongAnswerCardShadow"
        }" style="width: 9rem;">
         <img src="${student.image}" class="card-img-top" alt="${student.name}">
          <div class="card-body">
            <h5 class="card-title">${student.name}</h5>
          </div>
        </div>
    `;
      })
      .join("");
  }

  // Checks whether some right answers or none
  ui.rightAnswersHeadingEl.innerText =
    game.nbrOfRightAnswers > 0
      ? "These were correct!"
      : "No right answers... Try again!🙃";
  // Render right answer cards
  ui.rightAnswerCardsEl.innerHTML = formatCards(game.rightAnswersArr, true);

  // Checks whether some wrong answers or none
  ui.wrongAnswersHeadingEl.innerHTML =
    game.nbrOfWrongAnswers.length > 0
      ? "These were wrong..."
      : `<h2 class="text-black fw-bold">No wrong answers! Good job!</h2>`;

  // Render wrong answer cards
  ui.wrongAnswerCardsEl.innerHTML = formatCards(game.wrongAnswersArr, false);
}

function renderHighScoreList() {
  let storedList = getHighScoreList();
  if (storedList) {
    game.highScoreList = JSON.parse(storedList);
  } else {
    setHighScoreList(game.highScoreList);
  }

  let latestPlayerId = Math.max(
    0,
    ...game.highScoreList.map((player) => player.id)
  );
  game.player.id = latestPlayerId + 1;

  // //Create player object
  // let game.player = {
  //   id: latestPlayerId + 1,
  //   score: rightAnswersArr.length,
  //   nbrOfQuestions: nbrOfQuestions,
  //   name: getPlayerName() || "someNonameDude",
  // };

  // Adds current player to HSL
  //Before adding player player to HSL, check if score higher than lowest score.
  // Yes? Remove lowest score before push. No? Don't add
  if (game.highScoreList.length >= 10) {
    let lowestScore = Math.min(
      ...game.highScoreList.map((player) => player.score)
    );
    if (game.player.score > lowestScore) {
      game.highScoreList.pop();
      game.highScoreList.push(game.player);
    } else {
      ui.noHighScoreEl.classList.remove("d-none");
    }
  } else {
    game.highScoreList.push(game.player);
  }

  //Checks if the current player is the latest player
  function isLastPlayer(player) {
    return player.id === game.player.id;
  }

  // Sorts HSL on score.
  game.highScoreList.sort((a, b) => b.score - a.score);
  ui.highScoreListEl.innerHTML = game.highScoreList
    .map(
      (player) =>
        `<li class="list-group-item ${
          isLastPlayer(player) ? "fw-bolder" : ""
        }">${player.name} ${player.score}/${game.nbrOfQuestions}</li>`
    )
    .join("");
  setHighScoreList(game.highScoreList);

  // Render score to DOM
  ui.finalScoreEl.innerHTML = `<span class="finalScoreText">Your final score is -></span><span class="finalScore">${game.player.score}/${game.nbrOfQuestions}!!!</span>`;
}

//Restart game
ui.restartGameBtnEl.addEventListener("click", () => {
  ui.siteContainerEl.classList.add("flip");
  ui.siteContainerEl.addEventListener(
    "animationend",
    () => {
      restartGame();
      ui.siteContainerEl.classList.remove("flip");
    },
    { once: true }
  );
});

export function renderEndScreen() {
  //Show endscreen
  ui.endScreenEl.classList.remove("d-none");
  // Controls animation of final score
  ui.finalScoreEl.classList.add("embiggenFinalScore");
  ui.finalScoreEl.addEventListener(
    "animationend",
    () => {
      ui.finalScoreEl.classList.remove("embiggenFinalScore");
    },
    { once: true }
  );
  // // Render HSL
  renderHighScoreList(game.nbrOfQuestions, game.rightAnswersArr);

  // Display correct and wrong answers with name and photo with BS-cards
  renderAnswerCards(game.rightAnswersArr, game.wrongAnswersArr);
}
