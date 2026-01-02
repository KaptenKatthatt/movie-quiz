import { movies } from "./data/movies";
import {
  cloneAndShuffleArray,
  updateScoreDisplay,
  renderNewQuestion,
} from "./main";
import { getPlayerScore, initPlayer } from "./player";
import { getPlayer, game, updatePlayer } from "./state";
import type { Player } from "./types";
import { ui } from "./ui";

export const getNbrOfWrong = () => {
  const currentPlayer = getPlayer();
  const wrongAnswers = currentPlayer.answers.filter(
    (answer) => !answer.isCorrect
  );
  return wrongAnswers.length;
};

export const resetPlayerInfo = () => {
  resetPlayerAnswers();
};

//Deprecated, use resetPlayerAnswers instead
export const resetPlayerAnswers = () => {
  const currentPlayer = getPlayer();
  const resetPlayer: Player = { ...currentPlayer };
  const updatedPlayer = { ...resetPlayer, answers: [] };
  updatePlayer(updatedPlayer);
  return updatedPlayer;
};
export const restartGame = function () {
  resetPlayerInfo();
  game.isCurrentAnswerCorrect = false;

  ui.endScreen.highScoreListEl!.innerHTML = "";

  game.currentQuestionNbr = 1;

  ui.endScreen.showNoHighScoreEl!.classList.add("d-none");
  ui.endScreen.endScreenEl!.classList.add("d-none");
  ui.startScreen.startScreenContainerEl!.classList.remove("d-none");
  initPlayer();
};
export const startGame = (nbrOfSelectedQuestions: number) => {
  // Shuffles the movie array to create random order on buttons
  game.shuffledQuestions = cloneAndShuffleArray(movies);
  //Create an array with selected nbr of movies
  game.nbrOfSelectedQuestions = game.shuffledQuestions.slice(
    0,
    nbrOfSelectedQuestions
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
