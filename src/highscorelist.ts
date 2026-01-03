import { getHighScoreList, setHighScoreListToLocalStorage } from "./storage";
import type { Player } from "./types";

export const getLatestPlayerId = () => {
  const currentHighScoreList = getHighScoreList();
  return Math.max(
    ...currentHighScoreList.map((highScorePlayer: Player) => highScorePlayer.id)
  );
};

export const getLowestHighScore = () => {
  return Math.min(
    ...getHighScoreList().map(
      (highScorePlayer: Player) => highScorePlayer.score
    )
  );
};

export const removeLowestHighScore = () => {
  const sortedHighScoreList = sortHighScoreList(getHighScoreList());
  sortedHighScoreList.pop();
  setHighScoreListToLocalStorage(sortedHighScoreList);
};

export const sortHighScoreList = (currentHighScoreList: Player[]) => {
  return [...currentHighScoreList].sort((a, b) => b.score - a.score);
};
