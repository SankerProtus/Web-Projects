// Global variables
let randomNumber1 = 0;
let randomNumber2 = 0;
let player1HasRolled = false;
let player2HasRolled = false;

// Get buttons
const player1Button = document.querySelectorAll('button')[0];
const player2Button = document.querySelectorAll('button')[1];
const newGameButton = document.querySelectorAll('button')[2];
const heading = document.querySelector('h1');

// Check For Winner Function
function checkWinner() {
    if (player1HasRolled && player2HasRolled) {

        if (randomNumber1 > randomNumber2) {
            heading.innerHTML = '🏆Player 1 Wins! 🎉';
        } else if (randomNumber2 > randomNumber1) {
            heading.innerHTML = '🏆Player 2 Wins! 🎉';
        } else {
            heading.innerHTML = ' 🤝 Draw!';
        }

        // Reset flags for next round
        player1HasRolled = false;
        player2HasRolled = false;

        // Re-enable buttons for next round after 2 seconds
        setTimeout(() => {
            player1Button.disabled = false;
            player2Button.disabled = false;
            player1Button.innerHTML = 'Roll Dice';
            player2Button.innerHTML = 'Roll Dice';
            heading.innerHTML = 'Dicee Game';
        }, 2000);
    }
}

// Palyer 1 Roll Function
player1Button.addEventListener('click', () => {
    randomNumber1 = Math.floor(Math.random() * 6) + 1;

    const image1Path = `./images/dice${randomNumber1}.png`;

    const changePlayer1Dice = document.querySelectorAll('img')[0];

    changePlayer1Dice.setAttribute('src', image1Path);
    
    player1HasRolled = true;

    player1Button.innerHTML = 'Rolled.';

    player1Button.disabled = true;

    checkWinner();
});

// Player 2 Roll Function
player2Button.addEventListener('click', () => {
    randomNumber2 = Math.floor(Math.random() * 6) + 1;

    const image2Path = `./images/dice${randomNumber2}.png`;

    const changePlayer2Dice = document.querySelectorAll('img')[1];

    changePlayer2Dice.setAttribute('src', image2Path);
    
    player2HasRolled = true;

    player2Button.innerHTML = 'Rolled.';

    player2Button.disabled = true;

    checkWinner();
});


newGameButton.addEventListener('click', () => {
    // Reset dice images back to dice 6
    document.querySelectorAll('img')[0].setAttribute('src', './images/dice6.png');
    document.querySelectorAll('img')[1].setAttribute('src', './images/dice6.png');

    // Reset button text
    player1Button.innerHTML = 'Roll Dice';
    player2Button.innerHTML = 'Roll Dice';

    // Enable buttons
    player1Button.disabled = false;
    player2Button.disabled = false;

    // Reset h1 heading
    heading.innerHTML = 'Dicee Game.';

    // Reset player flags
    player1HasRolled = false;
    player2HasRolled = false;
});
