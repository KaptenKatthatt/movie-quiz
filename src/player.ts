import { player } from "./constants";

export const getPlayerScore = () => {
  return player.score;
};

export const setPlayerScore = (score: number) => {
  player.score = score;
};
export const incrementScoreByOne = () => {
  player.score++;
};

export const getNumberOfQuestions = () => {
  return player.nbrOfQuestions;
};
export const setNumberOfQuestions = (numberOfQuestions: number) => {
  player.nbrOfQuestions = numberOfQuestions;
};
