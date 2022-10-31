/* eslint-disable testing-library/render-result-naming-convention */
import { Game } from "../components/Game";
import { render } from "@testing-library/react";
import * as useGame from "../hooks/useGame";

describe("Game component", () => {
  describe("when isAsc is true", () => {
    it("render correctly", () => {
      jest.spyOn(useGame, "useGame").mockImplementation(() => ({
        status: "status",
        moves: [
          <button onClick={jest.fn} className="bold" aria-label="Go">
            Step 1
          </button>,
          <button onClick={jest.fn} className="" aria-label="Go">
            Step 2
          </button>,
          <button onClick={jest.fn} className="bold" aria-label="Go">
            Step 3
          </button>,
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
      const allGoButtons = screen.getAllByRole("button", { name: "Go" });
      expect(allGoButtons[0]).toHaveTextContent("Step 1");
      expect(allGoButtons[1]).toHaveTextContent("Step 2");
      expect(allGoButtons[2]).toHaveTextContent("Step 3");
    });
  });

  describe("when isAsc is false", () => {
    it("render correctly", () => {
      jest.spyOn(useGame, "useGame").mockImplementation(() => ({
        status: "status",
        moves: [
          <button onClick={jest.fn} className="bold" aria-label="Go">
            Step 1
          </button>,
          <button onClick={jest.fn} className="" aria-label="Go">
            Step 2
          </button>,
          <button onClick={jest.fn} className="bold" aria-label="Go">
            Step 3
          </button>,
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
      const allGoButtons = screen.getAllByRole("button", { name: "Go" });
      expect(allGoButtons[0]).toHaveTextContent("Step 3");
      expect(allGoButtons[1]).toHaveTextContent("Step 2");
      expect(allGoButtons[2]).toHaveTextContent("Step 1");
    });
  });
});
