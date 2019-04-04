// the computer will pick a random word 
var userOptions = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var computerOptions = ["arapahoebasin", "aspen", "breckenridge", "beavercreek", "copper", "crestedbutte", "keystone", "loveland", "steamboat", "telluride", "vail", "winterpark"];
var computerChoice;

// variables
var numWins = 0;
var numLoss = 0;
var attempts = 9;

// arrays
var guesses = [];
var hiddenWord = [];
var computerWord = [];

// reset function
function resetGame() {
    attempts = 9;
    hiddenWord = [];
    computerWord = [];
    guesses = [];

    computerChoice = computerOptions[Math.floor(Math.random() * computerOptions.length)];

    for (var i = 0; i < computerChoice.length; i++) {
        hiddenWord.push("-");
        computerWord.push(computerChoice[i]);
    }
}

// function to check if hiddenWord equals computerWord
function checkArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        } 
    }
    return true;
}

// function to display photo after a win
function displayPhoto(resort) {
     resortImage.src = 'assets/images/' + resort + '.jpg';
}

// assigning variables to the HTML elements that change
var winsText = document.getElementById("wins");
var lossText = document.getElementById("losses");
var wordDisplay = document.getElementById("word-display");
var attemptsText = document.getElementById("guesses-left");
var guessesText = document.getElementById("already-guessed");
var resortImage = document.getElementById("resortImg");

// beginning the game display start
function init() {
    resetGame();
    render();

    // main function triggers on keypress converts to lowercase
    document.onkeyup = function(event) {
        var letter = event.key.toLowerCase();
    
        // checking that the input is a not letter or has been guessed - do nothing
        if (!isValidGuess(letter)) {
            return;
        }
    
        // updating the guessed letters
        guesses.push(letter);
    
        // checking if the input is in the computer word
        if (checkGuess(letter)) {
            updateHiddenWord(letter)
        } else {
            attempts -= 1;
        }
    
        // checking for a win or a loss
        if (checkWin()) {
            showWin();
        } else if (checkLose()) {
            showLose();
        }
        // showing new data on screen
        render();
    }
}

// is letter guessed a valid letter and has it been guessed already
function isValidGuess(letter) {
    return userOptions.indexOf(letter) > -1 && guesses.indexOf(letter) === -1;
}

// is letter guessed in computer word
function checkGuess(letter) {
    return computerWord.indexOf(letter) > -1;
}

// replacing the "-" in the hidden word with the letter
function updateHiddenWord(letter) {
    for (var i = 0; i < computerWord.length; i++) {
        if (letter === computerWord[i]) {
            hiddenWord[i] = letter;
        }
    }
}

// conditions for a win
function checkWin() {
 return checkArrays(hiddenWord, computerWord);
}

function showWin () {
    numWins++;
    displayPhoto(computerChoice);
    resetGame();
    $('#winModal').modal({});
}

// conditions for a loss
function checkLose() {
    return attempts === 0;
}

function showLose() {
    numLoss++;
    displayPhoto('hangman');
    resetGame();
}

// showing new data on the screen
function render() {
    winsText.textContent = numWins;
    lossText.textContent = numLoss;
    wordDisplay.textContent = hiddenWord.join("");
    attemptsText.textContent = attempts;
    guessesText.textContent = guesses;
}

// wait for page to load and start game
window.onload = function () {
    init();
}