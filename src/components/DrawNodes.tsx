import React, { useEffect } from 'react'
import { useState } from 'react';
import * as Types from '../types/types'
import * as GL from '../logic/GameLogic'

interface nodesProps {
   gameBoard: Types.GameState
   changeGameBoard: (gameState: Types.GameState) => void
}

interface nodeProps {
   type: Types.GameNode,
   state: Types.GameState,
   changeGameBoard: (gameState: Types.GameState) => void
}

let colorBomb = 'red'
let colorClicked = 'green'
let colorInitial = '#ff7700'
let borderInitial = '2px solid orange'
let borderClicked = '2px solid #454B1B'


const DrawNode = ({ type, state, changeGameBoard }: nodeProps) => {
   const nodeStyle = {
      width: '35px',
      height: '35px',
      minHeight: '35px',
      maxHeight: '35px',
      lineHeight: '35px',
      fontSize: '17px',
      fontWeight: 'bold',
      border: borderInitial,
      display: 'inline',
      background: colorInitial,
      margin: "2px",
      color: 'white',
      verticalAlign: 'top',
      borderRadius: '3px'
   } as React.CSSProperties

   let nodeDisplay: any = ''

   const doClick = () => {
      if (type.isBomb) alert('boom')
      else if (!type.clicked) {

         const newState = GL.bfs(type, state)
         // console.log(newState)
         changeGameBoard({ ...newState })
      }
   }

   if (type.clicked) {
      nodeStyle.background = colorClicked
      nodeStyle.border = borderClicked
      if (type.numBombs !== 0)
         // changeNodeDisplay(type.numBombs)
         nodeDisplay = type.numBombs
   }

   return (
      <button onClick={() => doClick()} style={nodeStyle}>{nodeDisplay}</button>
   )
}

export const DrawNodes = ({ gameBoard, changeGameBoard }: nodesProps) => {

   const containerStyle = {
      width: gameBoard.gameBoard.length * 39
   }

   return (
      <div style={containerStyle}>
         {gameBoard.gameBoard.map((toDraw, index) => {
            return toDraw.map((cell, idx) => {
               return (
                  <DrawNode type={cell} state={gameBoard} changeGameBoard={changeGameBoard} />
               )
            })

         })}

      </div>
   )
}