import type { GameState } from "./types";
import type { Movie } from "./types";
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

export const addRightAnswer = (currentMovie: Movie) => {
  const currentPlayer = getPlayer();
  const updatedPlayer = {
    ...currentPlayer,
    rightAnswersArr: [...currentPlayer.rightAnswersArr, currentMovie],
  };
  updatePlayer(updatedPlayer);
  return updatedPlayer;
};

export const addWrongAnswer = (currentMovie: Movie) => {
  const currentPlayer = getPlayer();
  const updatedPlayer = {
    ...currentPlayer,
    wrongAnswersArr: [...currentPlayer.wrongAnswersArr, currentMovie],
  };
  updatePlayer(updatedPlayer);
  return updatedPlayer;
};

export const isCurrentAnswerCorrect = (isCorrect: boolean) => {
  game.isCurrentAnswerCorrect = isCorrect;
  return game.isCurrentAnswerCorrect;
};
