import { describe, it, expect, beforeEach } from "vitest";
import { movies } from "../src/data/movies";
import {
  saveAnswer,
  getPlayer,
  updatePlayer,
  increasePlayerScore,
} from "../src/state";
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
    saveAnswer(movie, true);
    const updated = getPlayer();

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
    saveAnswer(movie, false);
    const updated = getPlayer();

    expect(updated.answers).toHaveLength(1);
    expect(updated.answers[0].movie).toBe(movie);
    expect(updated.answers[0].isCorrect).toBe(false);
    expect(getPlayer().answers).toHaveLength(1);
    expect(initial.answers).toHaveLength(0);
    expect(initial.answers).not.toBe(updated.answers);
  });

  it("increasePlayerScore increments player.score", () => {
    const initial = getPlayer();
    expect(initial.score).toBe(0);

    increasePlayerScore();
    const updated = getPlayer();

    expect(updated.score).toBe(1);
  });

  it("game can be played multiple times; state is reset between rounds", () => {
    for (let run = 0; run < 2; run++) {
      // simulate start of a new game
      updatePlayer({ ...emptyPlayer });

      const initial = getPlayer();
      expect(initial.answers).toHaveLength(0);
      expect(initial.score).toBe(0);

      const movie = movies[run];
      saveAnswer(movie, true);
      increasePlayerScore();

      const updated = getPlayer();
      expect(updated.answers).toHaveLength(1);
      expect(updated.answers[0].movie).toBe(movie);
      expect(updated.score).toBe(1);
    }
  });
});
