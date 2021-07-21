import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "./routesConfig";

export default function Routes() {
  return (
    <Switch>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
      <Route
        path="/"
        exact={true}
        component={() => <Redirect to="/pagina-inicial" />}
      />
      <Route component={() => <Redirect to="/pagina-nao-encontrada" />} />
    </Switch>
  );
}
