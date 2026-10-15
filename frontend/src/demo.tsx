import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./redux/store";
import { demoapi } from "./redux/demoSlice";

interface Data {
  name: string;
  age: number;
}
const data: Data = {
  name: "jeevan",
  age: 34,
};

const Demo: React.FC = () => {
  const { message, loading, error } = useSelector(
    (state: RootState) => state.demoapicall,
  );

  const dispatch = useDispatch<AppDispatch>();

  async function handleFunction() {
    try {
      const result = await dispatch(demoapi(data)).unwrap();

      console.log("Success:", result);
    } catch (error) {
      console.log("Failed:", error);
    }
  }

  return (
    <div>
      <p>{message}</p>

      <button onClick={handleFunction} disabled={loading}>
        {loading ? "Loading..." : "Click"}
      </button>

      {error && <p>{error}</p>}
    </div>
  );
};

export default Demo;
