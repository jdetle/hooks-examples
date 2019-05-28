import React, { useCallback, useState } from "react";

type ParentProps = { userDataEndpoint: string };
type ButtonProps = { fetchData: () => void };
type DataType = {};
export const FetchButton = (props: ButtonProps) => (
  <button onClick={props.fetchData} />
);

export const Parent = (props: ParentProps) => {
  const [data, setData] = useState<DataType | null>(null);

  const fetchData = useCallback(() => {
    fetch("api/url" + props.userDataEndpoint).then(setData);
  }, [props.userDataEndpoint]);

  return (
    <div>
      {data}
      <FetchButton fetchData={fetchData} />
    </div>
  );
};
