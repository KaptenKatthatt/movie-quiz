"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restartGame = void 0;
const endScreen_1 = require("./endScreen");
const students_1 = require("./students");
const storage_1 = require("./storage");
const constants_1 = require("./constants");
/* **************** VARIABLES****************** */
let questionButtonNames = []; //The four names on the question buttons
/* **************** FUNCTIONS****************** */
const addPhotoToPhotoContainer = function () {
    // Add image to game.currentQuestion from students array
    constants_1.ui.photoContainerEl.src = constants_1.game.currentQuestion.image;
};
// Fisher-Yates algoritm for array shuffling to the rescue! 🤩
const cloneAndShuffleArray = function (array) {
    const shuffledArrayClone = [...array];
    for (let i = shuffledArrayClone.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = shuffledArrayClone[i];
        shuffledArrayClone[i] = shuffledArrayClone[j];
        shuffledArrayClone[j] = temp;
    }
    return shuffledArrayClone;
};
/**
Disables question buttons from being clicked twice
 *
 */
const disableAllQuestionButtons = function () {
    constants_1.ui.questionBtnContainerEl?.querySelectorAll("button")
        .forEach((button) => (button.disabled = true));
};
/**
 * Creates four answers for answer buttons. 1 right and 3 wrong.
 */
const getAnswerButtonNames = function () {
    questionButtonNames = [constants_1.game.currentQuestion, ...getThreeRandomAnswers()];
    //Randomize button names
    questionButtonNames = cloneAndShuffleArray(questionButtonNames);
    return questionButtonNames;
};
/**
 *Take game.currentQuestion and throw into an array with three randos
 * @returns Array with 3 wrong answers and 1 right.
 */
const getThreeRandomAnswers = function () {
    return cloneAndShuffleArray(constants_1.game.filteredWrongStudents).slice(0, 3);
};
const initPlayer = function () {
    // Create player id & name
    constants_1.game.player.id = constants_1.game.getLatestPlayerId() + 1;
    constants_1.game.player.name = (0, storage_1.getPlayerNameFromLocalStorage)();
    constants_1.game.player.nbrOfQuestions = constants_1.game.nbrOfQuestions;
};
/**
 * Make an array of wrong answers to choose from, filters out correct answer
 */
const makeWrongAnswersArray = function () {
    constants_1.game.filteredWrongStudents = constants_1.game.shuffledQuestions.filter((student) => student.id !== constants_1.game.currentQuestion.id);
};
const renderNewQuestion = function () {
    setCurrentStudent();
    makeWrongAnswersArray();
    addPhotoToPhotoContainer();
    //Inject buttons into DOM
    constants_1.ui.questionBtnContainerEl.innerHTML = renderFourQuestionButtons();
    //Hide next question button
    constants_1.ui.nextQuestionBtnEl?.classList.add("d-none");
};
const renderFourQuestionButtons = function () {
    // Generate four buttons with answer alternatives
    return getAnswerButtonNames()
        .map((student) => `<button class="btn btn-warning btn-lg">${student.name}</button>`)
        .join("");
};
const renderQuestionScreen = function () {
    //Sets player name to stored player name
    constants_1.ui.playerNameInputEl.value = (0, storage_1.getPlayerNameFromLocalStorage)();
    document.querySelector(".startPhotosContainer").innerHTML = students_1.students
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
const restartGame = function () {
    constants_1.game.restart();
    constants_1.ui.showNoHighScoreEl?.classList.add("d-none");
    constants_1.ui.endScreenEl?.classList.add("d-none");
    constants_1.ui.startScreenContainerEl?.classList.remove("d-none");
    initPlayer();
};
exports.restartGame = restartGame;
const startGame = function () {
    // Shuffles the student array to create random order on buttons
    constants_1.game.shuffledQuestions = cloneAndShuffleArray(students_1.students);
    //Create an array with selected nbr of students
    constants_1.game.nbrOfSelectedQuestions = constants_1.game.shuffledQuestions.slice(0, constants_1.game.nbrOfQuestions);
    updateScoreDisplay(constants_1.game.isCurrentAnswerCorrect && constants_1.game.nbrOfRightAnswers > 0);
    // Trigger view transition on game start if supported
    if (document.startViewTransition) {
        document.startViewTransition(() => {
            // Hide startscreen
            constants_1.ui.startScreenContainerEl?.classList.add("d-none");
            // Show questionScreen
            constants_1.ui.questionScreenContainerEl?.classList.remove("d-none");
            // Render the questionPage content
            renderNewQuestion();
        });
    }
    else {
        constants_1.ui.startScreenContainerEl?.classList.add("d-none");
        // Show questionScreen
        constants_1.ui.questionScreenContainerEl?.classList.remove("d-none");
        // Render the questionPage content
        renderNewQuestion();
    }
};
/**
 * Creates current right answer from first index of game.nbrOfSelectedQuestions array.
 */
const setCurrentStudent = function () {
    constants_1.game.currentQuestion = constants_1.game.nbrOfSelectedQuestions[0];
};
/**
 * Fires score animation if user scored a point
 * @param {boolean} shouldAnimate
 */
const updateScoreDisplay = function (shouldAnimate = false) {
    if (constants_1.ui.questionBoardEl) {
        constants_1.ui.questionBoardEl.innerHTML = `<span class="nbrOfQuestions d-inline-block">${constants_1.game.currentQuestionNbr}/${constants_1.game.nbrOfQuestions}</span>`;
    }
    if (constants_1.ui.pointsEl) {
        constants_1.ui.pointsEl.innerHTML = `<span class="points d-inline-block fw-bold">${constants_1.game.nbrOfRightAnswers}/${constants_1.game.nbrOfQuestions}</span>`;
    }
    if (shouldAnimate && constants_1.ui.pointsEl) {
        constants_1.ui.pointsEl.classList.add("addScoreAnimation");
        constants_1.ui.pointsEl.addEventListener("animationend", () => {
            constants_1.ui.pointsEl?.classList.remove("addScoreAnimation");
        }, { once: true });
    }
};
/* **************** EVENT LISTENERS****************** */
constants_1.ui.playerNameInputEl?.addEventListener("input", (e) => {
    (0, storage_1.setPlayerNameToLocalStorage)(e.target?.value);
});
// Check if answer is correct, then set button to green, else red. Show nextQuestionBtn when clicked.
constants_1.ui.questionScreenContainerEl?.addEventListener("click", (e) => {
    const button = e.target;
    if (button?.tagName === "BUTTON" &&
        button?.textContent !== "Next question") {
        if (constants_1.game.currentQuestion.name === button?.textContent) {
            button?.classList.add("btn-success");
            button?.classList.remove("btn-warning");
            constants_1.game.rightAnswersArr.push(constants_1.game.currentQuestion);
            constants_1.game.isCurrentAnswerCorrect = true;
        }
        else if (constants_1.game.currentQuestion.name !== button.textContent) {
            button?.classList.add("btn-danger");
            button?.classList.remove("btn-warning");
            constants_1.game.wrongAnswersArr.push(constants_1.game.currentQuestion);
            constants_1.game.isCurrentAnswerCorrect = false;
        }
        disableAllQuestionButtons();
        //Show nextQuestionBtn
        constants_1.ui.nextQuestionBtnEl?.classList.remove("d-none");
        updateScoreDisplay(constants_1.game.isCurrentAnswerCorrect && constants_1.game.nbrOfRightAnswers > 0);
    }
});
constants_1.ui.nextQuestionBtnEl?.addEventListener("click", () => {
    constants_1.game.nbrOfSelectedQuestions.shift();
    constants_1.game.currentQuestionNbr++;
    updateScoreDisplay();
    // Checks if there is any students left to question about
    if (constants_1.game.nbrOfSelectedQuestions.length > 0) {
        document.startViewTransition //Checks if view transition is supported, if not skip it.
            ? document.startViewTransition(() => {
                renderNewQuestion();
            })
            : renderNewQuestion();
    }
    else {
        // Game is over, go to endScreen
        //Hide question screen
        constants_1.ui.nextQuestionBtnEl?.classList.add("d-none");
        constants_1.ui.questionScreenContainerEl?.classList.add("d-none");
        (0, endScreen_1.renderEndScreen)();
    }
});
/* **************** GAME START****************** */
//Listen for nbr of questions selected and start game
constants_1.ui.startBtnContainerEl?.addEventListener("click", (e) => {
    const button = e.target;
    if (button?.tagName === "BUTTON") {
        if (button?.textContent.includes("5")) {
            constants_1.game.nbrOfQuestions = 5;
        }
        else if (button.textContent.includes("10")) {
            constants_1.game.nbrOfQuestions = 10;
        }
        else if (button.textContent.includes("ALL")) {
            constants_1.game.nbrOfQuestions = students_1.students.length;
        }
        startGame();
        initPlayer();
    }
});
//Render initial game screen
renderQuestionScreen();
//# sourceMappingURL=main.js.map