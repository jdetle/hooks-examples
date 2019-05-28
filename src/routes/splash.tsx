import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const Splash = () => {
  return (
    <li style={{ listStyle: "none" }}>
      <ul>
        <Link to="counter">
          <Button> Counter Demo </Button>
        </Link>

        <Link to="use_toggle">
          <Button> Toggle Demo </Button>
        </Link>

        <Link to="stateful_table">
          <Button> Stateful Table </Button>
        </Link>
      </ul>
    </li>
  );
};
export default Splash;
