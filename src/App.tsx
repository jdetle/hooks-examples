import React, { useState, useEffect } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import Routes from "./routes";

type IUserType = { email: string };
const get = (apiUrl: string) => {
  return new Promise<any>(resolve => {
    setTimeout(() => resolve({ email: "jdetle@gmail.com" }), 5000);
  });
};

export const OwnUserContext = React.createContext<IUserType | null>(null);

function App() {
  const [loggedInUser, setLoggedInUser] = useState<IUserType | null>(null);

  useEffect(() => {
    get("/api/users/me").then((ownData: IUserType) => {
      setLoggedInUser(ownData);
    });
  }, []);
  return (
    <BrowserRouter>
      <Switch>
        <OwnUserContext.Provider value={loggedInUser}>
          <Route path="/" exact={true} component={Routes.Splash} />
          <Route path="/counter" exact={true} component={Routes.Counter} />
          <Route path="/use_toggle" exact={true} component={Routes.UseToggle} />
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
          {/*
      <Route
        path="/use_context_with_use_memo"
        component={Routes.UseContextWithUseMemo}
      />
      <Route path="/profile_slow_form" component={Routes.ProfilingExample} /> */}
        </OwnUserContext.Provider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
