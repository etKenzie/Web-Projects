const container = document.querySelector("#container");
const buttonSize = document.querySelector("#buttonSize");
const TOTAL_SIZE = 960;

function createGrid(number) {
    container.innerHTML = "";
    gridSize = `${TOTAL_SIZE / number}px`;

    for (let i = 0; i < number; i++) {
        const row = document.createElement("div");
    
        for (let j = 0; j < number; j++) {
            const gridItem = document.createElement("div");
            gridItem.style.width = gridSize;
            gridItem.style.height = gridSize;
            gridItem.classList.add("pixel");
            row.appendChild(gridItem.cloneNode(true));
        }
    
        container.appendChild(row);
    };
}

createGrid(16)

buttonSize.addEventListener("click", () => {
    let noSquares;
    while(true) {
        noSquares = prompt("Enter amount of Squares per Side");
        if (noSquares > 0 && noSquares <= 100) {
            break;
        }
    }
    createGrid(noSquares);
});



