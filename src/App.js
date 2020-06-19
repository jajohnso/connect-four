import React from 'react';

import './App.scss';
import Game from './components/game/Game';

function App() {
    return (
        <div className="App">
            <div className="seatBelt">
                <Game />
            </div>
        </div>
    );
}

export default App;
