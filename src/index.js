import React, {useState} from "react";
import ReactDOM from "react-dom/client";
import './index.css'

const Square=(props)=>{
  return(
    <button
     className="square"
     onClick={props.onClickEvent}
     >
      {props.value}
    </button>
  );
};

const Board=()=>{
const initialSquares = Array(9).fill(null);

const[squares,setSquares]=useState(initialSquares);

const handleClickEvent=(i)=>{
  //1
  const newSquares=[...squares];
  //2
  newSquares[i]='X';
  //3
  setSquares(newSquares);
};

  const renderSquare= (i)=>{
    return(
      <Square
       value={squares[i]}
       onClickEvent={()=> handleClickEvent(i)}
        />
    );};

  return(
    <div style={{
      backgroundColor: 'skyblue',
      margin:10,
      padding:20,
    }}>
      Board
      <div className="board-row">
      {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
      </div>
      <div className="board-row">
      {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
      </div>
      <div className="board-row">
      {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
      </div>
    </div>
  )
}

const Game = () => {
  return <div className="game">
  Game
  <Board/>
  </div>;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

