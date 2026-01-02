import type { Answer, Player } from "./types";

//A single object to bind them all
export type HighScoreList = Player[];
export const DEFAULT_HIGH_SCORE_LIST = [
  {
    id: 1,
    score: 10,
    nbrOfQuestions: 10,
    name: "J.O",
    answers: [] as Answer[],
  },
  {
    id: 2,
    score: 9,
    nbrOfQuestions: 10,
    name: "J.O",
    answers: [] as Answer[],
  },
  {
    id: 3,
    score: 8,
    nbrOfQuestions: 10,
    name: "J.O",
    answers: [] as Answer[],
  },
  {
    id: 4,
    score: 7,
    nbrOfQuestions: 10,
    name: "J.O",
    answers: [] as Answer[],
  },
  {
    id: 5,
    score: 6,
    nbrOfQuestions: 10,
    name: "J.O",
    answers: [] as Answer[],
  },
  {
    id: 6,
    score: 5,
    nbrOfQuestions: 10,
    name: "J.O",
    answers: [] as Answer[],
  },
  {
    id: 7,
    score: 4,
    nbrOfQuestions: 10,
    name: "J.O",
    answers: [] as Answer[],
  },
  {
    id: 8,
    score: 3,
    nbrOfQuestions: 10,
    name: "J.O",
    answers: [] as Answer[],
  },
  {
    id: 9,
    score: 2,
    nbrOfQuestions: 10,
    name: "J.O",
    answers: [] as Answer[],
  },
  {
    id: 10,
    score: 0,
    nbrOfQuestions: 10,
    name: "J.O",
    answers: [] as Answer[],
  },
];
export const getDefaultHighScoreList = () => {
  return [...DEFAULT_HIGH_SCORE_LIST];
};
