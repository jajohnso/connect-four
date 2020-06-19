import React, { Component } from 'react';
import Board from '../board/Board';

const BOARD_CONFIG = {
    HEIGHT: 6,
    WIDTH: 7,
};

class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            discs: Array(BOARD_CONFIG.HEIGHT * BOARD_CONFIG.WIDTH).fill(null),
            isWinner: false,
        };
    }

    getNextSlot = (rowIndex) => {
        let slotsInClickedRow = [];
        const { WIDTH } = BOARD_CONFIG;
        this.state.discs.forEach((disc, index) => {
            if (disc) {
                return;
            }

            if (rowIndex === index || index % WIDTH === rowIndex) {
                slotsInClickedRow.push(index);
            }
        });

        return slotsInClickedRow[slotsInClickedRow.length - 1];
    };

    handleOnDiscClick = (rowIndex) => {
        const discs = [...this.state.discs];
        const nextSlotIndex = this.getNextSlot(rowIndex);

        discs[nextSlotIndex] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            discs: discs,
            xIsNext: !this.state.xIsNext,
        });
    };

    checkForWinner = () => {
        let fourInARow = false;
        let matches = [];

        this.state.discs.forEach((disc, index) => {
            if (!disc || fourInARow) {
                return;
            }

            // horizontal check
            let horizontalFourInARow = {};
            if (index % BOARD_CONFIG.WIDTH <= 4) {
                horizontalFourInARow = this.checkForHorizontalMatches(disc, index);
            }

            // vertical check
            const minRemainingRowsToMatchVertical = Math.ceil(BOARD_CONFIG.HEIGHT - (index + 1) / BOARD_CONFIG.WIDTH);

            if (minRemainingRowsToMatchVertical >= 4) {
                let diagonalRightFourInARow = {};
                let diagonalLeftFourInARow = {};

                const verticalFourInARow = this.checkForVerticalMatches(disc, index);
                if (BOARD_CONFIG.WIDTH - index >= 4) {
                    diagonalRightFourInARow = this.checkForDiagonalRightMatches(disc, index);
                }
                if (BOARD_CONFIG.WIDTH - index <= 4) {
                    diagonalLeftFourInARow = this.checkForDiagonalLeftMatches(disc, index);
                }

                if (horizontalFourInARow.isFourInARow) {
                    matches = horizontalFourInARow.matches;
                    fourInARow = horizontalFourInARow.isFourInARow;
                }
                if (verticalFourInARow.isFourInARow) {
                    matches = verticalFourInARow.matches;
                    fourInARow = verticalFourInARow.isFourInARow;
                }
                if (diagonalLeftFourInARow.isFourInARow) {
                    matches = diagonalLeftFourInARow.matches;
                    fourInARow = diagonalLeftFourInARow.isFourInARow;
                }
                if (diagonalRightFourInARow.isFourInARow) {
                    matches = diagonalRightFourInARow.matches;
                    fourInARow = diagonalRightFourInARow.isFourInARow;
                }
            }
            return fourInARow;
        });
        return { fourInARow, matches };
    };

    checkForHorizontalMatches = (disc, index) => {
        let horizontalFourInARow = false;
        const matchLength = 3;
        let i = 0;
        let localIndex = index;
        let matches = [index];

        for (; i < matchLength; i++) {
            const nextDisc = this.state.discs[localIndex + 1];
            if (!nextDisc) {
                horizontalFourInARow = false;
                break;
            }

            if (disc === nextDisc) {
                localIndex = localIndex + 1;
                matches.push(localIndex);
            }
            if (disc === nextDisc && i === matchLength - 1) {
                horizontalFourInARow = true;
                break;
            }
        }

        return { isFourInARow: horizontalFourInARow, matches };
    };

    checkForVerticalMatches = (disc, index) => {
        let verticalFourInARow = false;
        const matchLength = 3;
        let i = 0;
        let localIndex = index;
        let matches = [index];
        for (; i < matchLength; i++) {
            const nextDisc = this.state.discs[localIndex + BOARD_CONFIG.WIDTH];

            if (!nextDisc) {
                verticalFourInARow = false;
                break;
            }
            if (disc === nextDisc) {
                localIndex = localIndex + BOARD_CONFIG.WIDTH;
                matches.push(localIndex);
            }

            if (disc === nextDisc && i === matchLength - 1) {
                verticalFourInARow = true;

                break;
            }
        }
        return { isFourInARow: verticalFourInARow, matches };
    };

    checkForDiagonalLeftMatches = (disc, index) => {
        let diagonalLeftFourInARow = false;
        const matchLength = 3;
        let i = 0;
        let localIndex = index;
        let matches = [index];
        for (; i < matchLength; i++) {
            const nextDisc = this.state.discs[localIndex + BOARD_CONFIG.WIDTH - 1];

            if (!nextDisc) {
                diagonalLeftFourInARow = false;
                break;
            }
            if (disc === nextDisc) {
                localIndex = localIndex + BOARD_CONFIG.WIDTH - 1;
                matches.push(localIndex);
            }

            if (disc === nextDisc && i === matchLength - 1) {
                diagonalLeftFourInARow = true;
                break;
            }
        }

        return { isFourInARow: diagonalLeftFourInARow, matches };
    };

    checkForDiagonalRightMatches = (disc, index) => {
        let diagonalRightFourInARow = false;
        const matchLength = 3;
        let i = 0;
        let localIndex = index;
        let matches = [index];
        for (; i < matchLength; i++) {
            const nextDisc = this.state.discs[localIndex + BOARD_CONFIG.WIDTH + 1];

            if (!nextDisc) {
                diagonalRightFourInARow = false;
                break;
            }
            if (disc === nextDisc) {
                localIndex = localIndex + BOARD_CONFIG.WIDTH + 1;
                matches.push(localIndex);
            }

            if (disc === nextDisc && i === matchLength - 1) {
                diagonalRightFourInARow = true;
                break;
            }
        }
        return { isFourInARow: diagonalRightFourInARow, matches };
    };

    render() {
        const { fourInARow, matches } = this.checkForWinner();

        return (
            <>
                {fourInARow && <div>We have a winner</div>}
                <Board discs={this.state.discs} config={BOARD_CONFIG} onDiscClick={this.handleOnDiscClick} matches={matches} />
            </>
        );
    }
}

export default Game;
