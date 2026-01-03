import { getHighScoreList, setHighScoreListToLocalStorage } from "./storage";
import type { Player } from "./types";

export const getLatestPlayerId = () => {
  const currentHighScoreList = getHighScoreList();
  return Math.max(
    ...currentHighScoreList.map((highScorePlayer: Player) => highScorePlayer.id)
  );
};

export const getLowestHighScore = (highScoreList: Player[]) => {
  return Math.min(
    ...highScoreList.map((highScorePlayer: Player) => highScorePlayer.score)
  );
};

export const removeLowestHighScore = (currentHighScoreList: Player[]) => {
  const updatedHighScoreList = sortHighScoreList([...currentHighScoreList]);
  updatedHighScoreList.pop();
  setHighScoreListToLocalStorage(updatedHighScoreList);
};

export const sortHighScoreList = (currentHighScoreList: Player[]) => {
  return [...currentHighScoreList].sort((a, b) => b.score - a.score);
};
