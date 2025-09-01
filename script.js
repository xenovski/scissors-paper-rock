// ===== GAME CONFIGURATION =====
const GAME_CONFIG = {
    MAX_ROUNDS: 5,
    CHOICES: ["rock", "paper", "scissors"],
    BEATS_MAP: {
        "rock": "scissors",
        "paper": "rock", 
        "scissors": "paper"
    }
};

// ===== GAME STATE =====
const gameState = {
    humanScore: 0,
    computerScore: 0,
    round: 0
};

// ===== UTILITY FUNCTIONS =====
function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * GAME_CONFIG.CHOICES.length);
    return GAME_CONFIG.CHOICES[randomIndex];
}

function updateScoreDisplay() {
    document.querySelector("#humanScore").textContent = gameState.humanScore;
    document.querySelector("#computerScore").textContent = gameState.computerScore;
    document.querySelector("#round").textContent = gameState.round;
}

function removeElementById(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.remove();
    }
}

function createResultElement(text, elementId) {
    const element = document.createElement("div");
    element.id = elementId;
    element.textContent = text;
    document.body.appendChild(element);
}

// ===== GAME LOGIC =====
function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return { result: "It's a tie!", playerWins: null };
    }
    
    const playerWins = GAME_CONFIG.BEATS_MAP[playerChoice] === computerChoice;
    const result = playerWins ? "You win!" : "You lose!";
    
    return { result, playerWins };
}

function endGame() {
    // Clean up any existing game over message
    removeElementById("gameOver");
    
    // Determine winner
    let gameResult;
    if (gameState.humanScore > gameState.computerScore) {
        gameResult = "Congratulations! You won the game! 🎉";
    } else if (gameState.computerScore > gameState.humanScore) {
        gameResult = "Game Over! The computer won! 😔";
    } else {
        gameResult = "It's a tie! Good game! 🤝";
    }
    
    // Display final results
    const finalScore = `Final Score - You: ${gameState.humanScore}, Computer: ${gameState.computerScore}`;
    const gameOverText = `${gameResult}\n${finalScore}\n\nClick any button to play again!`;
    
    createResultElement(gameOverText, "gameOver");
    
    // Disable buttons temporarily
    disableButtons();
    
    // Re-enable buttons after a short delay
    setTimeout(() => {
        enableButtons();
    }, 2000);
}

function disableButtons() {
    CHOICES.forEach(choice => {
        const button = document.querySelector(`#${choice}Button`);
        button.disabled = true;
        button.style.opacity = "0.5";
    });
}

function enableButtons() {
    CHOICES.forEach(choice => {
        const button = document.querySelector(`#${choice}Button`);
        button.disabled = false;
        button.style.opacity = "1";
    });
}

function updateScore(playerWins) {
    gameState.round++;
    
    if (playerWins === true) {
        gameState.humanScore++;
    } else if (playerWins === false) {
        gameState.computerScore++;
    }
    
    updateScoreDisplay();
    
    // Check if game is over
    if (gameState.round >= MAX_ROUNDS) {
        endGame();
    }
}

function playRound(playerChoice, computerChoice) {
    // Clean up previous results
    removeElementById("result");
    
    // Determine winner and update score
    const { result, playerWins } = determineWinner(playerChoice, computerChoice);
    updateScore(playerWins);
    
    // Display result
    const resultText = `You chose ${playerChoice} and the computer chose ${computerChoice}. ${result}`;
    createResultElement(resultText, "result");
}

function resetGame() {
    gameState.humanScore = 0;
    gameState.computerScore = 0;
    gameState.round = 0;
    updateScoreDisplay();
    
    // Clean up display elements
    removeElementById("result");
    removeElementById("yourChoice");
    removeElementById("gameOver");
}

function handlePlayerChoice(choice) {
    // If game is over, clicking any button starts a new game
    if (gameState.round >= MAX_ROUNDS) {
        resetGame();
    }
    
    // Clean up previous choice display
    removeElementById("yourChoice");
    
    // Show player's choice
    createResultElement(`${choice}!`, "yourChoice");
    
    // Play the round
    playRound(choice, getComputerChoice());
}

function initializeGame() {
    CHOICES.forEach(choice => {
        const button = document.querySelector(`#${choice}Button`);
        button.addEventListener("click", () => handlePlayerChoice(choice));
    });
}

document.addEventListener("DOMContentLoaded", initializeGame);
