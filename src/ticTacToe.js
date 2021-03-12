/* eslint-disable no-else-return */

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const board = {
    boardElem: [
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-']
    ],
    printBoard() {
        console.log('');
        console.log('    y0__y1__y2');
        for (let i = 0; i < this.boardElem.length; i++) {
            console.log(`x${i} |${this.boardElem[i].join(' | ')}|`);
        }
        console.log('');
    }
};

function AnalyzeWin() {
    this.victoryCheck = function victoryCheck() {
        for (let i = 0; i < 3; i++) {
            if (
                board.boardElem[i][0] == 'o'
                && board.boardElem[i][1] == 'o'
                && board.boardElem[i][2] == 'o'
            ) {
                console.log(`Victory for noughts in ${i} row. Congrats`);
                return true;
            } else if (
                board.boardElem[i][0] == 'x'
                && board.boardElem[i][1] == 'x'
                && board.boardElem[i][2] == 'x'
            ) {
                console.log(`Victory for crosses in ${i} row. Congrats`);
                return true;
            }
        }
        for (let j = 0; j < 3; j++) {
            if (
                board.boardElem[0][j] == 'o'
                && board.boardElem[1][j] == 'o'
                && board.boardElem[2][j] == 'o'
            ) {
                console.log(`Victory for noughts in ${j} column. Congrats`);
                return true;
            } else if (
                board.boardElem[0][j] == 'x'
                && board.boardElem[1][j] == 'x'
                && board.boardElem[2][j] == 'x'
            ) {
                console.log(`Victory for crosses in ${j} column. Congrats`);
                return true;
            }
        }
        if (
            board.boardElem[0][0] == 'o'
            && board.boardElem[1][1] == 'o'
            && board.boardElem[2][2] == 'o'
        ) {
            console.log('Victory for noughts in diagonally. Congrats');
            return true;
        }
        if (
            board.boardElem[0][0] == 'x'
            && board.boardElem[1][1] == 'x'
            && board.boardElem[2][2] == 'x'
        ) {
            console.log('Victory for crosses in diagonally. Congrats');
            return true;
        }
        if (
            board.boardElem[2][0] == 'o'
            && board.boardElem[1][1] == 'o'
            && board.boardElem[0][2] == 'o'
        ) {
            console.log('Victory for noughts in diagonally. Congrats');
            return true;
        }
        if (
            board.boardElem[2][0] == 'x'
            && board.boardElem[1][1] == 'x'
            && board.boardElem[0][2] == 'x'
        ) {
            console.log('Victory for crosses in diagonally. Congrats');
            return true;
        }
        return false;
    };
}

AnalyzeWin.prototype = board;
const analyzeWin = new AnalyzeWin();

function questionAboutRow() {
    return new Promise((resolve) => {
        rl.question('Input your row coordinate: ', (rowCoordinate) => {
            resolve(rowCoordinate);
        });
    });
}

function questionAboutColumn() {
    return new Promise((resolve) => {
        rl.question(
            'Input your column coordinate: ',
            (columnCoordinate) => {
                resolve(columnCoordinate);
            }
        );
    });
}

function questionAboutFigure() {
    return new Promise((resolve) => {
        rl.question('Choose your figure (x or o): ', (inputFigure) => {
            resolve(inputFigure);
        });
    });
}

async function ticTacToe() {
    for (let counter = 0; counter < 9; counter++) {
        console.log(`The ${counter + 1} move`);
        board.printBoard();

        let rowCoordinate = await questionAboutRow();
        let columnCoordinate = await questionAboutColumn();
        const figure = await questionAboutFigure();

        rowCoordinate = Number(rowCoordinate);
        columnCoordinate = Number(columnCoordinate);

        if (
            rowCoordinate < 3
            && columnCoordinate < 3
            && board.boardElem[rowCoordinate][columnCoordinate] == '-'
            && (figure === 'o' || figure === 'x')
        ) {
            board.boardElem[rowCoordinate][columnCoordinate] = figure;
            board.printBoard();
            if (analyzeWin.victoryCheck()) {
                rl.close();
                return;
            }
        } else {
            counter--;
            console.log('Invalid coordinates or figure. Try again');
            console.log('');
        }
    }
    console.log('Dead heat');
    rl.close();
}

ticTacToe();
