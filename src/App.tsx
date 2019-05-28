import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import Routes from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={Routes.Splash} />
        <Route path="/counter" exact={true} component={Routes.Counter} />
        <Route path="/use_toggle" exact={true} component={Routes.UseToggle} />
        <Route path="/two_fetches" exact={true} component={Routes.TwoFetches} />
        <Route
          path="/stateful_table"
          exact={true}
          component={Routes.StatefulTable}
        />
        {/*
      <Route path="/input_ref" component={Routes.InputRef} />
      <Route path="/use_context" component={Routes.UseContext} />
      <Route
        path="/use_context_with_use_memo"
        component={Routes.UseContextWithUseMemo}
      />
      <Route path="/profile_slow_form" component={Routes.ProfilingExample} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
