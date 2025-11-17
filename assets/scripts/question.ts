export class Question {
  isCorrect = false;
  actorName = "";
  movieName = "";

  constructor(actorName: string, movieName: string, isCorrect: boolean) {
    this.actorName = actorName;
    this.movieName = movieName;
  }
}
