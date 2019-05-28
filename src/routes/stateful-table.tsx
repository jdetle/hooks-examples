import React, { useEffect, useReducer } from "react";
import Table from "./../components/table";
import Card from "@material-ui/core/Card";
const delayedFetch = (delay: number) => {
  return new Promise<React.ReactNode[][]>(resolve => {
    setTimeout(() => resolve([["data!!!!"]]), delay);
  });
};
interface ITableState {
  loading: boolean;
  data: React.ReactNode[][] | null;
  error: { message: string } | null;
}
const reducer = (
  state: ITableState,
  action:
    | { type: "toggleLoading" }
    | { type: "setData"; payload: React.ReactNode[][] }
    | { type: "setError"; payload: { message: string } }
) => {
  switch (action.type) {
    case "toggleLoading":
      return { ...state, loading: !state.loading };
    case "setData":
      return { ...state, data: action.payload, loading: false };
    case "setError":
      return { ...state, error: action.payload, loading: false };
    default:
      throw Error("Action type not supported");
  }
};
const StatefulTable = (props: {}) => {
  let initialState: ITableState = { loading: false, data: null, error: null };
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    let isSubscribed = true;

    dispatch({ type: "toggleLoading" });
    const updateTableView = () => {
      if (isSubscribed) {
        delayedFetch(10000)
          .then(data => {
            if (isSubscribed) {
              dispatch({ type: "setData", payload: data });
            }
          })
          .catch(({ message }: ErrorEvent) => {
            if (isSubscribed) {
              dispatch({ type: "setError", payload: { message } });
            }
          });
      }
    };
    updateTableView();

    return () => {
      isSubscribed = false;
    };
  }, []);

  return (
    <Card style={{ width: 800, height: 800 }}>
      {state.loading ? "loading" : "not loading"}
      <Table
        title="statefulTable"
        columns={[{ name: "someDataItem" }]}
        data={state.data ? state.data : []}
        loading={state.loading}
        error={state.error}
      />
    </Card>
  );
};

export default StatefulTable;
