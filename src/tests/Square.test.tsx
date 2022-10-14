import renderer from "react-test-renderer";
import { Square } from "../components/Square";
import { expect, test } from "@jest/globals";

test("add className highlight when isHighlighted is true", () => {
  const tree = renderer
    .create(<Square isHighlighted={true} value={null} onClick={() => {}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("not add className highlight when isHighlighted is false", () => {
  const tree = renderer
    .create(<Square isHighlighted={false} value={null} onClick={() => {}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("show X when value is X", () => {
  const tree = renderer
    .create(<Square isHighlighted={false} value={"X"} onClick={() => {}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("show O when the value is O", () => {
  const tree = renderer
    .create(<Square isHighlighted={false} value={"O"} onClick={() => {}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("show nothing when the value is null", () => {
  const tree = renderer
    .create(<Square isHighlighted={false} value={null} onClick={() => {}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

// test("call onClick when the square is clicked", () => {
//   const onClickSquare = jest.fn();
//   const tree = renderer
//     .create(
//       <Square isHighlighted={false} value={null} onClick={onClickSquare} />
//     )
//     .toJSON();
//   if ("tree" in renderer.ReactTestRenderer) {
//     tree?.props.onClick();
//   }
//   expect(onClickSquare).toHaveBeenCalled();
// });
