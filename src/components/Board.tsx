import { FC } from "react";
import { BoardProps } from "../type";
import { Square } from "./Square";

export const Board: FC<BoardProps> = (props) => {
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
