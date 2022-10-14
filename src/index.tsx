import React, { FC, useState } from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import { BoardProps, HistoryState, SquareProps, Squares } from "./type";

const Square: FC<SquareProps> = (props) => {
  let className = "square";
  if (props.isHighlighted) {
    className += " highlight";
  }

  return (
    <button className={className} onClick={props.onClick}>
      {props.value}
    </button>
  );
};

const Board: FC<BoardProps> = (props) => {
  const renderSquare = (i: number, isHighlighted: boolean) => {
    return (
      <Square
        isHighlighted={isHighlighted}
        key={i}
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
      />
    );
  };

  return (
    <div>
      {Array(3)
        .fill(0)
        .map((row, i) => {
          return (
            <div className="board-row" key={i}>
              {Array(3)
                .fill(0)
                .map((col, j) => {
                  const index: number = i * 3 + j;
                  const highlight =
                    props.winLine && props.winLine.indexOf(index) !== -1;
                  if (highlight) {
                    return renderSquare(index, highlight);
                  } else {
                    return renderSquare(index, false);
                  }
                })}
            </div>
          );
        })}
    </div>
  );
};

const Game = () => {
  const [history, setHistory] = useState<HistoryState>([
    {
      squares: Array(9).fill(null),
      col: 0,
      row: 0,
    },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [isAsc, setIsAsc] = useState(true);

  const toggleAsc = () => {
    setIsAsc(!isAsc);
  };

  const handleClick = (i: number) => {
    const copiedHistory = history.slice(0, stepNumber + 1);
    const current = copiedHistory[copiedHistory.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares)?.winner || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    setHistory(
      copiedHistory.concat([
        {
          squares: squares,
          col: i % 3,
          row: Math.floor(i / 3),
        },
      ])
    );
    setStepNumber(copiedHistory.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step: number) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const current = history[stepNumber];
  const settlement = calculateWinner(current.squares);

  const moves = history.map((step, move) => {
    let desc = move
      ? "Go to move #" + move + "(" + step.col + "," + step.row + ")"
      : "Go to game start";
    return (
      <li key={move}>
        <button
          onClick={() => jumpTo(move)}
          className={stepNumber === move ? "bold" : ""}
        >
          {desc}
        </button>
      </li>
    );
  });

  let status;
  if (settlement) {
    if (settlement.isDraw) {
      status = "Draw";
    } else {
      status = "Winner: " + settlement.winner;
    }
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i: number) => handleClick(i)}
          winLine={settlement ? settlement.line : []}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <div>
          <button onClick={() => toggleAsc()}>
            {isAsc ? "Sort in descending order" : "Sort in ascending order"}
          </button>
        </div>
        <ol>{isAsc ? moves : moves.reverse()}</ol>
      </div>
    </div>
  );
};

// ========================================
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(rootElement);
root.render(<Game />);

function calculateWinner(squares: Squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { isDraw: false, winner: squares[a], line: [a, b, c] };
    }
  }

  if (squares.filter((e) => !e).length === 0) {
    return {
      isDraw: true,
      winner: null,
      line: null,
    };
  }

  return null;
}
