let POSSIBLE_WORDS = ["obdurate", "verisimilitude", "defenestrate", "obsequious",
    "dissonant", "toady", "idempotent"];
let guesses = "";
let word = "";
let MAX_GUESSES = 6;
let guessCount = MAX_GUESSES;
let gameOver = true;

function newGame(){
    guesses = "";
    guessCount = MAX_GUESSES;
    gameOver = false;
    let randomIndex = parseInt(Math.random() * POSSIBLE_WORDS.length);
    word = POSSIBLE_WORDS[randomIndex];
    updateScreen();
    document.getElementById("guess").focus();
}

function guess(){
    if(gameOver) return;

    let input = document.getElementById("guess");
    let letter = input.value.toLowerCase();
    input.value = "";
    input.focus();

    if(letter === "") return;
    if(guesses.indexOf(letter) >= 0) return;

    if(word.indexOf(letter) < 0){
        guessCount--;
    }
    guesses += letter;
    updateScreen();
}

function updateScreen(){
    let clueString = "";
    for(let i = 0; i < word.length; i++){
        let letter = word.charAt(i);
        if(guesses.indexOf(letter) >= 0){
            clueString += letter + " ";
        }
        else{
            clueString += "_ ";
        }
    }
    let clue = document.getElementById("clue");
    clue.textContent = clueString;

    let guessArea = document.getElementById("guesses");
    guessArea.textContent = "Guessed Letters: " + guesses;

    let image = document.getElementById("hangmanpic");
    image.src = `images/hangman${guessCount}.gif`;

    if(clueString.indexOf("_") < 0){
        guessArea.textContent = "You win! The word was " + word + ".";
        gameOver = true;
    }
    else if(guessCount === 0){
        guessArea.textContent = "You lose! The word was " + word + ".";
        gameOver = true;
    }
}