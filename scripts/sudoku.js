export default class Sudoku {

    constructor() {
        this.sudokuArray = new Array();
    }

    initSudoku() {

        this.fillArrays(0);
        this.fillArrays(3);
        this.fillArrays(6);
    }

    fillArrays(index) {

        for (let i = index; i < index + 3; i++) {
            this.sudokuArray[i] = new Array();
        }

        let row = 0;
        while (row < 3) {

            this.randomUploadArray(index);
            row++;
        }

        for (let i = index; i < index + 3; i++) {

            for (let j = 0; j < this.sudokuArray[i].length; j++) {

                let c = 0;

                while (this.getColNumbersArray(i, j).includes(this.sudokuArray[i][j])) {

                    let changeElement = this.sudokuArray[i][j];

                    if (j + c >= this.sudokuArray[i].length) {

                        this.sudokuArray[i][j] = this.sudokuArray[i][0];
                        this.sudokuArray[i][0] = changeElement;
                    } else {

                        this.sudokuArray[i][j] = this.sudokuArray[i][j + c];
                        this.sudokuArray[i][j + c] = changeElement;
                    }
                    c++;
                    if (c >= 9) {
                        this.fillArrays(index);
                        break;
                    }
                }
            }
        }

        let notDuplicated = 0;
        for (let j = 0; j < 9; j += 3) {

            if (!this.findDuplicatedInRow(this.getRowNumbersArray(index, j))) notDuplicated++;
        }
        if (notDuplicated <= 2) this.fillArrays(index);
    }

    findDuplicatedInRow(array) {

        for (let i = 0; i < array.length; i++) {

            for (let j = i + 1; j < array.length; j++) {

                if (array[i] === array[j]) return true;
            }
        }
        return false;
    }

    randomUploadArray(arrayIndex) {

        let randomNumbers;
        let step;
        let successGenerate;

        do {

            step = 0;
            successGenerate = true;
            randomNumbers = this.generateRandomNumbersRow(arrayIndex + step);
            for (let i = 0; i < randomNumbers.length; i++) {

                if (this.sudokuArray[arrayIndex + step].includes(randomNumbers[i])) successGenerate = false;
                if ((i + 1) % 3 === 0) step++;
            }
            if (successGenerate) {

                step = 0;
                for (let i = 0; i < randomNumbers.length; i++) {

                    if ((i + 1) % 3 === 0) step++;
                }
            }
        } while (!successGenerate);

        step = 0;
        for (let i = 0; i < randomNumbers.length; i++) {

            this.sudokuArray[arrayIndex + step].push(randomNumbers[i]);
            if ((i + 1) % 3 === 0) step++;
        }
    }

    getColNumbersArray(arrayIndex, numberIndex) {

        let colNumbers = new Array();

        while (arrayIndex > -1) {

            numberIndex -= 3;
            if (numberIndex < 0) {
                arrayIndex -= 3;
                numberIndex += 9;
                if (arrayIndex < 0) return colNumbers;
            }
            colNumbers.push(this.sudokuArray[arrayIndex][numberIndex]);

        }
        return colNumbers;
    }

    getRowNumbersArray(arrayIndex, row) {

        const rowNumbers = new Array();

        for (let i = 0; i < 3; i++) {

            for (let j = 0; j < 3; j++) {

                rowNumbers.push(this.sudokuArray[arrayIndex + i][j + row]);
            }
        }
        return rowNumbers;
    }

    generateRandomNumbersRow() {

        const rowNumbers = new Array();
        for (let i = 1; i <= 9; i++) {

            rowNumbers.push(i);
        }
        let nineNumberArray = new Array();
        let numberOfIndex;

        while (rowNumbers.length > 0) {

            let randomNumber;

            numberOfIndex = this.getRandomInt(rowNumbers.length);
            randomNumber = rowNumbers[numberOfIndex];

            rowNumbers.splice(numberOfIndex, 1);

            nineNumberArray.push(randomNumber);
        }

        return nineNumberArray;
    }

    checkTable() {
        let success = true;
        for (let i = 1; i <= 9; i++) {

            for (let j = 1; j <= 9; j++) {
                const input = document.getElementById(`${i}${j}`);
                const inputValue = input.value;

                if (inputValue != this.sudokuArray[i - 1][j - 1]) {

                    input.classList.add('red');
                    success = false;
                }
            }
        }

        if (success) {
            alert('Congratulations, you have successfully completed the sudoku!');
        }
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
}



