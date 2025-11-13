export const getPlayerName = () => localStorage.getItem("playerName");

export const setPlayerName = (playerName) =>
  localStorage.setItem("playerName", playerName);

export function getHighScoreListFromLocalStorage() {
  return localStorage.getItem("highScoreList");
}
export function setHighScoreListToLocalStorage(highScoreList) {
  localStorage.setItem("highScoreList", JSON.stringify(highScoreList));
}
