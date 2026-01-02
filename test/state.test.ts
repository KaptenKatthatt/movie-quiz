import { describe, it, expect, beforeEach } from "vitest";
import { movies } from "../src/data/movies";
import {
  addRightAnswer,
  addWrongAnswer,
  getPlayer,
  updatePlayer,
} from "../src/state";
import type { Player } from "../src/types";

const emptyPlayer: Player = {
  id: 0,
  score: 0,
  name: "",
  nbrOfQuestions: 0,
  rightAnswersArr: [] as any[],
  wrongAnswersArr: [] as any[],
};

beforeEach(() => {
  // reset player to known state before each test
  updatePlayer({ ...emptyPlayer });
});

describe("state: addRightAnswer / addWrongAnswer", () => {
  it("addRightAnswer immutably adds a movie and returns the updated player", () => {
    const initial = getPlayer();
    expect(initial.rightAnswersArr).toHaveLength(0);

    const movie = movies[0];
    const updated = addRightAnswer(movie);

    expect(updated.rightAnswersArr).toHaveLength(1);
    expect(updated.rightAnswersArr[0]).toBe(movie);
    expect(getPlayer().rightAnswersArr).toHaveLength(1);
    expect(initial.rightAnswersArr).toHaveLength(0);
    expect(initial.rightAnswersArr).not.toBe(updated.rightAnswersArr);
  });

  it("addWrongAnswer immutably adds a movie and returns the updated player", () => {
    const initial = getPlayer();
    const movie = movies[1];
    const updated = addWrongAnswer(movie);

    expect(updated.wrongAnswersArr).toHaveLength(1);
    expect(updated.wrongAnswersArr[0]).toBe(movie);
    expect(getPlayer().wrongAnswersArr).toHaveLength(1);
    expect(initial.wrongAnswersArr).toHaveLength(0);
    expect(initial.wrongAnswersArr).not.toBe(updated.wrongAnswersArr);
  });
});
