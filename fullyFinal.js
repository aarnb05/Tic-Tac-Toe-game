let startMusic = new Audio("start.mp3");
let clickMusic = new Audio("click.wav");
let endMusic = new Audio("end.wav");

let boxes = document.querySelectorAll(".boxes");
let resetButton = document.querySelector(".reset");
let output = document.querySelector(".output");
let player1Score = 0;
let player2Score = 0;
let currentPlayer = "xx";
let gameActive = true;

startMusic.play();

function handleBoxClick(event) {
    if (!gameActive) return;

    let box = event.target;
    if (box.classList.contains("xx") || box.classList.contains("oo")) return;

    clickMusic.play();
    box.classList.add(currentPlayer);

    if (checkWin()) {
        endMusic.play();
        gameActive = false;
        output.textContent = (currentPlayer === "xx" ? "Player 1" : "Player 2") + " wins!";
        updateScore();
        clearValues();
    } else if (isDraw()) {
        output.textContent = "It's a draw!";
        gameActive = false;
        clearValues();
    } else {
        currentPlayer = currentPlayer === "xx" ? "oo" : "xx";
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    const elements = Array.from(boxes).map(box => box.classList.contains("xx") ? "xx" : box.classList.contains("oo") ? "oo" : null);

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return elements[a] && elements[a] === elements[b] && elements[a] === elements[c];
    });
}

function isDraw() {
    return Array.from(boxes).every(box => box.classList.contains("xx") || box.classList.contains("oo"));
}

function updateScore() {
    if (currentPlayer === "xx") {
        player1Score++;
        document.querySelector(".plr1").textContent = player1Score;
    } else {
        player2Score++;
        document.querySelector(".plr2").textContent = player2Score;
    }
}

function resetGame() {
    gameActive = true;
    currentPlayer = "xx";
    boxes.forEach(box => {
        box.classList.remove("xx", "oo");
    });
    output.textContent = "";
}

function clearValues() {
    setTimeout(() => {
        resetGame();
    }, 2000);
}

boxes.forEach(box => box.addEventListener("click", handleBoxClick));
resetButton.addEventListener("click", resetGame);
