import { resetPlayerScore, setNumberOfQuestions } from "./player";
import type { Player } from "./types";

export const getNbrOfWrong = (currentPlayer: Player) => {
  return currentPlayer.wrongAnswersArr.length;
};

export const resetPlayerInfo = (currentPlayer: Player) => {
  let updatedPlayer: Player = { ...currentPlayer };
  updatedPlayer = resetPlayerAnswers(updatedPlayer);
  updatedPlayer = resetPlayerScore(updatedPlayer);
  updatedPlayer = setNumberOfQuestions(updatedPlayer, 0);
  return updatedPlayer;
};

export const resetPlayerAnswers = (currentPlayer: Player) => {
  const resetPlayer: Player = { ...currentPlayer };
  resetPlayer.rightAnswersArr = [];
  resetPlayer.wrongAnswersArr = [];
  return resetPlayer;
};
