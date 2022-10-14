export type SquareProps = {
  value: Square;
  isHighlighted: boolean;
  onClick: () => void;
};

export type BoardProps = {
  squares: Array<Square>;
  winLine: Array<number> | null;
  onClick: (i: number) => void;
};

export type HistoryState = Array<{
  squares: Squares;
  col: number;
  row: number;
}>

type Square = "X" | "O" | null;

export type Squares = Array<Square>;
