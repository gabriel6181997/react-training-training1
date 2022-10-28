import { useGame } from "../hooks/useGame";
import { Board } from "./Board";
import "./../index.css";

export const Game = () => {
  const { status, moves, current, toggleAsc, handleClick, settlement, isAsc } =
    useGame();

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
