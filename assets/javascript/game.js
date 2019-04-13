
// div elements
var welcomeDiv = $("#welcome");
var instructionDiv = $("#instructions");
var roundWordDiv = $("#round-word");
var guessesRemainingDiv = $("#guesses-remaining");
var incorrectLettersDiv = $("#incorrect-guesses");
var letterGuessedDiv = $("#letter-guessed");
var winsDiv = $("#wins");
var lossesDiv = $("#losses");

// arrays and variables
var answers = ['vladislav', 'viago', 'deacon', 'petyr', 'nick', 'stu', 'jackie', 'anton', 'katherine', 'pauline'];
var roundAnswer;
var wins = 0;
var losses = 0;
var remainingGuesses = 10;
var allGuessedLetters = [];
var incorrectLetters = [];
var answerArray = [];

// strings
var welcomeText = "Welcome to the What We Do in The Shadows Name Guessing Game!"
var startGameText = "Press any key to get started!"
var guessALetterText = "Guess a Letter";
var winsText = "Wins: ";
var lossesText = "Losses: ";
var playerWonText = "You won!!!! Press any key to play again!"
var playerLostText = "Oh No! You Lost! Press any key to play again!"

// setting initial text
setup(welcomeText, startGameText, winsText, wins, lossesText, losses, remainingGuesses);
// play the game
playGame();

function playGame() {
    resetGame();
    // start when any key is pressed
    document.onkeyup = function (event) {
        instructionDiv.text(guessALetterText);

        // get round answer at random
        roundAnswer = answers[Math.floor(Math.random() * answers.length)];

        hiddenWord = changeAnswerToDashes(roundAnswer);
        roundWordDiv.text(removeArrayCommas(hiddenWord));

        document.onkeyup = function (event) {
            var guessedLetter = event.key;

            // only record if it is a letter
            if (guessedLetter.match(/[a-zA-Z]+/)) {
                letterGuessedDiv.text(guessedLetter);
                // make sure it hasn't been guessed yet
                if (!allGuessedLetters.includes(guessedLetter)) {
                    // check if guessedLetter is in roundAnswer
                    if (roundAnswer.includes(guessedLetter)) {
                        for (var j = 0; j < roundAnswer.length; j++) {
                            if (roundAnswer[j] == guessedLetter) {
                                hiddenWord[j] = roundAnswer[j];
                            }
                        }
                        pushToArray(allGuessedLetters, guessedLetter);
                        roundWordDiv.text(removeArrayCommas(hiddenWord));
                        // if no dashes left they won
                        if (!anyDashes(hiddenWord)) {
                            won();
                        }
                    }
                    else {
                        pushToArray(incorrectLetters, guessedLetter);
                        pushToArray(allGuessedLetters, guessedLetter);
                        incorrectLettersDiv.text(incorrectLetters);
                        remainingGuesses = remainingGuesses - 1;
                        if (remainingGuesses == 0) {
                            lost();
                        }
                    }
                    guessesRemainingDiv.text(remainingGuesses);
                }
            }
        }
    }
}

function changeAnswerToDashes(word) {
    var length = [];
    for (var i = 0; i < word.length; i++) {
        length.push("_");
    }
    return length;
}

function removeArrayCommas(array) {
    return array.join(" ");
}

function pushToArray(array, value) {
    array.push(value);
}

function anyDashes(hiddenWord) {
    if (hiddenWord.includes("_")) {
        return true;
    }
    else {
        return false;
    }
}

function won() {
    instructionDiv.text(playerWonText);
    wins++;
    playGame();
}

function lost() {
    instructionDiv.text(playerLostText +  " The answer was: " + roundAnswer);
    losses++;
    playGame();
}

function setup(welcomeText, startGameText, winsText, wins, lossesText, losses, remainingGuesses) {
    welcomeDiv.text(welcomeText);
    instructionDiv.text(startGameText);
    winsDiv.text(winsText + wins);
    lossesDiv.text(lossesText + losses);
    guessesRemainingDiv.text(remainingGuesses);
}

function resetGame() {
    allGuessedLetters = [];
    incorrectLetters = [];
    incorrectLettersDiv.empty();
    letterGuessedDiv.text("")
    remainingGuesses = 10;
    winsDiv.text(winsText + wins);
    lossesDiv.text(lossesText + losses);
}
