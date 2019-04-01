// the computer will pick a random word 
var userOptions = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var computerOptions = ["arapahoebasin", "aspen", "breckenridge", "beavercreek", "copper", "crestedbutte", "keystone", "loveland", "steamboat", "telluride", "vail", "winterpark"];
var computerChoice = computerOptions[Math.floor(Math.random() * computerOptions.length)];

// variables
var numWins = 0;
var attempts = 9;

// arrays
var guesses = [];
var hiddenWord = [];
var computerWord = [];

// reset function
function resetGame() {

    attempts = 9;
    attemptsText.textContent = attempts;

    guesses = [];
    guessesText.textContent = guesses;

    computerChoice = computerOptions[Math.floor(Math.random() * computerOptions.length)];
    console.log("Computer choice: " + computerChoice);

    hiddenWord = [];
    computerWord = [];

    for (var i = 0; i < computerChoice.length; i++) {
        hiddenWord.push("-");
    }
    wordDisplay.textContent = hiddenWord.join("");
    
    for (var i = 0; i < computerChoice.length; i++) {
        computerWord.push(computerChoice[i]);
    }

    return attempts, guesses, computerChoice, hiddenWord, computerWord;
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
    if (resort === "arapahoebasin") {
        resortImage.src = "assets/images/abasin.jpg"
    } else if (resort === "aspen") {
        resortImage.src = "assets/images/aspen.jpg"
    } else if (resort === "breckenridge") {
        resortImage.src = "assets/images/breck.jpg"
    } else if (resort === "beavercreek") {
        resortImage.src = "assets/images/beaver.jpg"
    } else if (resort === "copper") {
        resortImage.src = "assets/images/copper.jpg"
    } else if (resort === "crestedbutte") {
        resortImage.src = "assets/images/crested.jpg"
    } else if (resort === "keystone") {
        resortImage.src = "assets/images/keystone.jpg"
    } else if (resort === "loveland") {
        resortImage.src = "assets/images/loveland.jpg"
    } else if (resort === "steamboat") {
        resortImage.src = "assets/images/steamboat.jpg"
    } else if (resort === "telluride") {
        resortImage.src = "assets/images/telluride.jpg"
    } else if (resort === "vail") {
        resortImage.src = "assets/images/vail.jpg"
    } else if (resort === "winterpark") {
        resortImage.src = "assets/images/winter.jpg"
    }
}

// assigning variables to the HTML elements that change
var winsText = document.getElementById("wins");
var wordDisplay = document.getElementById("word-display");
var attemptsText = document.getElementById("guesses-left");
var guessesText = document.getElementById("already-guessed");
var resortImage = document.getElementById("resortImg");

for (var i = 0; i < computerChoice.length; i++) {
    hiddenWord[i] = "-";
}
wordDisplay.textContent = hiddenWord.join("");

for (var i = 0; i < computerChoice.length; i++) {
    computerWord[i] = computerChoice[i];
}

document.onkeyup = function(event) {
    var letter = event.key.toLowerCase();

    // checking that the input is a letter and has not been guessed
    if ((userOptions.indexOf(letter) > -1) && (guesses.indexOf(letter) < 0)) {
        // checking if the input is in the computer word
        if (computerWord.indexOf(letter) > -1) {
            // replacing the "-" in the hidden word with the letter
            for (var i = 0; i < computerWord.length; i++) {
                if (letter === computerWord[i]) {
                    hiddenWord[i] = letter;
                    wordDisplay.textContent = hiddenWord.join("");
                }
            }

            // updating the guessed letters
            guesses += letter;
            guessesText.textContent = guesses;
        } else {
            // lose an attempt for an incorrect guess
            attempts -= 1;
            attemptsText.textContent = attempts;

            // updating the guessed letters
            guesses += letter;
            guessesText.textContent = guesses;
        }

        // conditions for a win
        if (checkArrays(hiddenWord, computerWord)) {
            numWins += 1;
            winsText.textContent = numWins;
            displayPhoto(computerChoice);
            resetGame();
        }
        // conditions for a loss
        if (attempts === 0) {
            resetGame();
        }
    }
}