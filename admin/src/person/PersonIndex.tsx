import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { PersonList } from "./PersonList";
import { CreatePerson } from "./CreatePerson";
import { ViewPerson } from "./ViewPerson";

export const PersonIndex = (): React.ReactElement => {
  useBreadcrumbs("/people/", "People");

  return (
    <Switch>
      <PrivateRoute exact path={"/people/"} component={PersonList} />
      <PrivateRoute path={"/people/new"} component={CreatePerson} />
      <PrivateRoute path={"/people/:id"} component={ViewPerson} />
    </Switch>
  );
};
