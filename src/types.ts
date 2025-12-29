import type { Movie } from "./data/movies";

export interface Player {
  id: number;
  score: number;
  name: string;
  nbrOfQuestions: number;
  rightAnswersArr: Movie[];
  wrongAnswersArr: Movie[];
}
