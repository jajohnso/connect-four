import React from 'react';
import './scoreBanner.scss';

export const ScoreBanner = ({ winner, handleResetGame }) => {
    return (
        <div className="scoreBanner">
            {winner} Wins!
            <button className="scoreBanner-reset" onClick={handleResetGame}>
                Play Again!
            </button>
        </div>
    );
};
