import React, { useCallback, useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";

type ParentProps = { userDataEndpoint: string };

const fetch = (url: string) => Promise.resolve("data url:   " + url);
const DataDisplay = ({ fetchData }: { fetchData: () => Promise<string> }) => {
  const [data, setData] = useState<string>("No data url set yet");

  useEffect(() => {
    fetchData().then(setData);
  }, [fetchData]);
  return <Typography>{data}</Typography>;
};
export const Parent = (props: ParentProps) => {
  const fetchData = useCallback(() => {
    return fetch("api/url" + props.userDataEndpoint);
  }, [props.userDataEndpoint]);

  return (
    <div>
      <DataDisplay fetchData={fetchData} />
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
    }, 2000);
  }, [count]);
  return (
    <div style={{ margin: 20, padding: 20 }}>
      <Parent userDataEndpoint={userDataEndpoint} />
    </div>
  );
};

export default GrandParent;
