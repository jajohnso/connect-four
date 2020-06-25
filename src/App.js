import React from 'react';

import './App.scss';
import Game from './components/game/Game';

function App() {
    return (
        <div className="app">
            <div className="appWrapper">
                <Game />
            </div>
        </div>
    );
}

export default App;
