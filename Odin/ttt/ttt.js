const gameBoard = (function () {
    // the constructor...
    let board = ['','','','','','','','','']

    // Access board object
    const getBoard = () => board;

    // Check if board is full
    // const fullBoard = () => {
    //     for (let i = 0; i < board.length; i++) {
    //         if (board[i] != '') {
    //             return true;
    //         }
    //     }
    //     return false;
    // }

    const resetBoard = () => {
        board = ['','','','','','','','','']
    }

    const markCell = (mark, cell) => {
        if (board[cell] == '') {
            board[cell] = mark;
            return true
        } else {
            return false;
        }
    };

    // Check if there is a winner returns player mark if winner, draw if draw, else cont
    const checkWinner = () => {
        let winner;
        const winningMoves = [
            [0,1,2], [3,4,5], [6,7,8], // rows
            [0,3,6], [1,4,7], [2,5,8], // columns
            [0,4,8], [2,4,6] // diagonals]
        ];

        winningMoves.forEach(combination => {
            const [a,b,c] = combination;
            // console.log(`combination ${[board[a],board[b],board[c]]}`);
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                console.log("WINNER");
                winner = board[a];
            }
        });

        if (winner) {
            return winner;
        }

        if (!board.includes('')) {
            return 'draw';
        }

        return 'cont';
    }

    const displayBoard = () => {
        console.log(board);
    };


    return { getBoard, resetBoard, markCell, checkWinner, displayBoard }

})();

const createPlayer = function (name,mark) {
    return { name, mark }
}

const gameController = (function() {
    let player1, player2;
    let player1Score, player2Score;
    let currentPlayer;
    var title = document.getElementById("title");
    let endGame;

    const swapPlayer = () => {
        if (currentPlayer == player1) {
            currentPlayer = player2;
            
        } else {
            currentPlayer = player1;
        }
        title.innerHTML = `${currentPlayer.mark}'s turn`;
    }

    const getGameState = () => endGame;
    const getGameStats = () => [player1Score, player2Score];

    const startGame = () => {
        player1 = createPlayer("first", "X");
        player2 = createPlayer("second", "O");
        player1Score = 0, player2Score = 0;
        currentPlayer = player1;
        title.innerHTML = `TIC TAC TOE`;
        endGame = false;
        gameBoard.resetBoard();
        displayController.displayBoard();
    };

    const continueGame = () => {
        title.innerHTML = `TIC TAC TOE`;
        endGame = false;
        gameBoard.resetBoard();
        displayController.displayBoard();
    };

    const playerMove = (move) => {
        if(!endGame) {
            let valid = gameBoard.markCell(currentPlayer.mark, move);
            if (valid) {
                result = gameBoard.checkWinner();
                swapPlayer();
                if (result == player1.mark) {
                    player1Score += 1;
                    title.innerHTML = `${player1.mark} Wins!`;
                    endGame = true;
                } else if (result == player2.mark) {
                    player2Score += 1;
                    title.innerHTML = `${player2.mark} Wins!`;
                    endGame = true;
                }
                else if (result == 'draw') {
                    endGame = true;
                    title.innerHTML = "Draw"
                }
                displayController.displayBoard();
                console.log(`result ${result}`);
            }
            
        } 
        
    };

    return { startGame, playerMove, getGameState, getGameStats, continueGame };

})();

const displayController = (function() {
     const display = document.getElementById("game-container");
     const gameScore = document.getElementById("game-score");
     const buttonDisplay = document.getElementById("game-buttons");
     

     const displayBoard = () => {
        display.innerHTML = "";
        gameScore.innerHTML = "";
        buttonDisplay.innerHTML = "";
        for (let i = 0; i < gameBoard.getBoard().length; i++) {
            const cell = document.createElement("div");
            cell.innerHTML = gameBoard.getBoard()[i];
            cell.classList.add("cell");
            if (gameBoard.getBoard()[i] == "X") {
                cell.style.color = 'rgb(187, 187, 187)';
            } else {
                cell.style.color = 'rgb(98, 98, 98)';
            }

            // Allow users to click the cell
            cell.addEventListener("click", () => {
                gameController.playerMove(i);
                return i;
            });

            display.appendChild(cell);
        }

        const score1 = document.createElement("div");
        const score2 = document.createElement("div");

        score1.classList.add("score");
        score2.classList.add("score");

        score1.innerHTML = `Player 1: ${gameController.getGameStats()[0]}`;
        score2.innerHTML = `Player 2: ${gameController.getGameStats()[1]}`;
        
        gameScore.appendChild(score1)
        gameScore.appendChild(score2)

        if (gameController.getGameState() == true) {
            let buttonReset = document.createElement("button");
            let buttonRestart = document.createElement("button");
            console.log("HERE")

            buttonRestart.classList.add("button-restart");
            buttonReset.classList.add("button-reset");

            buttonReset.textContent = "Reset";
            buttonRestart.textContent = "Restart";

            buttonRestart.addEventListener("click", () => {
                gameController.continueGame();
            });

            buttonReset.addEventListener("click", () => {
                gameController.startGame();
            });

            buttonDisplay.appendChild(buttonRestart);
            buttonDisplay.appendChild(buttonReset);


        }
    }

    return { displayBoard };
})();


gameController.startGame();