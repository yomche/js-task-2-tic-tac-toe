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
        console.log('    y0__y1__y2');
        for (let i = 0; i < this.boardElem.length; i++) {
            console.log(`x${i} |${this.boardElem[i].join(' | ')}|`);
        }
        console.log('');
    },
};

function AnalyzeWin() {
    // eslint-disable-next-line func-names
    this.victoryCheck = function () {
        for (const i = 0; i < 3; i++) {
            if (
                board.boardElem[i][0] == 'o'
                && board.boardElem[i][1] == 'o'
                && board.boardElem[i][2] == 'o'
            ) {
                console.log(`Victory for noughts in ${i} row. Congratz`);
                return true;
            } else if (
                board.boardElem[i][0] == 'x' &&
                board.boardElem[i][1] == 'x' &&
                board.boardElem[i][2] == 'x'
            ) {
                console.log(`Victory for crosses in ${i} row. Congratz`);
                return true;
            }
        }
        for (let j = 0; j < 3; j++) {
            if (
                board.boardElem[0][j] == 'o'
                && board.boardElem[1][j] == 'o'
                && board.boardElem[2][j] == 'o'
            ) {
                console.log(`Victory for noughts in ${j} column. Congratz`);
                return true;
            } else if (
                board.boardElem[0][j] == 'x' &&
                board.boardElem[1][j] == 'x' &&
                board.boardElem[2][j] == 'x'
            ) {
                console.log(`Victory for crosses in ${j} column. Congratz`);
                return true;
            }
        }
        if (
            board.boardElem[0][0] == 'o' &&
            board.boardElem[1][1] == 'o' &&
            board.boardElem[2][2] == 'o'
        ) {
            console.log('Victory for noughts in diagonally. Congratz');
            return true;
        }
        if (
            board.boardElem[0][0] == 'x' &&
            board.boardElem[1][1] == 'x' &&
            board.boardElem[2][2] == 'x'
        ) {
            console.log('Victory for crosses in diagonally. Congratz');
            return true;
        }
        if (
            board.boardElem[2][0] == 'o' &&
            board.boardElem[1][1] == 'o' &&
            board.boardElem[0][2] == 'o'
        ) {
            console.log('Victory for noughts in diagonally. Congratz');
            return true;
        }
        if (
            board.boardElem[2][0] == 'x' &&
            board.boardElem[1][1] == 'x' &&
            board.boardElem[0][2] == 'x'
        ) {
            console.log('Victory for crosses in diagonally. Congratz');
            return true;
        }
        return false;
    };
}

AnalyzeWin.prototype = board;
const analyzeWin = new AnalyzeWin();

function questionAboutRow() {
    return new Promise(function (resolve) {
        rl.question('Input your row coordinate: ', function (row_coordinate) {
            resolve(row_coordinate);
        });
    });
}

function questionAboutColumn() {
    return new Promise(function (resolve) {
        rl.question(
            'Input your column coordinate: ',
            function (column_coordinate) {
                resolve(column_coordinate);
            }
        );
    });
}

function questionAboutFigure() {
    return new Promise(function (resolve) {
        rl.question('Choose your figure (x or o): ', function (inputFigure) {
            resolve(inputFigure);
        });
    });
}

async function ticTacToe() {
    for (let counter = 0; counter < 9; counter++) {
        console.log(`The ${counter + 1} move`);

        let row_coordinate = await questionAboutRow();
        let column_coordinate = await questionAboutColumn();
        let figure = await questionAboutFigure();

        row_coordinate = Number(row_coordinate);
        column_coordinate = Number(column_coordinate);

        if (
            row_coordinate < 3 &&
            column_coordinate < 3 &&
            board.boardElem[row_coordinate][column_coordinate] == '-' &&
            (figure === 'o' || figure === 'x')
        ) {
            board.boardElem[row_coordinate][column_coordinate] = figure;
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
