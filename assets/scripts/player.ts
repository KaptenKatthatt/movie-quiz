import { HighScoreList } from "./highscorelist";

export class Player {
  id: number;
  name: string;
  score = 0;
  nbrOfQuestions = 0;
  rightAnswers = 0;
  wrongAnswers = 0;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
  setName(name: string): void {
    this.name = name;
  }
  setId() {
    const highestId = HighScoreList.getHighestPlayerId();
    this.id = highestId + 1;
  }
}
