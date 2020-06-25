import React, { Component } from 'react';
import Board from '../board/Board';
import { Score } from '../score/Score';

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
            player1Up: false,
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

        discs[nextSlotIndex] = this.state.player1Up ? 'X' : 'O';

        this.setState({
            discs: discs,
            player1Up: !this.state.player1Up,
        });
    };

    checkForWinner = () => {
        let winner = false;
        let matches = [];

        this.state.discs.forEach((disc, index) => {
            if (!disc || winner) {
                return;
            }

            // horizontal check
            let horizontalWinner = {};
            if (index % BOARD_CONFIG.WIDTH <= 4) {
                horizontalWinner = this.checkForHorizontalMatches(disc, index);
            }

            // vertical check
            const minRemainingRowsToMatchVertical = Math.ceil(BOARD_CONFIG.HEIGHT - (index + 1) / BOARD_CONFIG.WIDTH);

            if (minRemainingRowsToMatchVertical >= 4) {
                let diagonalRightWinner = {};
                let diagonalLeftWinner = {};

                const verticalWinner = this.checkForVerticalMatches(disc, index);
                if (BOARD_CONFIG.WIDTH - index >= 4) {
                    diagonalRightWinner = this.checkForDiagonalRightMatches(disc, index);
                }
                if (BOARD_CONFIG.WIDTH - index <= 4) {
                    diagonalLeftWinner = this.checkForDiagonalLeftMatches(disc, index);
                }

                if (horizontalWinner.isWinner) {
                    matches = horizontalWinner.matches;
                    winner = horizontalWinner.isWinner;
                }
                if (verticalWinner.isWinner) {
                    matches = verticalWinner.matches;
                    winner = verticalWinner.isWinner;
                }
                if (diagonalLeftWinner.isWinner) {
                    matches = diagonalLeftWinner.matches;
                    winner = diagonalLeftWinner.isWinner;
                }
                if (diagonalRightWinner.isWinner) {
                    matches = diagonalRightWinner.matches;
                    winner = diagonalRightWinner.isWinner;
                }
            }
            return winner;
        });
        return { winner, matches };
    };

    checkForHorizontalMatches = (disc, index) => {
        let horizontalWinner = false;
        const matchLength = 3;
        let i = 0;
        let localIndex = index;
        let matches = [index];

        for (; i < matchLength; i++) {
            const nextDisc = this.state.discs[localIndex + 1];
            if (!nextDisc) {
                horizontalWinner = false;
                break;
            }

            if (disc === nextDisc) {
                localIndex = localIndex + 1;
                matches.push(localIndex);
            }
            if (disc === nextDisc && i === matchLength - 1) {
                horizontalWinner = true;
                break;
            }
        }

        return { isWinner: horizontalWinner, matches };
    };

    checkForVerticalMatches = (disc, index) => {
        let verticalWinner = false;
        const matchLength = 3;
        let i = 0;
        let localIndex = index;
        let matches = [index];
        for (; i < matchLength; i++) {
            const nextDisc = this.state.discs[localIndex + BOARD_CONFIG.WIDTH];

            if (!nextDisc) {
                verticalWinner = false;
                break;
            }
            if (disc === nextDisc) {
                localIndex = localIndex + BOARD_CONFIG.WIDTH;
                matches.push(localIndex);
            }

            if (disc === nextDisc && i === matchLength - 1) {
                verticalWinner = true;

                break;
            }
        }
        return { isWinner: verticalWinner, matches };
    };

    checkForDiagonalLeftMatches = (disc, index) => {
        let diagonalLeftWinner = false;
        const matchLength = 3;
        let i = 0;
        let localIndex = index;
        let matches = [index];
        for (; i < matchLength; i++) {
            const nextDisc = this.state.discs[localIndex + BOARD_CONFIG.WIDTH - 1];

            if (!nextDisc) {
                diagonalLeftWinner = false;
                break;
            }
            if (disc === nextDisc) {
                localIndex = localIndex + BOARD_CONFIG.WIDTH - 1;
                matches.push(localIndex);
            }

            if (disc === nextDisc && i === matchLength - 1) {
                diagonalLeftWinner = true;
                break;
            }
        }

        return { isWinner: diagonalLeftWinner, matches };
    };

    checkForDiagonalRightMatches = (disc, index) => {
        let diagonalRightWinner = false;
        const matchLength = 3;
        let i = 0;
        let localIndex = index;
        let matches = [index];
        for (; i < matchLength; i++) {
            const nextDisc = this.state.discs[localIndex + BOARD_CONFIG.WIDTH + 1];

            if (!nextDisc) {
                diagonalRightWinner = false;
                break;
            }
            if (disc === nextDisc) {
                localIndex = localIndex + BOARD_CONFIG.WIDTH + 1;
                matches.push(localIndex);
            }

            if (disc === nextDisc && i === matchLength - 1) {
                diagonalRightWinner = true;
                break;
            }
        }
        return { isWinner: diagonalRightWinner, matches };
    };

    render() {
        const { winner, matches } = this.checkForWinner();

        return (
            <>
                <Score isWinner={winner} player1Up={this.state.player1Up} />
                <Board isWinner={winner} discs={this.state.discs} config={BOARD_CONFIG} onDiscClick={this.handleOnDiscClick} matches={matches} />
            </>
        );
    }
}

export default Game;
