import { DEFAULT_HIGH_SCORE_LIST } from "./constants";
import { getHighScoreList } from "./storage";
import type { Player } from "./types";

export const addPlayerToHighScoreList = (
  currentPlayer: Player,
  currentHighScoreList: Player[]
) => {
  return [...currentHighScoreList, currentPlayer];
};

export const getLowestHighScore = (highScoreList: Player[]) => {
  return Math.min(
    ...highScoreList.map((highScorePlayer: Player) => highScorePlayer.score)
  );
};
export const removeLowestHighScore = (currentHighScoreList: Player[]) => {
  const sortedList = sortHighScoreList([...currentHighScoreList]);
  sortedList.pop();
  return sortedList;
};

export const sortHighScoreList = (currentHighScoreList: Player[]) => {
  return [...currentHighScoreList].sort((a, b) => b.score - a.score);
};

export const getLatestPlayerId = () => {
  const currentHighScoreList = getHighScoreList();
  return Math.max(
    ...currentHighScoreList.map((highScorePlayer) => highScorePlayer.id)
  );
};

export const getDefaultHighScoreList = () => {
  return [...DEFAULT_HIGH_SCORE_LIST];
};
