import { FC } from "react";
import { SquareProps } from "../type";

export const Square: FC<SquareProps> = (props) => {
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
