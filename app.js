/*
  * Mini game: Tic-Tac-Toe
  * Author: Emmett
  * Date: 8th April
  * Copyright (C) 2020
*/

// ----
// Constants
// ----

const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const CELL_ELEMENTS = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const WIN_MSG_ELEMENT = document.getElementById('winning-message');
const RestartButton = document.getElementById('RestartButton');
const WIN_MSG_TXT_ELEMENT = document.querySelector('[data-winning-message-text]');

let circleTurn

// Auto start game
startGame()
RestartButton.addEventListener('click', startGame)

// ----
// Functions
// ----

function startGame()
{
  circleTurn = false
  CELL_ELEMENTS.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  WIN_MSG_ELEMENT.classList.remove('show')
}

function handleClick(e)
{
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

function endGame(draw)
{
  if (draw) {
    WIN_MSG_TXT_ELEMENT.innerText = 'Draw!'
  } else {
    WIN_MSG_TXT_ELEMENT.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
  }
  WIN_MSG_ELEMENT.classList.add('show')
}

function isDraw()
{
  return [...CELL_ELEMENTS].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

function placeMark(cell, currentClass)
{
  cell.classList.add(currentClass)
}

function swapTurns()
{
  circleTurn = !circleTurn
}

function setBoardHoverClass()
{
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}

function checkWin(currentClass)
{
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return CELL_ELEMENTS[index].classList.contains(currentClass)
    })
  })
}