import React, { useCallback, useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

type ParentProps = { userDataEndpoint: string };

const fetch = (url: string) => Promise.resolve("data url:   " + url);

export const Parent = (props: ParentProps) => {
  const [data, setData] = useState<string>("No data url set yet");

  const fetchData = useCallback(() => {
    fetch("api/url" + props.userDataEndpoint).then(setData);
  }, [props.userDataEndpoint]);

  return (
    <div>
      <Typography>{data}</Typography>
      <Button onClick={fetchData}>Fetch Data</Button>
      <Button onClick={() => setData("")}>Clear Data</Button>
    </div>
  );
};

export const GrandParent = (props: {}) => {
  const [userDataEndpoint, setUserDataEndpoint] = useState<string>("?id=0");
  const [count, setCount] = useState<number>(0);
  useEffect(() => {
    setTimeout(() => {
      setUserDataEndpoint("?id=" + count);
      setCount(count => count + 1);
    }, 3000);
  }, [count]);
  return (
    <div style={{ margin: 20, padding: 20 }}>
      <Parent userDataEndpoint={userDataEndpoint} />
    </div>
  );
};

export default GrandParent;
