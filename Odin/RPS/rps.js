const choices = ["rock", "paper", "scissors"];

function getComputerChoice() {
    const index = Math.floor(Math.random() * choices.length);
    return choices[index];
};

function playRound(playerSelection, computerSelection) {
    // your code here!
    playerSelection = playerSelection.toLowerCase();
    if (playerSelection === computerSelection) {
        return "tie";
    } else if (playerSelection === "rock" && computerSelection === "paper") {
        return "lose";
    } else if (playerSelection === "paper" && computerSelection === "scissors") {
        return "lose";
    } else if (playerSelection === "scissors" && computerSelection === "rock") {
        return "lose";
    } else if (playerSelection === "rock" && computerSelection === "scissors") {
        return "win";
    } else if (playerSelection === "paper" && computerSelection === "rock") {
        return "win";
    } else if (playerSelection === "scissors" && computerSelection === "paper") {
        return "win";
    } 
  }

function playGame() {
    let playerScore = 0, computerScore = 0;

    for (let i = 0; i < 5; i++) {
        let playerSelection;
        while(true) {
            playerSelection = prompt("Rock, Paper, or Scissors?");
            if (choices.includes(playerSelection)) {
                break;
            }
            console.log("Please give valid Input")
        }
       
        const round = playRound(playerSelection,getComputerChoice());

        console.log(round);
        if (round == "win") {
            playerScore += 1;
        } else if (round == "lose") {
            computerScore += 1;
        } 
    }

    if (playerScore > computerScore) {
        return "You Won the Game";
    } else if (computerScore > playerScore) {
        return "You Lost the Game";
    } else {
        return "You Tied the Game"
    }
}


console.log(playGame())

