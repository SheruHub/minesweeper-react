import * as Types from '../types/types'

export const RandomPos = (height: number, width: number): Types.Coord => {

   const randx = Math.floor(Math.random() * height)
   const randy = Math.floor(Math.random() * width)

   return { x: randx, y: randy }
}

export const CreateNode = (coord: Types.Coord): Types.GameNode => {
   return ({
      isBomb: false,
      clicked: false,
      numBombs: 0,
      coord: coord
   })
}

export const InitBoard = (width: number, height: number, bombs: number): Types.GameState => {

   const gameState = {
      gameBoard: new Array(),
      numBombs: bombs,
      bombLocs: new Array()
   }

   for (let x = 0; x < width; x++) {
      gameState.gameBoard[x] = []
      for (let y = 0; y < height; y++) {
         gameState.gameBoard[x][y] = CreateNode({ x: x, y: y })
      }
   }

   for (let bombs = 0; bombs < gameState.numBombs; bombs++) {
      let bombPos = RandomPos(width, height)
      while (gameState.gameBoard[bombPos.x][bombPos.y].isBomb) {
         bombPos = RandomPos(width, height)
      }

      gameState.gameBoard[bombPos.x][bombPos.y].isBomb = true
      gameState.bombLocs.push({ x: bombPos.x, y: bombPos.y })
   }

   // For each bomb, add 1 to numBombs to each non-bomb node around it   
   gameState.bombLocs.map((loc: Types.Coord) => {
      const neighbours = getNeighbours(loc, gameState)
      neighbours.map((neighbour) => {
         gameState.gameBoard[neighbour.x][neighbour.y].numBombs++
      })
   })
   return gameState
}

export const bfs = (startNode: Types.GameNode, state: Types.GameState): Types.GameState => {

   state.gameBoard[startNode.coord.x][startNode.coord.y].clicked = true

   const neighbours = getNeighbours(startNode.coord, state)
   neighbours.map((neighbour) => {
      if (!state.gameBoard[neighbour.x][neighbour.y].clicked) {
         if (startNode.numBombs > 0) return state
         bfs(state.gameBoard[neighbour.x][neighbour.y], state)
      }
   })
   return state

}


// Doesn't add bomb neighbours
export const getNeighbours = (startNode: Types.Coord, gameState: Types.GameState): Types.Coord[] => {
   let neighbours = []

   let startX, endX
   let startY, endY
   if (startNode.x === 0) startX = 0
   else startX = startNode.x - 1
   if (startNode.y === 0) startY = 0
   else startY = startNode.y - 1
   if (startNode.x === gameState.gameBoard.length - 1) endX = gameState.gameBoard.length - 1
   else endX = startNode.x + 1
   if (startNode.y === gameState.gameBoard[startNode.x].length - 1) endY = gameState.gameBoard[startNode.x].length - 1
   else endY = startNode.y + 1

   for (let x = startX; x <= endX; x++) {
      for (let y = startY; y <= endY; y++) {
         if (!gameState.gameBoard[x][y].isBomb) {
            neighbours.push(gameState.gameBoard[x][y].coord)
         }
      }
   }

   return neighbours
}