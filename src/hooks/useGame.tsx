import { useState } from "react";
import { HistoryState } from "../type";
import { calculateWinner } from "../utils/utils";

export const useGame = () => {
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

  return {
    status,
    moves,
    current,
    handleClick,
    settlement,
    toggleAsc,
    isAsc,
    jumpTo,
    stepNumber
  };
};
