import gameFunctions from './gameFunctions.js';
import Sudoku from './sudoku.js';

const sudoku = new Sudoku();
window.operator = new gameFunctions(sudoku);

window.operator.clearTable();
window.operator.newGame();