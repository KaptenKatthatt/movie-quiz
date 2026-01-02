import { getLatestPlayerId } from "./highscorelist";
import { getPlayer, updatePlayer } from "./state";
import { getPlayerNameFromLocalStorage } from "./storage";

export const getPlayerScore = () => {
  const currentPlayer = getPlayer();
  const currentScore = currentPlayer.answers.filter(
    (answer) => answer.isCorrect
  ).length;
  return currentScore;
};

export const getNumberOfQuestions = () => {
  const currentPlayer = getPlayer();
  return currentPlayer.nbrOfQuestions;
};

export const getPlayerName = () => {
  const currentPlayer = getPlayer();
  return currentPlayer.name;
};
export const initPlayer = function () {
  const currentPlayer = getPlayer();
  const newPlayer = {
    ...currentPlayer,
    id: getLatestPlayerId() + 1,
    name: getPlayerNameFromLocalStorage() || "someDude",
  };
  updatePlayer(newPlayer);
};
export const setNbrOfQuestions = (nbrOfQuestions: number) => {
  const updatedPlayer = {
    ...getPlayer(),
    nbrOfQuestions: nbrOfQuestions,
  };
  updatePlayer(updatedPlayer);
};
