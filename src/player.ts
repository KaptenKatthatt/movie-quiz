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

//Deprecated? Same as resetPlayerAnswers?
// export const resetPlayerScore = () => {
//   const currentPlayer = getPlayer();
//   const updatedPlayer = { ...currentPlayer, answers: [] };
//   updatePlayer(updatedPlayer);
// };

export const incrementScoreByOne = () => {
  const currentPlayer = getPlayer();
  const updatedPlayer = { ...currentPlayer, score: currentPlayer.score + 1 };
  updatePlayer(updatedPlayer);
};

export const getNumberOfQuestions = () => {
  const currentPlayer = getPlayer();
  return currentPlayer.nbrOfQuestions;
};

export const setNumberOfQuestions = (numberOfQuestions: number) => {
  const currentPlayer = getPlayer();
  const updatedPlayer = { ...currentPlayer, nbrOfQuestions: numberOfQuestions };
  updatePlayer(updatedPlayer);
  return updatedPlayer;
};

// export const getPlayerId = (currentPlayer: Player) => {
//   return currentPlayer.id;
// };

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
