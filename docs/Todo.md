## Refactoring

Move noHighScore p out o index.html and only inject it when used. Make an easier to understand class name.

## Bugs

## Start

When you entered your playername and press enter, inputfield should be replaced with "Welcome player ${playerName}"

## End screen

## App general

## Future madness

Switch to movie celebrities

Connect to API at The MDB

Save high score to Fire base DB

# DONE

Max nbr of names on high score to not break design when too long?

Remove Datestamp feature on highscore objects. Use a serial number instead.

Remove lastPlayer and use highest id instead to indicate last player

Delete lowest score when list reaches 10 scores AND IF score is higher than lowest score.

Create player object that contains name and score that is handled through app, instead of variables?

### HSL Refactor

- getHSL()
- setHSL()
- create game.player(){
  - id: latestPlayerId + , <- Kräver tillgång till HSL
    finalScore,
    nbrOfQuestions,
    playerName,
    }

Set so yellow animation on score is only on the points. Use existing span

Score broke. FIXED: Had removed once: true from animationend, so it wasn't removed and caused some kind of problem it wasn't telling me about...

Add animationend eventlistener to all animations for safe removal after use.
Input player name for high score. Save in array. After selection nbr of questions.

Animation on restart game

Save high score list in array in local storage

Non general font on buttons?

DENIED. Put restart game button in upper right corner?

- Put a pin in every photo at start page, like notice board. Make notice board background with CSS? Mobile friendly?

Put the high score list in a sidebar to the right to make endContainer shorter and make Restart game more visible.

Bug: Event listener starts game when clicking wherever on startscreen

- Change font on question mark to a heavy dark font. Sans serif bold, inky black. More in style with image borders.

Bug: Score point animation triggers when you press wrong question

Cards get very long in high resolution. Fixed with height on cards.

Can't base selector on length-1 since the list is sorted by nbr and the last nbr can be anything. Figure out some other way to select the last score

Mobile first
media queries, fewer cards on start page? None=?

## After end of game

Håll reda på senaste resultat och vid varje ny gissning visa om man förbättrade eller
försämrade sig denna gången

High score list

Rename or remake previousTry array to highscore array.
Show high score list, top 5?
Color previous score?

Your score is always 2, based on what?

Wrong answer array is not emptied

How about right answer array?

Can you color the latest score?

It removes student when you click an answer button AND next question. It should not remove on question button.

- View transition when switching question

  Restart game button

Show photos and names of correct and wrong answers

- Cards?

- Disable next question button until question has been answered
