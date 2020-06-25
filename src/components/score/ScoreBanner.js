import React from 'react';
import './scoreBanner.scss';

export const ScoreBanner = ({ winner }) => {
    return <div className="scoreBanner">{winner} Wins!</div>;
};
