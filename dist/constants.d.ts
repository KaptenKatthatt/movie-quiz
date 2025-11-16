export interface Player {
    id: number;
    name: string;
    score: number;
    nbrOfQuestions: number;
}
export interface Student {
    id: number;
    name: string;
    image: string;
}
export interface Gamestate {
    getLowestHighScore(): number;
    removeLowestHighScore(): void;
    sortHighScoreList(): void;
    getLatestPlayerId(): number;
    restart(): void;
    readonly nbrOfRightAnswers: number;
    readonly nbrOfWrongAnswers: number;
    rightAnswersArr: Student[];
    wrongAnswersArr: Student[];
    filteredWrongStudents: Student[];
    shuffledQuestions: Student[];
    nbrOfSelectedQuestions: Student[];
    nbrOfQuestions: number;
    currentQuestionNbr: number;
    isCurrentAnswerCorrect: boolean;
    highScoreList: Player[];
    player: Player;
    currentQuestion: Student;
}
export declare const ui: {
    photoContainerEl: HTMLImageElement | null;
    playerNameInputEl: HTMLInputElement | null;
    playerNameInputFormEl: HTMLFormElement | null;
    pointsEl: HTMLElement | null;
    questionBtnContainerEl: HTMLElement | null;
    questionScreenContainerEl: HTMLElement | null;
    questionBoardEl: HTMLElement | null;
    siteContainerEl: HTMLElement | null;
    startBtnContainerEl: HTMLElement | null;
    startScreenContainerEl: HTMLElement | null;
    finalScoreEl: HTMLElement | null;
    highScoreListEl: HTMLElement | null;
    restartGameBtnEl: HTMLButtonElement | null;
    rightAnswerCardsEl: HTMLElement | null;
    rightAnswersHeadingEl: HTMLElement | null;
    wrongAnswerCardsEl: HTMLElement | null;
    wrongAnswersHeadingEl: HTMLElement | null;
    endScreenEl: HTMLElement | null;
    nextQuestionBtnEl: HTMLButtonElement | null;
    showNoHighScoreEl: HTMLElement | null;
};
export declare const game: Gamestate;
//# sourceMappingURL=constants.d.ts.map