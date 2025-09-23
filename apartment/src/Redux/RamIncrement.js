import { useDispatch, useSelector } from "react-redux";
import { addingCount, decrementCount } from "./ajithSlice";
export default function RamIncrement() {
  const dispatch = useDispatch();
  const data = useSelector(
    (state) => state.adding.addNumber
    // console.log("data", state.adding.addNumber)
  );
  return (
    <>
      <h1>Increment{data}</h1>
      <button onClick={() => dispatch(addingCount(5))}>+</button>
      <h1>Decrement</h1>
      <button onClick={() => dispatch(decrementCount(5))}>-</button>
    </>
  );
}
