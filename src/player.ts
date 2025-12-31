import { getLatestPlayerId } from "./highscorelist";
import { getPlayer, updatePlayer } from "./state";
import { getHighScoreList, getPlayerNameFromLocalStorage } from "./storage";
import { type Player } from "./types";

export const getPlayerScore = (currentPlayer: Player) => {
  return currentPlayer.score;
};

export const resetPlayerScore = (currentPlayer: Player): Player => {
  return { ...currentPlayer, score: 0 };
};

export const incrementScoreByOne = (currentPlayer: Player) => {
  return { ...currentPlayer, score: currentPlayer.score + 1 };
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
  return { ...currentPlayer }.id;
};

export const getPlayerName = (currentPlayer: Player) => {
  return { ...currentPlayer }.name;
};
export const initPlayer = function () {
  // Create player id & name
  const newPlayer = getPlayer();
  newPlayer.id = getLatestPlayerId(getHighScoreList()) + 1;
  newPlayer.name = getPlayerNameFromLocalStorage() || "someDude";
  updatePlayer(newPlayer);
};
