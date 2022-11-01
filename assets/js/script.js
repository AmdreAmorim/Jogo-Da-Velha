const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageTextElement = document.querySelector("[data-winning-message-text]");
const winningMessage = document.querySelector("[data-winning-message]");
const restartButton = document.querySelector("[data-restart-button]");

let isOTurn;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const startGame = () => {
    isOTurn = false;
    for (const cell of cellElements) {
        cell.classList.remove("x");
        cell.classList.remove("o");
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true });
    }

    setBoardHoverClass();
    winningMessage.classList.remove("show-winning-message");
};

const endGame = (isDraw) => {
    if (isDraw) {
        winningMessageTextElement.innerText = "Empate!";
    } else {
        winningMessageTextElement.innerHTML = isOTurn ? "O<br/>Venceu" : "X<br/>Venceu";
    }
    winningMessage.classList.add("show-winning-message");
};

const checkForWin = (currentPlayer) => {
    return winningCombinations.some((combination) => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
};

const checkForDraw = () => {
    return [...cellElements].every((cell) => {
        return cell.classList.contains("x") || cell.classList.contains("o");
    });
};

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
};

const setBoardHoverClass = () => {
    board.classList.remove("o");
    board.classList.remove("x");

    if (isOTurn) {
        board.classList.add("o");
    } else {
        board.classList.add("x");
    }
};

const swapTurns = () => {
    isOTurn = !isOTurn;
    setBoardHoverClass();
};

const handleClick = (e) => {
    //Colocar a marca (x ou o)
    const cell = e.target;
    const classToAdd = isOTurn ? "o" : "x";
    placeMark(cell, classToAdd);

    //Verificar Por Vitoria
    const isWin = checkForWin(classToAdd);

    //  Verificar Por Empate

    const isDraw = checkForDraw();

    if (isWin) {
        endGame(false);
    } else if (isDraw) {
        endGame(true);
    } else {
        //Mudar Simbolo
        swapTurns();
    }
};

startGame();

restartButton.addEventListener("click", startGame);
