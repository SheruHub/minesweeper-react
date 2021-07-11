import React, { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import { DrawNodes } from './components/DrawNodes';
import * as Game from './logic/GameLogic'

function App() {
   const defaultGame = {
      width: '10',
      height: '10',
      bombs: '20'
   }
   const game = Game.InitBoard(10, 10, 20)
   const [gameState, changeGameState] = useState(game)

   const resetGame = () => {
      changeGameState(Game.InitBoard(10, 10, 20))
   }

   return (
      <div className="App">
         <h1>Minesweeper</h1>
         <form>
            <label>Grid width:
               <input type="text" name="width" id="width" value={defaultGame.width} />
            </label>
            <label>Grid height:
               <input type="text" name="height" id="height" value={defaultGame.height} />
            </label>
            <label># Bombs:
               <input type="text" name="numBombs" id="numBombs" value={defaultGame.bombs} />
            </label>
            <input type="submit" value="Generate" />
         </form>
         <hr />
         <button onClick={() => resetGame()} >Reset Game</button>
         <hr />
         <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
         }}>
            <DrawNodes gameBoard={gameState} changeGameBoard={changeGameState} />
         </div>
      </div >
   );
}

export default App;
