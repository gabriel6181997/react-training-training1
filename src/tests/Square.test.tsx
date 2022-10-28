/* eslint-disable testing-library/no-render-in-setup */
import { expect } from "@jest/globals";
import { Square } from "../components/Square";
import { render, RenderResult } from "@testing-library/react";

describe("Square component", () => {
  let screen: RenderResult;

  describe("when X is displayed", () => {
    beforeEach(() => {
      screen = render(
        <Square isHighlighted={false} value={"X"} onClick={() => {}} />
      );
    });

    it("render correctly", () => {
      expect(screen).toMatchSnapshot();
    });
  });

  describe("when O is displayed", () => {
    beforeEach(() => {
      screen = render(
        <Square isHighlighted={false} value={"O"} onClick={() => {}} />
      );
    });

    it("render correctly", () => {
      expect(screen).toMatchSnapshot();
    });
  });

  describe("when nothing is displayed", () => {
    beforeEach(() => {
      screen = render(
        <Square isHighlighted={false} value={null} onClick={() => {}} />
      );
    });

    it("render correctly", () => {
      expect(screen).toMatchSnapshot();
    });
  });

  describe("when square is highlighted", ()=> {
    beforeEach(() => {
      screen = render(
        <Square isHighlighted={true} value={"X"} onClick={() => {}} />
      );
    });

    it("render correctly", () => {
      expect(screen).toMatchSnapshot();
    });
  })

  describe("when square is not highlighted", () => {
    beforeEach(() => {
      screen = render(
        <Square isHighlighted={false} value={"X"} onClick={() => {}} />
      );
    });

    it("render correctly", () => {
      expect(screen).toMatchSnapshot();
    });
  })

  describe("when square is clicked", ()=> {
    const onClickSquare = jest.fn();
    beforeEach(() => {
      screen = render(
        <Square isHighlighted={false} value={"X"} onClick={onClickSquare} />
      );
      screen.getByText("X").click();
    });

    it("render correctly", () => {
      expect(screen).toMatchSnapshot();
    });

    it("onClick is called", () => {
      expect(onClickSquare).toHaveBeenCalled();
    });
  })

});
