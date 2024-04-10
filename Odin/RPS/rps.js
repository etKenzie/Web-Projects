const choices = ["rock", "paper", "scissors"];

const rock = document.querySelector("#rock");
const paper = document.querySelector("#paper");
const scissors = document.querySelector("#scissors");
const resultText = document.querySelector("#resultText");

let playerScore = 0, computerScore = 0;



function getComputerChoice() {
    const index = Math.floor(Math.random() * choices.length);
    return choices[index];
};

function playRound(playerSelection, computerSelection) {
    // your code here!
    playerSelection = playerSelection.toLowerCase();
    let result;
    if (playerSelection === computerSelection) {
        result = "tie";
    } else if (playerSelection === "rock" && computerSelection === "paper") {
        computerScore += 1;
        result = "lose";
    } else if (playerSelection === "paper" && computerSelection === "scissors") {
        computerScore += 1;
        result = "lose";
    } else if (playerSelection === "scissors" && computerSelection === "rock") {
        computerScore += 1;
        result = "lose";
    } else if (playerSelection === "rock" && computerSelection === "scissors") {
        playerScore += 1; 
        result = "win";
    } else if (playerSelection === "paper" && computerSelection === "rock") {
        playerScore += 1; 
        result = "win";
    } else if (playerSelection === "scissors" && computerSelection === "paper") {
        playerScore += 1; 
        result = "win";
    } 
    
    
    
    resultText.textContent = result;
    score.textContent = `Player Score: ${playerScore}, Computer Score: ${computerScore}`;
    resultText.appendChild(score);
    
    if (playerScore == 5) {
        resultText.textContent = "You Win the Game";
        playerScore = 0;
        computerScore = 0;
    } else if (computerScore == 5) {
        resultText.textContent = "You Lost the Game";
        playerScore = 0;
        computerScore = 0;
    }
    return result;
  }

  

const score = document.createElement("p");
score.style.border = "1px solid black";


    
rock.addEventListener("click", function (e) {
    playRound("rock", getComputerChoice());
    
});
paper.addEventListener("click", function (e) {
    playRound("paper", getComputerChoice());
});
scissors.addEventListener("click", function (e) {
    playRound("scissors", getComputerChoice());
});

// function playGame() {
//     let playerScore = 0, computerScore = 0;

//     for (let i = 0; i < 5; i++) {
//         let playerSelection;
       
//         const round = playRound(getPlayerChoice(),getComputerChoice());

//         console.log(round);
//         if (round == "win") {
//             playerScore += 1;
//         } else if (round == "lose") {
//             computerScore += 1;
//         } 
//     }

//     if (playerScore > computerScore) {
//         return "You Won the Game";
//     } else if (computerScore > playerScore) {
//         return "You Lost the Game";
//     } else {
//         return "You Tied the Game"
//     }
// }


// console.log(playGame())

