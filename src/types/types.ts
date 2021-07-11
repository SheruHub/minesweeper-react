
export type Coord = {
   x: number
   y: number
}

export type GameNode = {
   isBomb: boolean
   clicked: boolean
   numBombs: number
   coord: Coord
}

export type GameState = {
   gameBoard: GameNode[][];
   numBombs: number;
   bombLocs: Coord[];
}