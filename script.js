let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function getPlayerChoice() {
    const playerSelection = prompt("The score is you: " + humanScore + " to computer: " + computerScore + ". \nEnter your choice: [rock, paper, scissors]");
    if (playerSelection === "rock" || playerSelection === "paper" || playerSelection === "scissors") {
        return playerSelection;
    } else {
        return getPlayerChoice();
    }
}

function playRound(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        console.log("You chose " + playerChoice);
        console.log("The computer chose " + computerChoice);
        console.log("It's a tie!");
    } else if (playerChoice === "scissors" && computerChoice === "rock") {
        console.log("You chose " + playerChoice);
        console.log("The computer chose " + computerChoice);
        console.log("You lose!");
        computerScore++;
    } else if (playerChoice === "scissors" && computerChoice === "paper") {
        console.log("You chose " + playerChoice);
        console.log("The computer chose " + computerChoice);
        console.log("You win!");
        humanScore++;
    } else if (playerChoice === "paper" && computerChoice === "rock") {
        console.log("You chose " + playerChoice);
        console.log("The computer chose " + computerChoice);
        console.log("You win!");
        humanScore++;
    } else if (playerChoice === "paper" && computerChoice === "scissors") {
        console.log("You chose " + playerChoice);
        console.log("The computer chose " + computerChoice);
        console.log("You lose!");
        computerScore++;
    } else if (playerChoice === "rock" && computerChoice === "paper") {
        console.log("You chose " + playerChoice);
        console.log("The computer chose " + computerChoice);
        console.log("You lose!");
        computerScore++;
    } else if (playerChoice === "rock" && computerChoice === "scissors") {
        console.log("You chose " + playerChoice);
        console.log("The computer chose " + computerChoice);
        console.log("You win!");
        humanScore++;
    }
}

for (let i = 0; i < 5; i++) {
    playRound(getPlayerChoice(), getComputerChoice());
    if (i === 4) {
        prompt("The final score is you: " + humanScore + " to computer: " + computerScore + ".");
    }
}