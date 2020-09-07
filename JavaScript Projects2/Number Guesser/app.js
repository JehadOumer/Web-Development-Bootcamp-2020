//Game Values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max);
    guessesLeft = 3;
//UI Element
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn')
      guessInput = document.querySelector('#guess-input')
      message = document.querySelector('.message');

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//play again event listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});
//Listen for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);
    
    //validate
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    //Check if won
    if(guess === winningNum){
        //Game over - won

        gameOver(true, `${winningNum} is correct!, YOU WIN!`);
    
    }
    else {
        //wrong number
        guessesLeft -= 1;
        if(guessesLeft ===0) {
            //Game over - lost
            gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);
        }
        else{
            //game continues - answer wrong
            //change border color
            guessInput.style.borderColor = 'red';
            guessInput.value = '';
            //tell user it is wrong number
            setMessage(`${guess} is not correct. ${guessesLeft} guesses left`, `red`);

        }
    }
});

//Game over
function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : color = 'red';

    guessInput.disabled = true;
    //change border color
    guessInput.style.borderColor = color;
    // set text color
    message.style.color = color;
    //set message
    setMessage(msg);

    //Play again
    guessBtn.value = 'Play Again';
    guessBtn.className +='play-again';

};
//get winning number
function getRandomNum(min, max){
   return Math.floor(Math.random()*(max-min+1)+min);

};
//set message
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
};
