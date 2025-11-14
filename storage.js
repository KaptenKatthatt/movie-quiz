export const getPlayerNameFromLocalStorage = () =>
  localStorage.getItem("playerName");

export const setPlayerName = (playerName) => {
  cleanedPlayerName = playerName.trim();

  localStorage.setItem("playerName", cleanedPlayerName);
};

export function getHighScoreListFromLocalStorage() {
  return localStorage.getItem("highScoreList");
}
export function setHighScoreListToLocalStorage(highScoreList) {
  localStorage.setItem("highScoreList", JSON.stringify(highScoreList));
}
