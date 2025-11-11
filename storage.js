export const getPlayerName = () => localStorage.getItem("playerName");

export const setPlayerName = (playerName) =>
  localStorage.setItem("playerName", playerName);

export function getHighScoreList() {
  return localStorage.getItem("highScoreList");
}
export function setHighScoreList(highScoreList) {
  localStorage.setItem("highScoreList", JSON.stringify(highScoreList));
}
