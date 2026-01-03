import { describe, it, expect, beforeEach } from "vitest";
import { movies } from "../src/data/movies";
import {
  getHighScoreList,
  setHighScoreListToLocalStorage,
} from "../src/storage";
import { getDefaultHighScoreList } from "../src/constants";
import { updatePlayer } from "../src/state";

// Ensure a minimal `document` and `localStorage` exist before importing modules that access them
// Provide a small typed stub instead of using `any` casts used elsewhere in the codebase.
interface MinimalElement {
  classList: { add: () => void; remove: () => void; contains: () => boolean };
  addEventListener: () => void;
  innerHTML: string;
  innerText: string;
  value: string;
  src: string;
  disabled: boolean;
  querySelectorAll: () => unknown[];
}

const docMock = {
  querySelector: () =>
    ({
      classList: { add: () => {}, remove: () => {}, contains: () => false },
      addEventListener: () => {},
      innerHTML: "",
      innerText: "",
      value: "",
      src: "",
      disabled: false,
      querySelectorAll: () => [],
    } as MinimalElement),
};

(globalThis as unknown as { document?: unknown }).document =
  (globalThis as unknown as { document?: unknown }).document ||
  (docMock as unknown as Document);

const _storage: Record<string, string> = {};
const storageGlobal = globalThis as unknown as { localStorage?: Storage };
storageGlobal.localStorage =
  storageGlobal.localStorage ||
  ({
    getItem: (k: string) =>
      Object.prototype.hasOwnProperty.call(_storage, k) ? _storage[k] : null,
    setItem: (k: string, v: string) => {
      _storage[k] = String(v);
    },
    removeItem: (k: string) => {
      delete _storage[k];
    },
    clear: () => {
      for (const k in _storage) delete _storage[k];
    },
  } as Storage);

describe("endScreen: addPlayerToHighScoreList", () => {
  beforeEach(() => {
    // reset high score list to known default
    setHighScoreListToLocalStorage(getDefaultHighScoreList());
  });

  it("adds a player when player's score is higher than the lowest high score", async () => {
    for (let run = 0; run < 2; run++) {
      // simulate start of a new game: reset high score list, localStorage and player
      setHighScoreListToLocalStorage(getDefaultHighScoreList());
      localStorage.clear();
      updatePlayer({
        id: 0,
        score: 0,
        name: "",
        nbrOfQuestions: 0,
        answers: [],
      });

      // Arrange: create a player with 1 correct answer (score = 1)
      updatePlayer({
        id: 999 + run,
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
    }
  });

  it("does not add a player when player's score is not higher than lowest", async () => {
    for (let run = 0; run < 2; run++) {
      // simulate start of a new game: reset high score list, localStorage and player
      setHighScoreListToLocalStorage(getDefaultHighScoreList());
      localStorage.clear();
      updatePlayer({
        id: 0,
        score: 0,
        name: "",
        nbrOfQuestions: 0,
        answers: [],
      });

      // Arrange: create a player with 0 correct answers (score = 0)
      updatePlayer({
        id: 888 + run,
        score: 0,
        name: "Low Player",
        nbrOfQuestions: 10,
        answers: [],
      });

      const { renderEndScreen } = await import("../src/endScreen");

      // Act
      // renderEndScreen will call renderHighScoreList internally and decide whether to add
      renderEndScreen();

      // Assert
      const hsl = getHighScoreList();
      expect(hsl).toHaveLength(10);
      expect(hsl.some((p) => p.name === "Low Player")).toBe(false);
    }
  });

  it("adds a player with a chosen name and removes the lowest score", async () => {
    for (let run = 0; run < 2; run++) {
      // simulate start of a new game: reset high score list, localStorage and player
      setHighScoreListToLocalStorage(getDefaultHighScoreList());
      localStorage.clear();
      updatePlayer({
        id: 0,
        score: 0,
        name: "",
        nbrOfQuestions: 0,
        answers: [],
      });

      // Arrange: choose a player name and init player
      const storage = await import("../src/storage");
      storage.setPlayerNameToLocalStorage("Alice" + run);

      const playerMod = await import("../src/player");
      playerMod.initPlayer();

      const { getPlayer } = await import("../src/state");
      const current = getPlayer();

      // Give the player 2 correct answers (score = 2)
      updatePlayer({
        id: current.id + run,
        score: 2,
        name: current.name,
        nbrOfQuestions: 10,
        answers: [
          { movie: movies[0], isCorrect: true },
          { movie: movies[1], isCorrect: true },
        ],
      });

      const { addPlayerToHighScoreList } = await import("../src/endScreen");

      // Act
      addPlayerToHighScoreList();

      // Assert
      const hsl = getHighScoreList();
      expect(hsl).toHaveLength(10);
      // ensure the chosen player name is present in the list
      expect(hsl.some((p) => p.name === current.name)).toBe(true);
      // ensure the previous lowest score (0) was removed
      expect(hsl.some((p) => p.score === 0)).toBe(false);
    }
  });

  it("works for an anonymous player (default name) and removes the lowest score", async () => {
    for (let run = 0; run < 2; run++) {
      // simulate start of a new game: reset high score list, localStorage and player
      setHighScoreListToLocalStorage(getDefaultHighScoreList());
      localStorage.clear();
      updatePlayer({
        id: 0,
        score: 0,
        name: "",
        nbrOfQuestions: 0,
        answers: [],
      });

      // Arrange: ensure no playerName in storage so default is used
      localStorage.removeItem("playerName");

      const playerMod = await import("../src/player");
      playerMod.initPlayer();

      const constants = await import("../src/constants");
      const { getPlayer } = await import("../src/state");
      const current = getPlayer();

      // Ensure init applied the default name
      expect(current.name).toBe(constants.DEFAULT_USER_NAME);

      // Give the anonymous player 3 correct answers (score = 3)
      updatePlayer({
        id: current.id + run,
        score: 3,
        name: current.name,
        nbrOfQuestions: 10,
        answers: [
          { movie: movies[0], isCorrect: true },
          { movie: movies[1], isCorrect: true },
          { movie: movies[2], isCorrect: true },
        ],
      });

      const { addPlayerToHighScoreList } = await import("../src/endScreen");

      // Act
      addPlayerToHighScoreList();

      // Assert
      const hsl = getHighScoreList();
      expect(hsl).toHaveLength(10);
      expect(hsl.some((p) => p.name === constants.DEFAULT_USER_NAME)).toBe(
        true
      );
      // ensure the previous lowest score (0) was removed
      expect(hsl.some((p) => p.score === 0)).toBe(false);
    }
  });
});
