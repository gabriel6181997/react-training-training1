/* eslint-disable testing-library/render-result-naming-convention */
import { Game } from "../components/Game";
import { render } from "@testing-library/react";
import * as useGame from "../hooks/useGame";
import { Square } from "../components/Square";

describe("Game component", () => {
  describe("when isAsc is true", () => {
    it("render correctly", () => {
      jest.spyOn(useGame, "useGame").mockImplementation(() => ({
        status: "status",
        moves: [
          <Square
            key={"X"}
            value={"X"}
            isHighlighted={false}
            onClick={jest.fn}
          />,
          <Square
            key={""}
            value={null}
            isHighlighted={true}
            onClick={jest.fn}
          />,
          <Square
            key={"O"}
            value={"O"}
            isHighlighted={false}
            onClick={jest.fn}
          />,
        ],
        current: {
          squares: ["X", "O", null, "X", "O", null, "X", "O", null],
          col: 1,
          row: 1,
        },
        handleClick: jest.fn(),
        settlement: null,
        toggleAsc: jest.fn(),
        isAsc: true,
      }));
      const screen = render(<Game />);
      expect(screen.getByText("Sort in descending order")).toBeInTheDocument();
      const allSquares = screen.getAllByRole("button");
      expect(allSquares[0]).toHaveTextContent("X");
      expect(allSquares[1]).not.toHaveTextContent("X" || "O");
      expect(allSquares[2]).toHaveTextContent("O");
    });
  });

  describe("when isAsc is false", () => {
    it("render correctly", () => {
      jest.spyOn(useGame, "useGame").mockImplementation(() => ({
        status: "status",
        moves: [
          <Square
            key={"X"}
            value={"X"}
            isHighlighted={false}
            onClick={jest.fn}
          />,
          <Square
            key={""}
            value={null}
            isHighlighted={true}
            onClick={jest.fn}
          />,
          <Square
            key={"O"}
            value={"O"}
            isHighlighted={false}
            onClick={jest.fn}
          />,
        ],
        current: {
          squares: ["X", "O", null, "X", "O", null, "X", "O", null],
          col: 1,
          row: 1,
        },
        handleClick: jest.fn(),
        settlement: null,
        toggleAsc: jest.fn(),
        isAsc: false,
      }));
      const screen = render(<Game />);
      expect(screen.getByText("Sort in ascending order")).toBeInTheDocument();
      const allSquares = screen.getAllByRole("button");
      // expect(allSquares[0]).toHaveTextContent("O");
      expect(allSquares[1]).not.toHaveTextContent("X" || "O");

    });
  });
});
