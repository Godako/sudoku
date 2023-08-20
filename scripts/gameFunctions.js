export default class gameFunctions {
    constructor(sudoku) {
        this.sudoku = sudoku;
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    validateInput(input) {
        if (
            input.value !== '1' &&
            input.value !== '2' &&
            input.value !== '3' &&
            input.value !== '4' &&
            input.value !== '5' &&
            input.value !== '6' &&
            input.value !== '7' &&
            input.value !== '8' &&
            input.value !== '9') {

            input.value = '';
        } else {
            input.classList.remove('red');
        }
    }

    uploadSudokuTable() {

        let j = 1;
        this.sudoku.sudokuArray.forEach(element => {

            for (let i = 0; i < element.length; i++) {

                const input = document.getElementById(`${j}${i + 1}`);
                if (this.getRandomInt(2)) {

                    input.value = element[i];
                    input.disabled = true;
                }
                (j % 2 !== 0) ? input.className += 'odd' : input.className += 'even';
            }
            j++;
        });
    }

    newGame() {
        this.clearTable();
        setTimeout(() => {
            this.sudoku.initSudoku();
            this.uploadSudokuTable();
        }, 100);
    }

    clearTable() {
        document.querySelectorAll('input').forEach(input => {
            input.value = null;
            input.disabled = false;
            input.classList.remove('odd');
            input.classList.remove('even');
            input.classList.remove('red');
        });
    }

    clearErrors() {
        document.querySelectorAll('.red').forEach(input => input.classList.remove('red'));
    }
}
