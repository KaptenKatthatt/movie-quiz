export const getPlayerNameFromLocalStorage = () =>
  localStorage.getItem("playerName");

export const setPlayerName = (playerName) => {
  localStorage.setItem("playerName", playerName.trim());
};

export function getHighScoreListFromLocalStorage() {
  return localStorage.getItem("highScoreList");
}
export function setHighScoreListToLocalStorage(highScoreList) {
  localStorage.setItem("highScoreList", JSON.stringify(highScoreList));
}
