export const getPlayerNameFromLocalStorage = () =>
  localStorage.getItem("playerName");

export const setPlayerNameToLocalStorage = (playerName) => {
  localStorage.setItem("playerName", playerName.trim());
};

export const getHighScoreListFromLocalStorage = function () {
  return localStorage.getItem("highScoreList");
};
export const setHighScoreListToLocalStorage = function (highScoreList) {
  localStorage.setItem("highScoreList", JSON.stringify(highScoreList));
};
