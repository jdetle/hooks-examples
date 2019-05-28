import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
const delayedFetch = (delay: number) => {
  return new Promise(resolve => setTimeout(resolve, delay));
};

class TwoFetchesComponent extends React.Component<{}, {}> {
  public readonly state: { a: string; b: string } = {
    a: "I am item A Pre Render ",
    b: "I am item B Pre Render"
  };
  public componentDidMount() {
    delayedFetch(1000).then(() => {
      this.setState({ a: "I Am Item A Post Render" });
    });
    delayedFetch(4000).then(() => {
      this.setState({ b: "I am item B Post Render!" });
    });
  }
  render() {
    const { a, b } = this.state;
    return (
      <Card
        style={{
          margin: 20,
          padding: 20,
          display: "flex",
          justifyContent: "center",
          height: 400,
          width: 400
        }}
      >
        <Typography style={{ width: 380 }}>{a}</Typography>
        <Typography style={{ width: 380 }}>{b}</Typography>
      </Card>
    );
  }
}

const TwoFetches = (props: {}) => {
  const [a, setA] = useState<any>("I am item A Pre Render ");
  const [b, setB] = useState<any>("I am item B Pre Render!");
  useEffect(() => {
    delayedFetch(1000).then(() => {
      setA("I Am Item A Post Render");
    });
  }, [a]);

  useEffect(() => {
    delayedFetch(4000).then(() => {
      setB("I Am Item B Post Render");
    });
  }, [b]);
  return (
    <Card
      style={{
        margin: 20,
        padding: 20,
        display: "flex",
        justifyContent: "center",
        height: 400,
        width: 400
      }}
    >
      <Typography style={{ width: 380 }}>{a}</Typography>
      <Typography style={{ width: 380 }}>{b}</Typography>
    </Card>
  );
};

const TwoFetchSwitch = (props: {}) => {
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
      {isComponent ? <TwoFetchesComponent /> : <TwoFetches />}
    </div>
  );
};

export default TwoFetchSwitch;
