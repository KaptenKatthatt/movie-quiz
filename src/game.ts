import { movies } from "./data/movies";
import {
  cloneAndShuffleArray,
  renderNewQuestion,
  updateScoreDisplay,
} from "./main";
import { getNumberOfQuestions, getPlayerScore, initPlayer } from "./player";
import {
  getPlayer,
  game,
  updatePlayer,
  resetQuestionNbr,
  setIsCurrentAnswerCorrect,
} from "./state";
import { ui } from "./ui";

export const getNbrOfWrongAnswers = () => {
  const currentPlayer = getPlayer();
  const wrongAnswers = currentPlayer.answers.filter(
    (answer) => !answer.isCorrect
  );
  return wrongAnswers.length;
};

export const getThreeRandomAnswers = () => {
  return cloneAndShuffleArray(game.filteredWrongMovies).slice(0, 3);
};

export const resetPlayerAnswers = () => {
  const updatedPlayer = { ...getPlayer(), answers: [] };
  updatePlayer(updatedPlayer);
};

export const restartGame = function () {
  resetPlayerAnswers();
  setIsCurrentAnswerCorrect(false);
  resetQuestionNbr();
  initPlayer();

  ui.endScreen.highScoreListEl!.innerHTML = "";
  ui.endScreen.showNoHighScoreEl!.classList.add("d-none");
  ui.endScreen.endScreenEl!.classList.add("d-none");
  ui.startScreen.startScreenContainerEl!.classList.remove("d-none");
};

export const startGame = () => {
  // Shuffles the movie array to create random order on buttons
  game.shuffledQuestions = cloneAndShuffleArray(movies);
  //Create an array with selected nbr of movies
  game.selectedQuestionsArray = game.shuffledQuestions.slice(
    0,
    getNumberOfQuestions()
  );

  updateScoreDisplay(game.isCurrentAnswerCorrect && getPlayerScore() > 0);

  // Trigger view transition on game start if supported
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      // Hide startscreen
      ui.startScreen.startScreenContainerEl.classList.add("d-none");

      // Show questionScreen
      ui.questionScreen.questionScreenContainerEl.classList.remove("d-none");

      // Render the questionPage content
      renderNewQuestion();
    });
  } else {
    ui.startScreen.startScreenContainerEl.classList.add("d-none");
    // Show questionScreen
    ui.questionScreen.questionScreenContainerEl.classList.remove("d-none");
    // Render the questionPage content
    renderNewQuestion();
  }
};
