import React, { Component, useState } from "react";
import Button from "@material-ui/core/Button";

class Counter extends Component<{}, { count: number }> {
  public readonly state: { count: number } = { count: 0 };
  componentDidUpdate() {
    setTimeout(() => {
      console.log(`You clicked ${this.state.count} times`);
    }, 3000);
  }
  render() {
    const { count } = this.state;
    return (
      <div style={{ margin: 20 }}>
        {count}
        <Button
          style={{ margin: 20 }}
          onClick={() => {
            this.setState({ count: count + 1 });
          }}
        >
          {"Increase Count"}
        </Button>
      </div>
    );
  }
}

const FnCounter = (props: {}) => {
  const [count, setCount] = useState<number>(0);
  setTimeout(() => {
    console.log(`You clicked ${count} times`);
  }, 3000);
  return (
    <div style={{ margin: 20 }}>
      {count}
      <Button style={{ margin: 20 }} onClick={() => setCount(c => c + 1)}>
        {"Increase Count"}
      </Button>
    </div>
  );
};

const CounterSwitch = (props: {}) => {
  const [isComponent, setIsComponent] = useState<boolean>(true);
  return (
    <div>
      <Button
        style={{ margin: 20 }}
        onClick={() => {
          setIsComponent(bool => !bool);
        }}
      >
        {isComponent ? "Switch to Function" : "Switch to class"}
      </Button>
      {isComponent ? <Counter /> : <FnCounter />}
    </div>
  );
};

export default CounterSwitch;
