import React, { useEffect, useReducer } from "react";
import Table from "./../components/table";
const delayedFetch = () => {
  return new Promise<React.ReactNode[][]>(resolve => {
    setTimeout(() => resolve([["Some Data :)"]]), 5000);
  });
};
const delayedFetchError = () => {
  return new Promise<React.ReactNode[][]>((resolve, reject) => {
    setTimeout(() => reject(new Error("NO DATA FOR YOU!")), 5000);
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

const useTableStateHandler = (fetch: () => Promise<React.ReactNode[][]>) => {
  const initialState: ITableState = { loading: false, data: null, error: null };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let isSubscribed = true;
    dispatch({ type: "toggleLoading" });
    const updateTableView = () => {
      if (isSubscribed) {
        fetch()
          .then(data => {
            if (isSubscribed) {
              dispatch({ type: "setData", payload: data });
            }
          })
          .catch(({ message }: ErrorEvent) => {
            if (isSubscribed) {
              dispatch({ type: "setError", payload: { message: message } });
            }
          });
      }
    };
    updateTableView();

    return () => {
      isSubscribed = false;
    };
  }, [fetch]);
  return [state];
};
const StatefulTable = (props: {}) => {
  const [errorTableState] = useTableStateHandler(delayedFetchError);
  const [normalTableState] = useTableStateHandler(delayedFetch);
  return (
    <div style={{ margin: 40, padding: 40, width: 800, height: 800 }}>
      <Table
        title="Stateful Table - Bad Fetch"
        columns={[{ name: "someDataItem" }]}
        data={errorTableState.data ? errorTableState.data : []}
        loading={errorTableState.loading}
        error={errorTableState.error}
      />
      <div style={{ margin: 40 }} />
      <Table
        title="Stateful Table - Good Fetch"
        columns={[{ name: "someDataItem" }]}
        data={normalTableState.data ? normalTableState.data : []}
        loading={normalTableState.loading}
        error={normalTableState.error}
      />
    </div>
  );
};

export default StatefulTable;
