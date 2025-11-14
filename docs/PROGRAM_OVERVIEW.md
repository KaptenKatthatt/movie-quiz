# Program Overview - Who's That Face!

## endScreen.js

### Variables

| Variable        | Type   | Usage Count | Description                   |
| --------------- | ------ | ----------- | ----------------------------- |
| `ui`            | Object | 11          | DOM element references        |
| `highScoreList` | Array  | 8           | Stores all high score entries |

### Functions

| Function                 | Usage Count  | Description                                                |
| ------------------------ | ------------ | ---------------------------------------------------------- |
| `renderEndScreen()`      | 1 (exported) | Main function to display the end screen                    |
| `renderHighScoreList()`  | 1            | Renders the high score list and adds the current player    |
| `renderAnswerCards()`    | 1            | Renders cards for correct and incorrect answers            |
| `drawCards()` (local)    | 2            | Internal helper function that generates card HTML          |
| `isLastPlayer()` (local) | 1            | Internal helper function to check if player was last added |

### DOM Elements (ui object)

| Property              | Selector               | Usage Count |
| --------------------- | ---------------------- | ----------- |
| `endScreen`           | `.endScreen`           | 2           |
| `finalScore`          | `.finalScore`          | 4           |
| `highScoreList`       | `.highScoreList`       | 2           |
| `noHighScore`         | `.noHighScore`         | 2           |
| `restartGameBtn`      | `.restartGameBtn`      | 1           |
| `rightAnswerCards`    | `.rightAnswerCards`    | 2           |
| `rightAnswersHeading` | `.rightAnswersHeading` | 2           |
| `siteContainer`       | `.siteContainer`       | 2           |
| `wrongAnswerCards`    | `.wrongAnswerCards`    | 2           |
| `wrongAnswersHeading` | `.wrongAnswersHeading` | 2           |

---

## main.js

### Variables

| Variable                      | Type    | Usage Count | Description                           |
| ----------------------------- | ------- | ----------- | ------------------------------------- |
| `ui`                          | Object  | 40+         | DOM element references                |
| `game.isCurrentAnswerCorrect` | Boolean | 5           | Flag for correct/incorrect answer     |
| `currentStudent`              | Object  | 6           | Current student to be guessed         |
| `filteredWrongStudents`       | Array   | 2           | Students excluding the correct answer |
| `questionCount`               | Number  | 5           | Number of selected students           |
| `questionButtonNames`         | Array   | 3           | Names for answer buttons              |
| `shuffledStudents`            | Array   | 4           | Shuffled array of all students        |
| `selectedStudents`            | Array   | 4           | Students limited to selected number   |
| `rightAnswersArr`             | Array   | 5           | Array of correct answers              |
| `wrongAnswersArr`             | Array   | 4           | Array of incorrect answers            |

### Functions

| Function                 | Usage Count  | Description                                  |
| ------------------------ | ------------ | -------------------------------------------- |
| `cloneAndShuffleArray()` | 4            | Fisher-Yates algorithm to shuffle an array   |
| `renderStartScreen()`    | 1            | Renders the start screen with student cards  |
| `restartGame()`          | 1 (exported) | Resets the game to initial state             |
| `startGame()`            | 1            | Initializes a new game                       |
| `renderNewQuestion()`    | 2            | Renders next question with image and buttons |
| `setScore()`             | 2            | Updates score and animates score increase    |

### DOM Elements (ui object)

| Property                  | Selector                   | Usage Count |
| ------------------------- | -------------------------- | ----------- |
| `nextQuestionBtn`         | `.nextQuestionBtn`         | 5           |
| `noHighScore`             | `.noHighScore`             | 1           |
| `endScreen`               | `.endScreen`               | 2           |
| `photoContainer`          | `.photoContainer`          | 2           |
| `playerNameInputForm`     | `.playerNameInputForm`     | 1           |
| `playerNameInput`         | `#playerNameInput`         | 2           |
| `questionBtnContainer`    | `.questionBtnContainer`    | 4           |
| `startScreenContainer`    | `.startScreenContainer`    | 3           |
| `startBtnContainer`       | `.startBtnContainer`       | 2           |
| `questionScreenContainer` | `.questionScreenContainer` | 4           |
| `startPhotosContainer`    | `.startPhotosContainer`    | 1           |
| `points`                  | `.points`                  | 2           |

---

## index.html - Class Names & IDs

### Class Names & IDs

| Name                      | Type  | Usage Count | Description                            |
| ------------------------- | ----- | ----------- | -------------------------------------- |
| `siteContainer`           | class | 4           | Main container for the entire website  |
| `startScreenContainer`    | class | 3           | Start screen wrapper                   |
| `questionScreenContainer` | class | 4           | Question screen wrapper                |
| `questionBtnContainer`    | class | 4           | Container for answer buttons           |
| `finalScore`              | class | 4           | Final score element                    |
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
| `highScoreListHeader`     | class | 1           | High score heading                     |
| `restartGameBtn`          | class | 2           | Restart button                         |
| `playerNameInputForm`     | class | 1           | Form for name input                    |
| `playerNameInput`         | id    | 2           | Input field for name                   |
| `inputDescription`        | id    | 1           | Accessibility description              |

---

## ✅ COMPLETED

### 1. Extract localStorage logic into a utility module

- Created `storage.js` with functions: `getPlayerNameFromLocalStorage()`, `setPlayerNameToLocalStorage()`, `getHighScoreListFromLocalStorage()`, `setHighScoreListToLocalStorage()`
- Replaced direct localStorage calls in `endScreen.js` and `main.js` with imports from `storage.js`
- **Benefit**: Centralized storage access, easier testing, single point of change

### 2. Group DOM element selections

- In `main.js`: Created `const ui = { ... }` object with all DOM selectors at the top
- In `endScreen.js`: Created similar `const ui = { ... }` object
- **Benefit**: Improved readability, easier to refactor selectors, better overview of DOM dependencies

### 3. Remove unused/commented code

- Removed commented-out lines: `// let studentSliced = false;`
- Removed other commented-out code blocks
- **Benefit**: Cleaner codebase, reduces confusion

### 4. Improve variable naming

- Renamed `game.nbrOfQuestions` → `questionCount` (shorter, clearer)
- Renamed `nbrOfSelectedStudents` → `selectedStudents` (more concise)
- **Benefit**: Better code readability

---

5. **Split `setScore()` function**
   - Currently does both: updates HTML text AND triggers animation
   - Suggested split:
     - `formatScoreText(rightCount, nbrOfQuestions)` — returns string only (pure function)
     - `updateScoreDisplay(text, shouldAnimate)` — handles DOM updates and animation
   - **Status**: DONE
   - **Benefit**: Better testability, clearer separation of concerns, easier to reuse

## ⏳ IN PROGRESS

### High Priority

### Medium Priority

6. **Separate data from rendering in high score logic**

   - Extract pure logic from `renderHighScoreList()`:
     - `createHighScoreEntry(playerName, score, nbrOfQuestions)` — creates entry object
     - `shouldAddToHighScores(entry, list)` — checks if entry qualifies (returns boolean)
     - `sortHighScoreList(list)` — sorts list by score (pure function)
     - Keep `renderHighScoreListUI(list)` for DOM updates only
   - Move default high score list to separate constant or data file
   - **Status**: NOT STARTED
   - **Benefit**: Testable business logic, reusable functions, easier to debug

7. **Create a game state object**

   - Consolidate game variables into: `const gameState = { playerName, questionCount, currentIndex: 0, rightAnswers: [], wrongAnswers: [] }`
   - Pass `gameState` to functions instead of multiple individual parameters
   - **Status**: NOT STARTED
   - **Benefit**: Cleaner function signatures, easier to debug, scales better with new features, easier to save/restore state

8. **Fix high score insertion logic**
   - Current: uses `pop()` to remove last element, but should remove lowest score entry
   - Better: Use `findIndex()` to locate lowest score and replace it directly
   - Example: `const lowestIndex = list.findIndex(player => player.finalScore === Math.min(...list.map(p => p.finalScore)));`
   - **Status**: NOT STARTED
   - **Benefit**: Correct behavior, clearer intent, handles edge cases better

### Low Priority (UX/Accessibility)

9. **Improve focus management**

   - After `renderNewQuestion()`, move focus to first answer button: `ui.questionBtnContainer.querySelector("button").focus()`
   - After `renderStartScreen()`, move focus to first question count button
   - **Status**: NOT STARTED
   - **Benefit**: Better keyboard navigation, improved accessibility for keyboard users

10. **Add ARIA live region for score updates**

    - Wrap score element with `aria-live="polite"` and `aria-atomic="true"` in HTML
    - Add `role="status"` for screen reader announcements
    - **Status**: NOT STARTED
    - **Benefit**: Better accessibility for users with screen readers

11. **Add JSDoc type hints**

    - Add JSDoc comments to functions with parameter and return types
    - Example: `/** @param {Array<Student>} students @returns {Array<Student>} */`
    - **Status**: NOT STARTED
    - **Benefit**: Better IDE support, clearer documentation, easier to spot type-related bugs

12. **Move inline styles to CSS**
    - In `renderAnswerCards()`: inline `style="width: 9rem;"` should be a CSS class
    - In `renderStartScreen()`: inline `style="width: 6rem; height:10rem"` should be a CSS class
    - **Status**: NOT STARTED
    - **Benefit**: Better maintainability, easier to update styling, cleaner HTML templates

---

## Code Quality Issues

- ⚠️ **Magic string "Next question"** used in event listener — consider using `data-*` attributes instead
- ⚠️ **High score list default entries** hardcoded with placeholder names — should start empty
- ℹ️ **View transitions API** — Good progressive enhancement, but consider browser compatibility testing
- ℹ️ **Animation listeners** — Multiple `addEventListener` calls with `{ once: true }` — consider abstracting to helper function

---

## Suggested Implementation Order

1. ✅ Extract `storage.js`
2. ✅ Group DOM selections into `ui` objects
3. ✅ Remove commented code (cleanup)
4. ✅ Improve variable naming (readability)
5. ✅ : Split `setScore()` function (improves code quality)
6. ⏳ Create game state object (scalability)
7. ⏳ Separate data from rendering in high score logic (testability)
8. ⏳ Implement accessibility improvements (UX)
