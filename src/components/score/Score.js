import React from 'react';
import { ScoreBanner } from './ScoreBanner';
import './score.scss';
import classNames from '../../utilities/ClassNames';
import Disc from '../disc/Disc';

export const Score = ({ isWinner, player1Up }) => {
    const winner = player1Up ? 'Player 1' : 'Player 2';
    const currentPlayerUp = player1Up ? 1 : 2;
    const getPlayerClassName = (playerIndex) => {
        return classNames({
            'score-players-player': true,
            'score-players-player_isUp': playerIndex === currentPlayerUp,
        });
    };

    return (
        <div className="score">
            <div className="score-players">
                <div className={getPlayerClassName(1)}>
                    Player 1
                    <div className="score-players-player-disc">
                        <Disc value="O" />
                    </div>
                </div>
                <div className={getPlayerClassName(2)}>
                    <div className="score-players-player-disc">
                        <Disc value="X" />
                    </div>
                    Player 2
                </div>
            </div>
            {isWinner && <ScoreBanner winner={winner} />}
        </div>
    );
};
