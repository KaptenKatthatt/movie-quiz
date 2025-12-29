import { type Player } from "./types";
import { player } from "./main";

export const getPlayerScore = (player: Player) => {
  return player.score;
};

export const resetPlayerScore = (player: Player): Player => {
  return { ...player, score: 0 };
};

export const incrementScoreByOne = (player: Player) => {
  // player.score++;
  return { ...player, score: player.score + 1 };
};

export const getNumberOfQuestions = () => {
  return player.nbrOfQuestions;
};
export const setNumberOfQuestions = (numberOfQuestions: number) => {
  player.nbrOfQuestions = numberOfQuestions;
};
