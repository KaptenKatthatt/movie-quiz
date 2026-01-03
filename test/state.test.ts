import { describe, it, expect, beforeEach } from "vitest";
import { movies, type Movie } from "../src/data/movies";
import { saveAnswer, getPlayer, updatePlayer } from "../src/state";
import type { Player } from "../src/types";

const emptyPlayer: Player = {
  id: 0,
  score: 0,
  name: "",
  nbrOfQuestions: 0,
  answers: [],
};

beforeEach(() => {
  // reset player to known state before each test
  updatePlayer({ ...emptyPlayer });
});

describe("state: addRightAnswer / addWrongAnswer", () => {
  it("saveAnswer immutably adds a correct answer and returns the updated player", () => {
    const initial = getPlayer();
    expect(initial.answers).toHaveLength(0);

    const movie = movies[0];
    const updated = saveAnswer(movie, true);

    expect(updated.answers).toHaveLength(1);
    expect(updated.answers[0].movie).toBe(movie);
    expect(updated.answers[0].isCorrect).toBe(true);
    expect(getPlayer().answers).toHaveLength(1);
    expect(initial.answers).toHaveLength(0);
    expect(initial.answers).not.toBe(updated.answers);
  });

  it("saveAnswer immutably adds an incorrect answer and returns the updated player", () => {
    const initial = getPlayer();
    const movie = movies[1];
    const updated = saveAnswer(movie, false);

    expect(updated.answers).toHaveLength(1);
    expect(updated.answers[0].movie).toBe(movie);
    expect(updated.answers[0].isCorrect).toBe(false);
    expect(getPlayer().answers).toHaveLength(1);
    expect(initial.answers).toHaveLength(0);
    expect(initial.answers).not.toBe(updated.answers);
  });
});
