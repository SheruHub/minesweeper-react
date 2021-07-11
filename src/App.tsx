import React, { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import { DrawNodes } from './components/DrawNodes';
import * as Game from './logic/GameLogic'


function App() {
   const game = Game.InitBoard(10, 10, 20)
   const [gameState, changeGameState] = useState(game)

   return (
      <div className="App">
         <DrawNodes gameBoard={gameState} changeGameBoard={changeGameState} />
      </div>
   );
}

export default App;
