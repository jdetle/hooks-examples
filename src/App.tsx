import React, { useState, useEffect, useMemo } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import Routes from "./routes";

type IUserType = { email: string };
const get = (apiUrl: string) => {
  return new Promise<any>(resolve => {
    setTimeout(() => resolve({ email: "jdetle@gmail.com" }), 5000);
  });
};

const fetch = () => {
  if (Math.random() * 10 > 8) {
    return "foo";
  } else {
    return "bar";
  }
};
export const OwnUserContext = React.createContext<IUserType | null>(null);
export const ComputedDataContext = React.createContext<string[] | null>(null);
function App() {
  const [loggedInUser, setLoggedInUser] = useState<IUserType | null>(null);
  const [data, setData] = useState<string>("initial_data");

  const computedData = useMemo(() => {
    return [...Array(Number(100000))].map(() => data);
  }, [data]);

  useEffect(() => {
    setInterval(() => {
      setData(fetch());
    }, 1000);
  }, []);

  useEffect(() => {
    get("/api/users/me").then((ownData: IUserType) => {
      setLoggedInUser(ownData);
    });
  }, []);
  return (
    <BrowserRouter>
      <Switch>
        <ComputedDataContext.Provider value={computedData}>
          <OwnUserContext.Provider value={loggedInUser}>
            <Route path="/" exact={true} component={Routes.Splash} />
            <Route path="/counter" exact={true} component={Routes.Counter} />
            <Route
              path="/use_toggle"
              exact={true}
              component={Routes.UseToggle}
            />
            <Route
              path="/two_fetches"
              exact={true}
              component={Routes.TwoFetches}
            />
            <Route
              path="/stateful_table"
              exact={true}
              component={Routes.StatefulTable}
            />

            <Route path="/use_ref" component={Routes.InputRef} />
            <Route path="/use_context" component={Routes.UseContext} />

            <Route
              path="/use_context_with_memo"
              component={Routes.UseContextUseMemo}
            />
          </OwnUserContext.Provider>
        </ComputedDataContext.Provider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
