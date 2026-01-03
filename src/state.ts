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
  selectedQuestionsArray: [], //Movie array sliced to nbr of selected guesses
  nbrOfQuestions: 0,
  currentQuestionNbr: 1,
  isCurrentAnswerCorrect: false,
  currentQuestion: [],
};

export const getPlayer = () => player;

export const increasePlayerScore = () => {
  const updatedPlayer = getPlayer();
  updatedPlayer.score++;
  updatePlayer(updatedPlayer);
};

export const makeWrongAnswersArray = () => {
  game.filteredWrongMovies = game.shuffledQuestions.filter(
    (movie: Movie) => movie.id !== game.currentQuestion[0].id
  );
};

export const resetQuestionNbr = () => {
  game.currentQuestionNbr = 1;
};

export const saveAnswer = (movie: Movie, isCorrect: boolean) => {
  const currentPlayer = getPlayer();
  const updatedPlayer = {
    ...currentPlayer,
    answers: [...currentPlayer.answers, { movie: movie, isCorrect: isCorrect }],
  };
  updatePlayer(updatedPlayer);
};

export const setIsCurrentAnswerCorrect = (isCorrect: boolean) => {
  game.isCurrentAnswerCorrect = isCorrect;
  return game.isCurrentAnswerCorrect;
};

export const setRightAnswer = () => {
  game.currentQuestion[0] = game.selectedQuestionsArray[0];
};

export const updateCurrentQuestionNbr = () => {
  game.currentQuestionNbr++;
};

export const updatePlayer = (currentPlayer: Player) => {
  player = { ...currentPlayer };
};
