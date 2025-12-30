import { type HighScoreList } from "./constants";
import { getNewHighScoreList } from "./highscorelist";

export const getPlayerNameFromLocalStorage = () => {
  if (
    localStorage.getItem("playerName") === null ||
    localStorage.getItem("playerName") === ""
  ) {
    localStorage.setItem("playerName", "someNoNameDude");
    return "someNoNameDude";
  } else {
    return localStorage.getItem("playerName")!;
  }
};

const sanitizePlayerName = (name: string) =>
  name.replace(/[^\p{L}\p{N}\s-]/gu, "").trim();

export const setPlayerNameToLocalStorage = (playerName: string) => {
  if (localStorage.getItem("playerName") === null || playerName === null) {
    playerName = "someNoNameDude";
  }
  localStorage.setItem("playerName", sanitizePlayerName(playerName));
};

export const getHighScoreList = function () {
  const storedList = localStorage.getItem("highScoreList");
  if (storedList === null) {
    return getNewHighScoreList();
  } else {
    return JSON.parse(storedList);
  }
};

export const setHighScoreListToLocalStorage = function (
  highScoreList: HighScoreList
) {
  localStorage.setItem("highScoreList", JSON.stringify(highScoreList));
};
