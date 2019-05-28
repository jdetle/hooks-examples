import React, { useContext } from "react";
import { ComputedDataContext } from "./../App";

const MemoizationWithContext = (props: {}) => {
  const dataFromContext = useContext(ComputedDataContext);
  return (
    <ul style={{ backgroundColor: "gray" }}>
      {dataFromContext &&
        dataFromContext.map((item: string, idx: number) => (
          <li key={idx}>{item}</li>
        ))}
    </ul>
  );
};

export default MemoizationWithContext;
