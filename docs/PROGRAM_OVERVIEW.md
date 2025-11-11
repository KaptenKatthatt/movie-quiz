# Program Overview - Who's That Face!

## endScreen.js

### Variables

| Variable                | Type        | Usage Count | Description                          |
| ----------------------- | ----------- | ----------- | ------------------------------------ |
| `highScoreList`         | Array       | 8           | Stores all high score entries        |
| `endScoreEl`            | DOM-element | 4           | Reference to the final score element |
| `endScreenEl`           | DOM-element | 2           | Reference to the end screen          |
| `highScoreListEl`       | DOM-element | 2           | Reference to the high score list     |
| `rightAnswerCardsEl`    | DOM-element | 2           | Reference to correct answer cards    |
| `rightAnswersHeadingEl` | DOM-element | 2           | Heading for correct answers          |
| `wrongAnswerCardsEl`    | DOM-element | 2           | Reference to incorrect answer cards  |
| `wrongAnswersHeadingEl` | DOM-element | 2           | Heading for incorrect answers        |
| `noHighScoreEl`         | DOM-element | 2           | Reference to "no high score" message |
| `siteContainerEl`       | DOM-element | 2           | Reference to main site container     |
| `restartGameBtnEl`      | DOM-element | 1           | Reference to restart button          |

### Functions

| Function                 | Usage Count  | Description                                                |
| ------------------------ | ------------ | ---------------------------------------------------------- |
| `renderEndScreen()`      | 1 (exported) | Main function to display the end screen                    |
| `getPlayerName()`        | 1 (exported) | Retrieves the player's name from localStorage              |
| `renderHighScoreList()`  | 1            | Renders the high score list and adds the current player    |
| `renderAnswerCards()`    | 1            | Renders cards for correct and incorrect answers            |
| `drawCards()` (local)    | 2            | Internal helper function that generates card HTML          |
| `isLastPlayer()` (local) | 1            | Internal helper function to check if player was last added |

---

## main.js

### Variables

| Variable                    | Type        | Usage Count | Description                           |
| --------------------------- | ----------- | ----------- | ------------------------------------- |
| `nextQuestionBtnEl`         | DOM-element | 5           | "Next question" button                |
| `questionScreenContainerEl` | DOM-element | 4           | Question screen's container           |
| `questionBtnContainerEl`    | DOM-element | 4           | Container for answer option buttons   |
| `shuffledStudents`          | Array       | 4           | Shuffled array of all students        |
| `slicedStudents`            | Array       | 4           | Students limited to selected number   |
| `currentStudent`            | Object      | 6           | Current student to be guessed         |
| `rightAnswersArr`           | Array       | 5           | Array of correct answers              |
| `nbrOfSelectedQuestions`    | Number      | 5           | Number of selected students           |
| `startScreenContainerEl`    | DOM-element | 3           | Start screen's container              |
| `questionButtonNames`       | Array       | 3           | Names for answer buttons              |
| `endScreenEl`               | DOM-element | 2           | End screen's container                |
| `photoContainerEl`          | DOM-element | 2           | Image element for current student     |
| `startBtnContainerEl`       | DOM-element | 2           | Container for start buttons           |
| `filteredWrongStudents`     | Array       | 2           | Students excluding the correct answer |
| `playerNameInputFormEl`     | DOM-element | 1           | Form for player name input            |
| `playerNameInputEl`         | DOM-element | 2           | Input field for player name           |
| `noHighScoreEl`             | DOM-element | 1           | "No high score" message               |
| `isCorrectAnswer`           | Boolean     | 5           | Flag for correct/incorrect answer     |
| `wrongAnswersArr`           | Array       | 4           | Array of incorrect answers            |

### Functions

| Function                 | Usage Count  | Description                                  |
| ------------------------ | ------------ | -------------------------------------------- |
| `cloneAndShuffleArray()` | 4            | Fisher-Yates algorithm to shuffle an array   |
| `renderNewQuestion()`    | 2            | Renders next question with image and buttons |
| `setScore()`             | 2            | Updates score and animates score increase    |
| `renderStartScreen()`    | 1            | Renders the start screen with student cards  |
| `startGame()`            | 1            | Initializes a new game                       |
| `restartGame()`          | 1 (exported) | Resets the game to initial state             |

---

## index.html - Class Names & IDs

### Class Names & IDs

| Name                      | Type  | Usage Count | Description                            |
| ------------------------- | ----- | ----------- | -------------------------------------- |
| `siteContainer`           | class | 4           | Main container for the entire website  |
| `startScreenContainer`    | class | 3           | Start screen wrapper                   |
| `questionScreenContainer` | class | 4           | Question screen wrapper                |
| `questionBtnContainer`    | class | 4           | Container for answer buttons           |
| `endScore`                | class | 4           | Final score element                    |
| `points`                  | class | 2           | Points counter                         |
| `nextQuestionBtn`         | class | 5           | Next question button                   |
| `endScreen`               | class | 2           | End screen wrapper                     |
| `highScoreList`           | class | 2           | The high score list itself             |
| `rightAnswerCards`        | class | 2           | Container for correct answer cards     |
| `wrongAnswerCards`        | class | 2           | Container for incorrect answer cards   |
| `rightAnswersHeading`     | class | 2           | "These were correct!" heading          |
| `wrongAnswersHeading`     | class | 2           | "These were wrong..." heading          |
| `startPhotosContainer`    | class | 1           | Container for student preview cards    |
| `startBtnContainer`       | class | 2           | Container for number selection buttons |
| `welcomeHeader`           | class | 1           | Welcome heading                        |
| `nbrQuestionsContainer`   | class | 1           | Container for buttons (5, 10, ALL)     |
| `btn-select5`             | class | 1           | Button for 5 questions                 |
| `btn-select10`            | class | 1           | Button for 10 questions                |
| `btn-selectAll`           | class | 1           | Button for all questions               |
| `questionHeader`          | class | 1           | "Guess the face!" heading              |
| `scoreBoard`              | class | 1           | Score board                            |
| `photoContainer`          | class | 2           | Image element for student              |
| `pointsContainer`         | class | 1           | Container for points feedback          |
| `endRow`                  | class | 1           | Row for final score                    |
| `finishedHeader`          | class | 1           | "Game Finished!" heading               |
| `answerCardsContainer`    | class | 1           | Container for answer cards             |
| `noHighScore`             | class | 2           | "Too Low Score" message                |
| `highScoreListcontainer`  | class | 1           | Container for high score list          |
| `HSL-header`              | class | 1           | High score heading                     |
| `restartGameBtn`          | class | 2           | Restart button                         |
| `playerNameInputForm`     | class | 1           | Form for name input                    |
| `playerNameInput`         | id    | 2           | Input field for name                   |
| `inputDescription`        | id    | 1           | Accessibility description              |

---

## Refactoring Suggestions

### High Priority

1. ✅**Extract localStorage logic into a utility module**

   - ✅Create `storage.js` with functions: `getPlayerName()`, `setPlayerName()`, `getHighScoreList()`, `setHighScoreList()`
   - ✅Replace direct localStorage calls in `endScreen.js` and `main.js` with imports from `storage.js`
   - **Benefit**: Centralized storage access, easier testing, single point of change

2. **Group DOM element selections**

   - In `main.js`: Create a `const ui = { nextQuestionBtn: ..., photoContainer: ..., ... }` object at the top
   - In `endScreen.js`: Create a similar `const ui = { ... }` object
   - **Benefit**: Improved readability, easier to refactor selectors, better overview of DOM dependencies

3. **Split `setScore()` function** ⚠️ **Current Issue**

   - Currently does both: updates HTML text AND triggers animation
   - Suggested split:
     - `formatScoreText(rightCount, totalQuestions)` — returns string only (pure function)
     - `updateScoreDisplay(text, shouldAnimate)` — handles DOM updates and animation
   - **Benefit**: Better testability, clearer separation of concerns, easier to reuse

4. **Remove unused/commented code**
   - Remove the commented-out lines related to `studentSliced` logic (lines with `// studentSliced = false;` etc.)
   - Remove unused `// const scoreBoardEl = document.querySelector(".scoreBoard");`
   - **Benefit**: Cleaner codebase, reduces confusion

### Medium Priority

5. **Improve variable naming**

   - `nbrOfSelectedQuestions` → `questionCount` (shorter, clearer)
   - `isCorrectAnswer` → `lastAnswerWasCorrect` (more descriptive of what it represents)
   - **Benefit**: Better code readability

6. **Separate data from rendering in high score logic**

   - Extract pure logic from `renderHighScoreList()`:
     - `computeHighScoreEntry(playerName, score, totalQuestions)` — creates entry object
     - `shouldAddToHighScores(entry, list)` — checks if entry qualifies
     - Keep `renderHighScoreListUI()` for DOM updates only
   - **Benefit**: Testable business logic, reusable functions

7. **Create a game state object**

   - Introduce: `const gameState = { playerName, totalQuestions, rightAnswers: [], wrongAnswers: [], remaining: [] }`
   - Pass `gameState` to functions instead of multiple individual variables
   - **Benefit**: Cleaner function signatures, easier to debug, scales better with new features

8. **Fix high score insertion logic**
   - Current: uses `pop()` which removes last element, but list should be sorted by score
   - Better: Find index of lowest score with `findIndex()` and replace it directly
   - **Benefit**: Correct behavior, clearer intent

### Low Priority (UX/Accessibility)

9. **Improve focus management**

   - After `renderNewQuestion()`, move focus to first answer button: `firstAnswerButton.focus()`
   - **Benefit**: Better keyboard navigation, improved accessibility

10. **Add ARIA live region for score updates**

    - Wrap score element with `aria-live="polite"` for screen reader announcements
    - **Benefit**: Better accessibility for users with screen readers

11. **Consider TypeScript or JSDoc**

    - Add JSDoc type hints for functions and important objects
    - Example: `/** @param {Student} student @returns {string} */`
    - **Benefit**: Better IDE support, clearer documentation, fewer bugs

12. **Move inline styles to CSS**
    - In `renderAnswerCards()`: inline `style="width: 9rem;"` should be a CSS class
    - In `renderStartScreen()`: inline `style="width: 6rem; height:10rem"` should be a CSS class
    - **Benefit**: Better maintainability, easier to update styling

### Code Quality Issues Found

- ⚠️ **Circular import risk**: `main.js` imports from `endScreen.js` AND `endScreen.js` imports from `main.js` (via `restartGame`). Consider using event-based communication instead.
- ⚠️ **Magic string "Next question"** used in event listener — consider using data attributes
- ⚠️ **High score list default entries** hardcoded with placeholder names — should be empty by default
- ℹ️ **View transitions API** — Good progressive enhancement, but consider testing in older browsers

### Suggested Implementation Order

1. **First**: Extract `storage.js` (quick win, immediate benefit)
2. **Second**: Group DOM selections into `ui` objects (improves readability)
3. **Third**: Split `setScore()` function (improves code quality)
4. **Fourth**: Remove commented code (cleanup)
5. **Then**: Implement remaining suggestions based on priority
