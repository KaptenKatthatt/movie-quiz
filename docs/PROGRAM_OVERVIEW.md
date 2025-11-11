# Program Overview - Who's That Face!

## endScreen.js

### Variables

| Variable                | Type        | Usage Count | Description                          |
| ----------------------- | ----------- | ----------- | ------------------------------------ |
| `endScreenEl`           | DOM-element | 2           | Reference to the end screen          |
| `endScoreEl`            | DOM-element | 4           | Reference to the final score element |
| `highScoreListEl`       | DOM-element | 2           | Reference to the high score list     |
| `rightAnswerCardsEl`    | DOM-element | 2           | Reference to correct answer cards    |
| `rightAnswersHeadingEl` | DOM-element | 2           | Heading for correct answers          |
| `wrongAnswerCardsEl`    | DOM-element | 2           | Reference to incorrect answer cards  |
| `wrongAnswersHeadingEl` | DOM-element | 2           | Heading for incorrect answers        |
| `noHighScoreEl`         | DOM-element | 2           | Reference to "no high score" message |
| `highScoreList`         | Array       | 8           | Stores all high score entries        |

### Functions

| Function                 | Usage Count  | Description                                                |
| ------------------------ | ------------ | ---------------------------------------------------------- |
| `getPlayerName()`        | 1            | Retrieves the player's name from localStorage              |
| `renderHighScoreList()`  | 1            | Renders the high score list and adds the current player    |
| `renderAnswerCards()`    | 1            | Renders cards for correct and incorrect answers            |
| `renderEndScreen()`      | 1 (exported) | Main function to display the end screen                    |
| `drawCards()` (local)    | 2            | Internal helper function that generates card HTML          |
| `isLastPlayer()` (local) | 1            | Internal helper function to check if player was last added |

---

## main.js

### Variables

| Variable                    | Type        | Usage Count | Description                               |
| --------------------------- | ----------- | ----------- | ----------------------------------------- |
| `siteContainerEl`           | DOM-element | 2           | Main container for the entire site        |
| `startScreenContainerEl`    | DOM-element | 3           | Start screen's container                  |
| `startBtnContainerEl`       | DOM-element | 2           | Container for start buttons               |
| `questionScreenContainerEl` | DOM-element | 4           | Question screen's container               |
| `questionBtnContainerEl`    | DOM-element | 4           | Container for answer option buttons       |
| `nextQuestionBtnEl`         | DOM-element | 5           | "Next question" button                    |
| `photoContainerEl`          | DOM-element | 2           | Image element for current student         |
| `noHighScoreEl`             | DOM-element | 1           | "No high score" message                   |
| `restartGameBtn`            | DOM-element | 2           | Restart button                            |
| `endScreenEl`               | DOM-element | 2           | End screen's container                    |
| `playerNameInputFormEl`     | DOM-element | 1           | Form for player name input                |
| `playerNameInputEl`         | DOM-element | 2           | Input field for player name               |
| `currentStudent`            | Object      | 6           | Current student to be guessed             |
| `nbrOfSelectedQuestions`    | Number      | 5           | Number of selected students               |
| `shuffledStudents`          | Array       | 4           | Shuffled array of all students            |
| `studentSliced`             | Boolean     | 3           | Flag to check if student has been removed |
| `slicedStudents`            | Array       | 4           | Students limited to selected number       |
| `filteredWrongStudents`     | Array       | 2           | Students excluding the correct answer     |
| `questionButtonNames`       | Array       | 3           | Names for answer buttons                  |
| `isCorrectAnswer`           | Boolean     | 5           | Flag for correct/incorrect answer         |
| `rightAnswersArr`           | Array       | 5           | Array of correct answers                  |
| `wrongAnswersArr`           | Array       | 4           | Array of incorrect answers                |

### Functions

| Function                 | Usage Count | Description                                  |
| ------------------------ | ----------- | -------------------------------------------- |
| `cloneAndShuffleArray()` | 4           | Fisher-Yates algorithm to shuffle an array   |
| `renderStartScreen()`    | 1           | Renders the start screen with student cards  |
| `startGame()`            | 1           | Initializes a new game                       |
| `renderNewQuestion()`    | 2           | Renders next question with image and buttons |
| `restartGame()`          | 1           | Resets the game to initial state             |
| `setScore()`             | 2           | Updates score and animates score increase    |

---

## index.html - Class Names

### Class Names & IDs

| Name                      | Type  | Usage Count | Description                            |
| ------------------------- | ----- | ----------- | -------------------------------------- |
| `siteContainer`           | class | 4           | Main container for the entire website  |
| `startScreenContainer`    | class | 3           | Start screen wrapper                   |
| `startPhotosContainer`    | class | 1           | Container for student preview cards    |
| `startBtnContainer`       | class | 2           | Container for number selection buttons |
| `welcomeHeader`           | class | 1           | Welcome heading                        |
| `nbrQuestionsContainer`   | class | 1           | Container for buttons (5, 10, ALL)     |
| `btn-select5`             | class | -           | Button for 5 questions                 |
| `btn-select10`            | class | -           | Button for 10 questions                |
| `btn-selectAll`           | class | -           | Button for all questions               |
| `questionScreenContainer` | class | 4           | Question screen wrapper                |
| `questionHeader`          | class | 1           | "Guess the face!" heading              |
| `scoreBoard`              | class | 1           | Score board                            |
| `points`                  | class | 2           | Points counter                         |
| `photoContainer`          | class | 2           | Image element for student              |
| `pointsContainer`         | class | -           | Container for points feedback          |
| `questionBtnContainer`    | class | 4           | Container for answer buttons           |
| `nextQuestionBtn`         | class | 5           | Next question button                   |
| `endScreen`               | class | 2           | End screen wrapper                     |
| `endRow`                  | class | -           | Row for final score                    |
| `finishedHeader`          | class | -           | "Game Finished!" heading               |
| `endScore`                | class | 4           | Final score element                    |
| `answerCardsContainer`    | class | -           | Container for answer cards             |
| `rightAnswersHeading`     | class | 2           | "These were correct!" heading          |
| `rightAnswerCards`        | class | 2           | Container for correct answer cards     |
| `wrongAnswersHeading`     | class | 2           | "These were wrong..." heading          |
| `wrongAnswerCards`        | class | 2           | Container for incorrect answer cards   |
| `noHighScore`             | class | 2           | "Too Low Score" message                |
| `highScoreListcontainer`  | class | -           | Container for high score list          |
| `highScoreList`           | class | 2           | The high score list itself             |
| `HSL-header`              | class | -           | High score heading                     |
| `restartGameBtn`          | class | 2           | Restart button                         |
| `playerNameInputForm`     | class | 1           | Form for name input                    |
| `playerNameInput`         | id    | 2           | Input field for name                   |
| `inputDescription`        | id    | -           | Accessibility description              |

---

## Refactoring Suggestions

### Variables to Consider:

- **`studentSliced`** - Used in an odd way (3 times). The logic could be simplified.
- **`isCorrectAnswer`** - Slightly confusing flag name. Consider renaming to something clearer.
- **`nbrOfSelectedQuestions`** - Long name. Consider `selectedCount` or `questionCount`.

### Functions to Consider:

- **`cloneAndShuffleArray()`** - Good name, used 4 times. Good to keep as a utility function.
- **`setScore()`** - Does multiple things (updates HTML and adds animation). Consider splitting it up.

### DOM Element Selection:

- Many elements are selected at startup. Consider grouping related elements together for better readability.
