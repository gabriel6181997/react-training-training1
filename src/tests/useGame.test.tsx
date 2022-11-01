import { renderHook, act } from "@testing-library/react-hooks";
import { useGame } from "../hooks/useGame";

// 1. Write a test for toggleAsc
// (When toggleAsc is called, the boolean value of isAsc changes to its opposite.)◯
// 2. Write a test for handleClick
//
// 3. Write a test for jumpTo
// 4. Write a test for moves

describe("useGame", () => {
  const { result } = renderHook(() => useGame());
  // console.log("result", result.all)


  describe("When toggleAsc is called", () => {
    act(() => {
      result.current.toggleAsc();
    });

    it("should turn isAsc to false", () => {
      expect(result.current.isAsc).toBe(false);
    });
  });

  // describe("When handleClick is called", () => {
  //   // act(() => {
  //   //   result.current.handleClick(1);
  //   // });

  //   // it("should turn xIsNext to false", () => {
  //   //   expect(result.current.xIsNext).toBe(false);
  //   // });
  // })

  // describe("When jumpTo is called", () => {
  //   act(() => {
  //     result.current.jumpTo(2);
  //   });

  //   it("should turn stepNumber to 1", () => {
  //     expect(result.current.stepNumber).toBe(2);
  //   });
  // })

});
