import { useDispatch, useSelector } from "react-redux";
import { addIncrement } from "./IncrementSlice";

export default function FormIncrement() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.add.data);

  return (
    <>
      <h2>Count: {count}</h2>
      {/* Default increment by 1 */}
      <button onClick={() => dispatch(addIncrement(1))}>+1</button>
      {/* Increment by custom value */}
      <button onClick={() => dispatch(addIncrement(5))}>+5</button>
    </>
  );
}
