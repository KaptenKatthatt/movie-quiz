import { resetPlayerScore, setNumberOfQuestions } from "./player";
import type { Player } from "./types";

// export const getNbrOfCorrect = (currentPlayer: Player) => {
//   return currentPlayer.rightAnswersArr.length;
// };

export const getNbrOfWrong = (currentPlayer: Player) => {
  return currentPlayer.wrongAnswersArr.length;
};

export const resetPlayer = (currentPlayer: Player) => {
  let resetPlayer: Player = { ...currentPlayer };
  resetPlayer = resetPlayerAnswers(resetPlayer);
  resetPlayer = resetPlayerScore(resetPlayer);
  resetPlayer = setNumberOfQuestions(resetPlayer, 0);
  return resetPlayer;
};

export const resetPlayerAnswers = (currentPlayer: Player) => {
  const resetPlayer: Player = { ...currentPlayer };
  resetPlayer.rightAnswersArr = [];
  resetPlayer.wrongAnswersArr = [];
  return resetPlayer;
};
