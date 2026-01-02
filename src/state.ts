import type { GameState } from "./types";
import type { Movie } from "./types";
import type { Player } from "./types";

/* **************** PLAYER AND GAME STATE ****************** */
let player: Player = {
  id: 0,
  score: 0,
  name: "",
  nbrOfQuestions: 0,
  answers: [],
};

export const game: GameState = {
  filteredWrongMovies: [], //Movie array with correct answer filtered out
  shuffledQuestions: [], //All movies shuffled
  nbrOfSelectedQuestions: [], //Movie array sliced to nbr of selected guesses
  nbrOfQuestions: 0,
  currentQuestionNbr: 1,
  isCurrentAnswerCorrect: false,
  currentQuestion: [],
};

export const updatePlayer = (currentPlayer: Player) => {
  player = { ...currentPlayer };
};
export const getPlayer = () => player;

export const setIsCurrentAnswerCorrect = (isCorrect: boolean) => {
  game.isCurrentAnswerCorrect = isCorrect;
  return game.isCurrentAnswerCorrect;
};

export const saveAnswer = (movie: Movie, isCorrect: boolean) => {
  const currentPlayer = getPlayer();
  const updatedPlayer = {
    ...currentPlayer,
    answers: [...currentPlayer.answers, { movie: movie, isCorrect: isCorrect }],
  };
  updatePlayer(updatedPlayer);
};
