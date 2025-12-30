import { type Player } from "./types";
import { player } from "./main";

export const getPlayerScore = (player: Player) => {
  return player.score;
};

export const resetPlayerScore = (player: Player): Player => {
  return { ...player, score: 0 };
};

export const incrementScoreByOne = (player: Player) => {
  return { ...player, score: player.score + 1 };
};

export const getNumberOfQuestions = (player: Player) => {
  return player.nbrOfQuestions;
};
export const setNumberOfQuestions = (
  player: Player,
  numberOfQuestions: number
) => {
  // player.nbrOfQuestions = numberOfQuestions;
  return { ...player, nbrOfQuestions: numberOfQuestions };
};
