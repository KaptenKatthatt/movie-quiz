import { getLatestPlayerId } from "./highscorelist";
import { getPlayer, updatePlayer } from "./state";
import { getHighScoreList, getPlayerNameFromLocalStorage } from "./storage";
import { type Player } from "./types";

export const getPlayerScore = () => {
  return getPlayer().score;
};

export const resetPlayerScore = (currentPlayer: Player): Player => {
  return { ...currentPlayer, score: 0 };
};

export const incrementScoreByOne = () => {
  const currentPlayer = getPlayer();
  const updatedPlayer = { ...currentPlayer, score: currentPlayer.score + 1 };
  updatePlayer(updatedPlayer);
};

export const getNumberOfQuestions = (currentPlayer: Player) => {
  return currentPlayer.nbrOfQuestions;
};

export const setNumberOfQuestions = (
  currentPlayer: Player,
  numberOfQuestions: number
) => {
  return { ...currentPlayer, nbrOfQuestions: numberOfQuestions };
};

export const getPlayerId = (currentPlayer: Player) => {
  return currentPlayer.id;
};

export const getPlayerName = (currentPlayer: Player) => {
  return currentPlayer.name;
};
export const initPlayer = function () {
  const currentPlayer = getPlayer();
  const newPlayer = {
    ...currentPlayer,
    id: getLatestPlayerId(getHighScoreList()) + 1,
    name: getPlayerNameFromLocalStorage() || "someDude",
  };
  updatePlayer(newPlayer);
};
