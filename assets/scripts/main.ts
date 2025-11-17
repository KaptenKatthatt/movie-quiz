import { renderEndScreen } from "./endScreen";
import { students } from "./students";
// import {
//   getPlayerNameFromLocalStorage,
//   setPlayerNameToLocalStorage,
// } from "./storage";
import { ui, game, type Student } from "./constants";
import { Gamestate } from "./gamestate";

/* **************** VARIABLES ****************** */

let questionButtonNames: Student[] = []; //The four names on the question buttons

/* **************** FUNCTIONS (GAME LOGIC) ****************** */
const addPhotoToPhotoContainer = function () {
  // Add image to game.currentQuestion from students array
  ui.photoContainerEl!.src = game.currentQuestion.image;
};

// // Fisher-Yates algoritm for array shuffling to the rescue! 🤩
// const cloneAndShuffleArray = function <T>(array: T[]): T[] {
//   const shuffledArrayClone = [...array];
//   for (let i = shuffledArrayClone.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     const temp:T  = shuffledArrayClone[i]!;
//     shuffledArrayClone[i] = shuffledArrayClone[j]!;
//     shuffledArrayClone[j] = temp;
//   }
//   return shuffledArrayClone
// }

/**
Disables question buttons from being clicked twice
 * 
 */
const disableAllQuestionButtons = function () {
  ui.questionBtnContainerEl
    ?.querySelectorAll<HTMLButtonElement>("button")
    .forEach((button: HTMLButtonElement) => (button.disabled = true));
};

/**
 * Creates four answers for answer buttons. 1 right and 3 wrong.
 */
const getAnswerButtonNames = function (): Student[] {
  questionButtonNames = [game.currentQuestion, ...getThreeRandomAnswers()];
  //Randomize button names
  questionButtonNames =
    gamestate.cloneAndShuffleArray<Student>(questionButtonNames);

  return questionButtonNames;
};

/**
 *Take game.currentQuestion and throw into an array with three randos
 * @returns Array with 3 wrong answers and 1 right.
 */

//  gamestate.getThreeRandomAnswers
// const getThreeRandomAnswers = function (): Student[] {
//   return cloneAndShuffleArray<Student>(game.filteredWrongStudents).slice(0, 3);
// };

const initPlayer = function () {
  // Create player id & name
  game.player.id = game.getLatestPlayerId() + 1;
  game.player.name = getPlayerNameFromLocalStorage();
  game.player.nbrOfQuestions = game.nbrOfQuestions;
};

/**
 * Make an array of wrong answers to choose from, filters out correct answer
 */
const makeWrongAnswersArray = function () {
  game.filteredWrongStudents = game.shuffledQuestions.filter(
    (student) => student.id !== game.currentQuestion.id
  );
};

const renderNewQuestion = function () {
  setCurrentStudent();
  makeWrongAnswersArray();
  addPhotoToPhotoContainer();

  //Inject buttons into DOM
  ui.questionBtnContainerEl!.innerHTML = renderFourQuestionButtons();
  //Hide next question button
  ui.nextQuestionBtnEl?.classList.add("d-none");
};

const renderFourQuestionButtons = function () {
  // Generate four buttons with answer alternatives
  return getAnswerButtonNames()
    .map(
      (student) =>
        `<button class="btn btn-warning btn-lg">${student.name}</button>`
    )
    .join("");
};

const renderQuestionScreen = function (): void {
  //Sets player name to stored player name
  ui.playerNameInputEl!.value = getPlayerNameFromLocalStorage();

  document.querySelector(".startPhotosContainer")!.innerHTML = students
    .map((student) => {
      return `
        <div class="card shadow-sm border-dark border-2" style="width: 6rem; height:10rem">
  <img src="${student.image}" class="card-img-top" alt="Images of students to guess the names of.">
  <div class="card-body">
    <h2 class="card-title text-center display-6 fw-bolder" style="height: 1.5rem;">?</h2>
  </div>
</div>
    `;
    })
    .join("");
};

export const restartGame = function () {
  game.restart();
  ui.showNoHighScoreEl?.classList.add("d-none");
  ui.endScreenEl?.classList.add("d-none");
  ui.startScreenContainerEl?.classList.remove("d-none");
  initPlayer();
};

const startGame = function () {
  const gamestate = new Gamestate();
  // Shuffles the student array to create random order on buttons
  game.shuffledQuestions = cloneAndShuffleArray<Student>(students);
  //Create an array with selected nbr of students
  game.nbrOfSelectedQuestions = game.shuffledQuestions.slice(
    0,
    game.nbrOfQuestions
  );

  updateScoreDisplay(game.isCurrentAnswerCorrect && game.nbrOfRightAnswers > 0);

  // Trigger view transition on game start if supported
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      // Hide startscreen
      ui.startScreenContainerEl?.classList.add("d-none");

      // Show questionScreen
      ui.questionScreenContainerEl?.classList.remove("d-none");

      // Render the questionPage content
      renderNewQuestion();
    });
  } else {
    ui.startScreenContainerEl?.classList.add("d-none");
    // Show questionScreen
    ui.questionScreenContainerEl?.classList.remove("d-none");
    // Render the questionPage content
    renderNewQuestion();
  }
};

/**
 * Creates current right answer from first index of game.nbrOfSelectedQuestions array.
 */
const setCurrentStudent = function () {
  game.currentQuestion = game.nbrOfSelectedQuestions[0]!;
};

/**
 * Fires score animation if user scored a point
 * @param {boolean} shouldAnimate
 */
const updateScoreDisplay = function (shouldAnimate: boolean = false) {
  if (ui.questionBoardEl) {
    ui.questionBoardEl.innerHTML = `<span class="nbrOfQuestions d-inline-block">${game.currentQuestionNbr}/${game.nbrOfQuestions}</span>`;
  }

  if (ui.pointsEl) {
    ui.pointsEl.innerHTML = `<span class="points d-inline-block fw-bold">${game.nbrOfRightAnswers}/${game.nbrOfQuestions}</span>`;
  }

  if (shouldAnimate && ui.pointsEl) {
    ui.pointsEl.classList.add("addScoreAnimation");
    ui.pointsEl.addEventListener(
      "animationend",
      () => {
        ui.pointsEl?.classList.remove("addScoreAnimation");
      },
      { once: true }
    );
  }
};

const handleAnswer = function (button: HTMLButtonElement) {
  if (game.currentQuestion.name === button.textContent) {
    button.classList.add("btn-success");
    button.classList.remove("btn-warning");
    game.rightAnswersArr.push(game.currentQuestion);
    game.isCurrentAnswerCorrect = true;
  } else {
    button.classList.add("btn-danger");
    button.classList.remove("btn-warning");
    game.wrongAnswersArr.push(game.currentQuestion);
    game.isCurrentAnswerCorrect = false;
  }
  disableAllQuestionButtons();
  ui.nextQuestionBtnEl?.classList.remove("d-none");
  updateScoreDisplay(game.isCurrentAnswerCorrect && game.nbrOfRightAnswers > 0);
};

const handleNextQuestion = function () {
  game.nbrOfSelectedQuestions.shift();
  game.currentQuestionNbr++;
  updateScoreDisplay();

  if (game.nbrOfSelectedQuestions.length > 0) {
    document.startViewTransition
      ? document.startViewTransition(() => renderNewQuestion())
      : renderNewQuestion();
  } else {
    ui.nextQuestionBtnEl?.classList.add("d-none");
    ui.questionScreenContainerEl?.classList.add("d-none");
    renderEndScreen();
  }
};

const handleStartGame = function (button: HTMLButtonElement) {
  if (button.textContent?.includes("5")) {
    game.nbrOfQuestions = 5;
  } else if (button.textContent?.includes("10")) {
    game.nbrOfQuestions = 10;
  } else if (button.textContent?.includes("ALL")) {
    game.nbrOfQuestions = students.length;
  }
  initPlayer();
  startGame();
};

/* **************** EVENT HANDLERS  ****************** */

// --- Hanterar alla klick på startskärmen ---
ui.startScreenContainerEl?.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  const button = target.closest("button");

  if (!button) return; // Klickade inte på en knapp

  // Kollar om knappen är en av startknapparna
  if (button.parentElement === ui.nbrQuestionsContainerEl) {
    handleStartGame(button);
  }
});

// --- Hanterar alla klick på frågeskärmen ---
ui.questionScreenContainerEl?.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  const button = target.closest("button");

  if (!button) return; // Klickade inte på en knapp

  // Är det "Next Question"-knappen?
  if (button.classList.contains("nextQuestionBtn")) {
    handleNextQuestion();
    return;
  }

  // Är det en svarsknapp? (Antar att bara svarsknappar och next-knappen finns)
  if (!button.disabled) {
    handleAnswer(button);
  }
});

// --- Övriga lyssnare som inte är klick ---
ui.playerNameInputEl?.addEventListener("input", (e) => {
  setPlayerNameToLocalStorage((e.target as HTMLInputElement)!.value);
});

// --- Animation Listener (endast en, på rätt element) ---
ui.pointsEl?.addEventListener("animationend", () => {
  ui.pointsEl?.classList.remove("addScoreAnimation");
});

/* **************** INITIALIZATION ****************** */
renderQuestionScreen(); // Renderar den initiala vyn
