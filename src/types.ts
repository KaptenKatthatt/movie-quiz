export interface Player {
  id: number;
  score: number;
  name: string;
  nbrOfQuestions: number;
  rightAnswersArr: Movie[];
  wrongAnswersArr: Movie[];
  answers: Answer[];
}
export interface GameState {
  filteredWrongMovies: Movie[]; //Movie array with correct answer filtered out
  shuffledQuestions: Movie[]; //All movies shuffled
  nbrOfSelectedQuestions: Movie[]; //Movie array sliced to nbr of selected guesses
  nbrOfQuestions: number;
  currentQuestionNbr: number;
  isCurrentAnswerCorrect: boolean;
  currentQuestion: Movie[];
}
export interface Movie {
  id: number;
  name: string;
  image: string;
}

export interface Answer {
  movie: Movie;
  isCorrect: boolean;
}
