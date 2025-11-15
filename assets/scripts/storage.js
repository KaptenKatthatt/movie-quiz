export const getPlayerNameFromLocalStorage = () =>
  localStorage.getItem("playerName");

const sanitizePlayerName = (name) =>
  name.replace(/[^\p{L}\p{N}\s\-]/gu, "").trim();

export const setPlayerNameToLocalStorage = (playerName) => {
  localStorage.setItem("playerName", sanitizePlayerName(playerName));
};

export const getHighScoreListFromLocalStorage = function () {
  return localStorage.getItem("highScoreList");
};
export const setHighScoreListToLocalStorage = function (highScoreList) {
  localStorage.setItem("highScoreList", JSON.stringify(highScoreList));
};
