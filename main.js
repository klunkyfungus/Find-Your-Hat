const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(fieldArray) {
        this.field = fieldArray;
        this.rowPos = 0;
        this.colPos = 0;
        this.gameOver = false;
        this.foundHat = false;
    }

    static generateField(width, height) {
        let newFieldArray = [];
        let includesHat = false;
        for (let i = 0; i < height; i++) {
            let newRowArray = [];
            if (i === 0) {
                newRowArray.push(pathCharacter);
                for (let j = (width - 2); j >= 0; j--) {
                    let fieldSpace = Math.floor(Math.random() * 6);
                    switch (fieldSpace) {
                        case 0:
                            newRowArray.push(fieldCharacter);
                            break;
                        case 1:
                            newRowArray.push(hole);
                            break;
                        case 2:
                            newRowArray.push(hole);
                            break;
                        case 3:
                            newRowArray.push(fieldCharacter);
                            break;
                        case 4:
                            newRowArray.push(fieldCharacter);
                            break;
                        case 5:
                            newRowArray.push(fieldCharacter);
                            break;
                    }
                }
                newFieldArray.push(newRowArray);
            } else if (i === (height - 1) && !includesHat) {
                newRowArray.push(hat);
                for (let j = width - 2; j >= 0; j--) {
                    let fieldSpace = Math.floor(Math.random() * 6);
                    switch (fieldSpace) {
                        case 0:
                            newRowArray.push(fieldCharacter);
                            break;
                        case 1:
                            newRowArray.push(hole);
                            break;
                        case 2:
                            newRowArray.push(hole);
                            break;
                        case 3:
                            newRowArray.push(fieldCharacter);
                            break;
                        case 4:
                            newRowArray.push(fieldCharacter);
                            break;
                        case 5:
                            newRowArray.push(fieldCharacter);
                            break;
                    } 
                }
                newFieldArray.push(newRowArray);
            } else {
                for (let j = width - 1; j >= 0; j--) {
                    let fieldSpace = Math.floor(Math.random() * 6);
                    switch (fieldSpace) {
                        case 0:
                            newRowArray.push(fieldCharacter);
                            break;
                        case 1:
                            newRowArray.push(hole);
                            break;
                        case 2:
                            if (!includesHat && (Math.floor(Math.random() * 3) * fieldSpace === 4)) {
                                newRowArray.push(hat);
                                includesHat = true;
                            } else {
                                newRowArray.push(hole);
                            }
                            break;
                        case 3:
                            newRowArray.push(fieldCharacter);
                            break;
                        case 4:
                            newRowArray.push(fieldCharacter);
                            break;
                        case 5:
                            newRowArray.push(fieldCharacter);
                            break;
                    }
                }
                newFieldArray.push(newRowArray);
            }
        
        }
        return newFieldArray;
    }

    print() {
        for (const row of this.field) {
            console.log(row.join(''));
        }

    }

    rowChange(userMove) {
        if (userMove === 'w') {
            this.rowPos += -1;
        } else if (userMove === 's') {
            this.rowPos += 1;
        }

        if (this.rowPos < 0 || this.rowPos === this.field.length) {
            console.log('Oh no, you have gone outside the boundary! GAME OVER.');
            this.gameOver = true;
        } else if (this.field[this.rowPos][this.colPos] === hole) {
            console.log('Oh no, you have fallen into a hole! GAME OVER.');
            this.gameOver = true;
        } else {
            this.wonGame();
            this.field[this.rowPos].splice(this.colPos, 1, pathCharacter);
            this.print();
        }
        
    }

    colChange(userMove) {
        if (userMove === 'a') {
            this.colPos += -1;
        } else if (userMove === 'd') {
            this.colPos += 1;
        }

        if (this.colPos < 0 || this.colPos === this.field[this.rowPos].length) {
            console.log('Oh no, you have gone outside the boundary! GAME OVER.');
            this.gameOver = true;
        } else if (this.field[this.rowPos][this.colPos] === hole) {
            console.log('Oh no, you have fallen into a hole! GAME OVER.');
            this.gameOver = true;
        } else {
            this.wonGame();
            this.field[this.rowPos].splice(this.colPos, 1, pathCharacter);
            this.print();
        }
    }

    wonGame() {
        let hatRow = this.field.findIndex(x => x.includes(hat));
        //console.log(hatRow);
        let hatCol = this.field[hatRow].findIndex(x => x.includes(hat));
        
        if (hatRow === this.rowPos && hatCol === this.colPos) {
            this.foundHat = true;
            console.log('CONGRADULATIONS! You have found your hat!');
        }  
    }

    gameStart() {
        this.print();

        while (!this.foundHat && !this.gameOver) {
            let userMove = prompt('Use keys W, A, S, D (Up, Left, Down, Right) to move around the board and find your hat! ');
            if (userMove === 'w' || userMove === 's') {
                this.rowChange(userMove);
                //console.log('hello');
            } else if (userMove === 'a' || userMove === 'd') {
                this.colChange(userMove);
            }
            
        }
    }
}

const gameFieldArr = Field.generateField(5,6);
const gameField = new Field(gameFieldArr);

gameField.gameStart();
//console.log(gameField.field[gameField.rowPos][gameField.colPos]);
//console.log(gameField.field.findIndex(x=>x.includes(hat)));
//console.log(gameField.field[gameField.field.findIndex(x=>x.includes(hat))].findIndex(x=>x.includes(hat)));
/*[
    [pathCharacter, fieldCharacter, fieldCharacter],
    [hole, hole, fieldCharacter],
    [hat, hole, fieldCharacter],
    [fieldCharacter, fieldCharacter, fieldCharacter]
]*/