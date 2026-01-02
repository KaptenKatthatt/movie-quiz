import type { Movie } from "./data/movies";
import type { Player } from "./types";

/* **************** PLAYER AND GAME STATE ****************** */
let player: Player = {
  id: 0,
  score: 0,
  name: "",
  nbrOfQuestions: 0,
  rightAnswersArr: [] as Movie[],
  wrongAnswersArr: [] as Movie[],
};

export const game = {
  filteredWrongMovies: [] as Movie[], //Movie array with correct answer filtered out
  shuffledQuestions: [] as Movie[], //All movies shuffled
  nbrOfSelectedQuestions: [] as Movie[], //Movie array sliced to nbr of selected guesses
  nbrOfQuestions: 0,
  currentQuestionNbr: 1,
  isCurrentAnswerCorrect: false,

  currentQuestion: [] as Movie[], //Current question
};

export const updatePlayer = (currentPlayer: Player) => {
  player = { ...currentPlayer };
};
export const getPlayer = () => player;

export const addRightAnswer = (currentMovie: Movie) => {
  const currentPlayer = getPlayer();
  updatePlayer({
    ...currentPlayer,
    rightAnswersArr: [...currentPlayer.rightAnswersArr, currentMovie],
  });
};

export const addWrongAnswer = (currentMovie: Movie) => {
  const currentPlayer = getPlayer();
  updatePlayer({
    ...currentPlayer,
    wrongAnswersArr: [...currentPlayer.wrongAnswersArr, currentMovie],
  });
};
