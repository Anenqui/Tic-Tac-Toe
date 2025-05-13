import React, {useState} from "react";
import ReactDOM from "react-dom/client";
import './index.css'

  const Square = (props) => {
    let className = "square";
    if (props.value === 'X') {
      className += " square-x";
    } else if (props.value === 'O') {
      className += " square-o";
    }
    if (props.animate) {
      className += " sweep-animation";
    }
    return (
      <button className={className} onClick={props.onClickEvent}>
        {props.value}
      </button>
    );
  };

const Board=()=>{
const [animate, setAnimate] = useState(false);

const reiniciarJuego = () => {
  setAnimate(true);
  setTimeout(() => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setAnimate(false);
  }, 500); 
};

const initialSquares = Array(9).fill(null);
const[squares,setSquares]=useState(initialSquares);
const [xIsNext,setXIsNext]= useState(true);

const handleClickEvent=(i)=>{
  //1
  const newSquares=[...squares];

  const winnerDeclared= Boolean(calculateWinner(newSquares));
  const squareFilled=Boolean(newSquares[i]);
  if(winnerDeclared || squareFilled){
    return;
  }
  //2
  newSquares[i]= xIsNext ? 'X': 'O';
  //3
  setSquares(newSquares);
  setXIsNext(!xIsNext);
};

  const coloredPlayer = (player) => {
    if (player === 'X') {
      return <span className="player-x">X</span>;
    } else if (player === 'O') {
      return <span className="player-o">O</span>;
    } else {
      return null;
    }
  };

 const renderSquare = (i) => {
  return (
    <Square
      value={squares[i]}
      onClickEvent={() => handleClickEvent(i)}
      animate={animate}
    />
  );};


  const winner =calculateWinner(squares);
  const status = winner ? (
  <>Gano el jugador: {coloredPlayer(winner)}</>):(
  <>Siguiente jugador: {coloredPlayer(xIsNext ? 'X':'O')}</>);
  return(
    <div className="board-container">
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
      </div>
      <button className="reset-button" onClick={reiniciarJuego}>
        Reiniciar juego
      </button>
    </div>
  );
}

const Game = () => {
  return <div className="game">
  El juego del Gato
  <Board/>
  </div>;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

function calculateWinner(squares){
  const lines=[
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6],
  ];

  for(let line of lines){
    const[a,b,c]=line;

    if(squares[a] && squares[a] === squares[b]&& squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}