import React, { useState } from 'react';

import './App.css';

const TicTacToe = () => {
  const [turn, setTurn] = useState(0);
  const [board, setBoard] = useState(
    [null, null, null, null, null, null, null, null, null]
  );

  const handleClick = (i) => {
    const tempBoard = board.slice();
    if (tempBoard[i] == null) {
      tempBoard[i] = ((turn % 2 == 0) ? 'X' : 'O');
      setTurn(turn => turn + 1);
      setBoard(tempBoard);
    }
  }

  return (
    <div>
      <Board boardState={board} onClick={(i) => handleClick(i)}/>
    </div>
  );
}

const Board = (props) => {
  const boardState = props.boardState;

  return (
    <div className="Grid">
      <div className="One">

        <Tile value={boardState[0]} onClick={() => props.onClick(0)}/>
      </div>
      <div className="Two">

        <Tile value={boardState[1]} onClick={() => props.onClick(1)}/>
      </div>
      <div className="Three">

        <Tile value={boardState[2]} onClick={() => props.onClick(2)}/>
      </div>
      <div className="Four">

        <Tile value={boardState[3]} onClick={() => props.onClick(3)}/>
      </div>
      <div className="Five">

        <Tile value={boardState[4]} onClick={() => props.onClick(4)}/>
      </div>
      <div className="Six">

        <Tile value={boardState[5]} onClick={() => props.onClick(5)}/>
      </div>
      <div className="Seven">

        <Tile value={boardState[6]} onClick={() => props.onClick(6)}/>
      </div>
      <div className="Eight">

        <Tile value={boardState[7]} onClick={() => props.onClick(7)}/>
      </div>
      <div className="Nine">

        <Tile value={boardState[8]} onClick={() => props.onClick(8)}/>
      </div>
    </div>
  );
}


const Tile = (props) => {
  return (
      <button onClick={props.onClick}> {props.value} </button>
  );
}

export default TicTacToe;
