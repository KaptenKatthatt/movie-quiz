import type { Movie } from "./data/movies";
import type { Player } from "./types";

export const getLowestHighScore = (highScoreList: Player[]) => {
  return Math.min(
    ...highScoreList.map((highScorePlayer: Player) => highScorePlayer.score)
  );
};
export const removeLowestHighScore = (highScoreList: Player[]) => {
  highScoreList.sort((a, b) => b.score - a.score);
  highScoreList.pop();
  return highScoreList;
};

export const sortHighScoreList = (highScoreList: Player[]) => {
  return highScoreList.sort((a, b) => b.score - a.score);
};

export const getLatestPlayerId = (highScoreList: Player[]) => {
  return Math.max(
    ...highScoreList.map((highScorePlayer) => highScorePlayer.id)
  );
};

export const highScoreList = [
  {
    id: 1,
    score: 10,
    nbrOfQuestions: 10,
    name: "J.O",
    rightAnswersArr: [] as Movie[],
    wrongAnswersArr: [] as Movie[],
  },
  {
    id: 2,
    score: 9,
    nbrOfQuestions: 10,
    name: "J.O",
    rightAnswersArr: [] as Movie[],
    wrongAnswersArr: [] as Movie[],
  },
  {
    id: 3,
    score: 8,
    nbrOfQuestions: 10,
    name: "J.O",
    rightAnswersArr: [] as Movie[],
    wrongAnswersArr: [] as Movie[],
  },
  {
    id: 4,
    score: 7,
    nbrOfQuestions: 10,
    name: "J.O",
    rightAnswersArr: [] as Movie[],
    wrongAnswersArr: [] as Movie[],
  },
  {
    id: 5,
    score: 6,
    nbrOfQuestions: 10,
    name: "J.O",
    rightAnswersArr: [] as Movie[],
    wrongAnswersArr: [] as Movie[],
  },
  {
    id: 6,
    score: 5,
    nbrOfQuestions: 10,
    name: "J.O",
    rightAnswersArr: [] as Movie[],
    wrongAnswersArr: [] as Movie[],
  },
  {
    id: 7,
    score: 4,
    nbrOfQuestions: 10,
    name: "J.O",
    rightAnswersArr: [] as Movie[],
    wrongAnswersArr: [] as Movie[],
  },
  {
    id: 8,
    score: 3,
    nbrOfQuestions: 10,
    name: "J.O",
    rightAnswersArr: [] as Movie[],
    wrongAnswersArr: [] as Movie[],
  },
  {
    id: 9,
    score: 2,
    nbrOfQuestions: 10,
    name: "J.O",
    rightAnswersArr: [] as Movie[],
    wrongAnswersArr: [] as Movie[],
  },
  {
    id: 10,
    score: 0,
    nbrOfQuestions: 10,
    name: "J.O",
    rightAnswersArr: [] as Movie[],
    wrongAnswersArr: [] as Movie[],
  },
];
