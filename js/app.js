"use strict";
//cached elements
// const squareEls = document.querySelectorAll(".square")
// const message = document.getElementById("message")!
// const resetBtnEl=document.getElementById("")
const squareEls = document.querySelectorAll(".sqr");
const messageEl = document.getElementById("message");
const resetBtnEl = document.getElementById("reset");
const boardEl = document.querySelector(".board");
//variables
let turn, winner, tie, board;
//constants
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8],
];
//event listeners
boardEl.addEventListener("click", handleClick);
resetBtnEl.addEventListener("click", init);
//functions
init();
function init() {
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    turn = 1;
    winner = false;
    tie = false;
    render();
}
function handleClick(evt) {
    if (!(evt.target instanceof HTMLElement))
        return;
    const sqIdx = parseInt(evt.target.id.slice(2));
    console.log(sqIdx);
    if (board[sqIdx] !== 0) {
        return;
    }
    else if (winner === true) {
        return;
    }
    placePiece(sqIdx);
    checkForTie();
    checkForWinner();
    switchPlayerTurn();
    render();
}
function placePiece(sqIdx) {
    return (board[sqIdx] = turn);
}
function checkForTie() {
    const hasNull = board.some(function (element) {
        return element === 0;
    });
    //console.log(hasNull)
    if (hasNull === true) {
        return (tie = false);
    }
    else {
        return (tie = true);
    }
}
function checkForWinner() {
    winningCombos.forEach(function (winArr) {
        if (Math.abs(board[winArr[0]] + board[winArr[1]] + board[winArr[2]]) === 3) {
            winner = true;
        }
    });
}
function switchPlayerTurn() {
    if (winner === true) {
        return;
    }
    else {
        return turn *= -1;
    }
}
function render() {
    updateBoard();
    updateMessage();
}
function updateBoard() {
    board.forEach(function (element, idx) {
        let sqrValue = element;
        if (element === 0) {
            squareEls[idx].textContent = "";
        }
        else if (element === 1) {
            squareEls[idx].textContent = "X";
        }
        else if (element === -1) {
            squareEls[idx].textContent = "O";
        }
    });
}
function updateMessage() {
    if (winner === false && tie === false && turn === -1) {
        messageEl.textContent = "Player 1 it's your turn.";
    }
    else if (winner === false && tie === false && turn === 1) {
        messageEl.textContent = "Player 2 it's your turn.";
    }
    else if (winner === false && tie === true) {
        messageEl.textContent = "It's a tie.";
    }
    else if (winner === true && turn === -1) {
        messageEl.textContent = "Player 1 WINS";
    }
    else if (winner === true && turn === 1) {
        messageEl.textContent = "Player 2 WINS";
    }
    else {
        messageEl.textContent = "";
    }
}
