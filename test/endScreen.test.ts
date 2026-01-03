import { describe, it, expect, beforeEach } from "vitest";
import { movies } from "../src/data/movies";
import {
  getHighScoreList,
  setHighScoreListToLocalStorage,
} from "../src/storage";
import { getDefaultHighScoreList } from "../src/constants";
import { updatePlayer } from "../src/state";

// Ensure a minimal `document` and `localStorage` exist before importing modules that access them
(globalThis as any).document = (globalThis as any).document || {
  querySelector: (selector: string) => {
    return {
      classList: { add: () => {}, remove: () => {}, contains: () => false },
      addEventListener: () => {},
      innerHTML: "",
      innerText: "",
      value: "",
      src: "",
      disabled: false,
      querySelectorAll: () => [],
    } as any;
  },
};

const _storage: Record<string, string> = {};
(globalThis as any).localStorage = (globalThis as any).localStorage || {
  getItem: (k: string) => (_storage.hasOwnProperty(k) ? _storage[k] : null),
  setItem: (k: string, v: string) => {
    _storage[k] = String(v);
  },
  removeItem: (k: string) => {
    delete _storage[k];
  },
  clear: () => {
    for (const k in _storage) delete _storage[k];
  },
};

describe("endScreen: addPlayerToHighScoreList", () => {
  beforeEach(() => {
    // reset high score list to known default
    setHighScoreListToLocalStorage(getDefaultHighScoreList());
  });

  it("adds a player when player's score is higher than the lowest high score", async () => {
    // Arrange: create a player with 1 correct answer (score = 1)
    updatePlayer({
      id: 999,
      score: 1,
      name: "Test Player",
      nbrOfQuestions: 10,
      answers: [{ movie: movies[0], isCorrect: true }],
    });

    // Dynamically import after we've ensured `document` is available
    const { addPlayerToHighScoreList } = await import("../src/endScreen");

    // Act
    addPlayerToHighScoreList();

    // Assert
    const hsl = getHighScoreList();
    expect(hsl).toHaveLength(10); // should remain 10 (removed lowest, added new)
    expect(hsl.some((p) => p.name === "Test Player")).toBe(true);
    // ensure the lowest score was removed (default had a 0)
    expect(Math.min(...hsl.map((p) => p.score))).toBeGreaterThanOrEqual(1);
  });

  it("does not add a player when player's score is not higher than lowest", async () => {
    // Arrange: create a player with 0 correct answers (score = 0)
    updatePlayer({
      id: 888,
      score: 0,
      name: "Low Player",
      nbrOfQuestions: 10,
      answers: [],
    });

    const { addPlayerToHighScoreList } = await import("../src/endScreen");

    // Act
    addPlayerToHighScoreList();

    // Assert
    const hsl = getHighScoreList();
    expect(hsl).toHaveLength(10);
    expect(hsl.some((p) => p.name === "Low Player")).toBe(false);
  });
});
