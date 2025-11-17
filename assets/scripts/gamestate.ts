import { Question } from "./question";

export class Gamestate {
  nbrOfSelectedQuestions = 0;
  filteredWrongQuestions = []; //Array with correct answer filtered out
  rightAnswers: Question[] = []; //All correctly answered questions
  wrongAnswers: Question[] = []; //All wrongly answered questions
  //shuffledQuestions: Question[]; //All questions shuffled

  // Fisher-Yates algoritm for array shuffling to the rescue! 🤩
  cloneAndShuffleArray = function <T>(array: T[]): T[] {
    const shuffledArrayClone = [...array];
    for (let i = shuffledArrayClone.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp: T = shuffledArrayClone[i]!;
      shuffledArrayClone[i] = shuffledArrayClone[j]!;
      shuffledArrayClone[j] = temp;
    }
    return shuffledArrayClone;
  };
  getThreeRandomAnswers = function (): Question[] {
    const threeRandomWrongAnswers = this.cloneAndShuffleArray(
      this.filteredWrongStudents
    ).slice(0, 3);
    return threeRandomWrongAnswers;
  };
}
