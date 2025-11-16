"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setHighScoreListToLocalStorage = exports.getHighScoreListFromLocalStorage = exports.setPlayerNameToLocalStorage = exports.getPlayerNameFromLocalStorage = void 0;
const constants_1 = require("./constants");
const getPlayerNameFromLocalStorage = () => {
    if (localStorage.getItem("playerName") === null ||
        localStorage.getItem("playerName") === "") {
        localStorage.setItem("playerName", "someNoNameDude");
        return "someNoNameDude";
    }
    else {
        return localStorage.getItem("playerName");
    }
};
exports.getPlayerNameFromLocalStorage = getPlayerNameFromLocalStorage;
const sanitizePlayerName = (name) => name.replace(/[^\p{L}\p{N}\s\-]/gu, "").trim();
const setPlayerNameToLocalStorage = (playerName) => {
    if (localStorage.getItem("playerName") === null || playerName === null) {
        playerName = "someNoNameDude";
    }
    localStorage.setItem("playerName", sanitizePlayerName(playerName));
};
exports.setPlayerNameToLocalStorage = setPlayerNameToLocalStorage;
const getHighScoreListFromLocalStorage = function () {
    return localStorage.getItem("highScoreList");
};
exports.getHighScoreListFromLocalStorage = getHighScoreListFromLocalStorage;
const setHighScoreListToLocalStorage = function (highScoreList) {
    localStorage.setItem("highScoreList", JSON.stringify(highScoreList));
};
exports.setHighScoreListToLocalStorage = setHighScoreListToLocalStorage;
//# sourceMappingURL=storage.js.map