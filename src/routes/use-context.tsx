import React, { useContext } from "react";
import { OwnUserContext } from "./../App";

const ContextExample = (props: {}) => {
  const OwnUser = useContext(OwnUserContext);
  return (
    <div style={{ margin: 40 }}>
      {OwnUser == null ? "User not set" : OwnUser.email}
    </div>
  );
};

export default ContextExample;
