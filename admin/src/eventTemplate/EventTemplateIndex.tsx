import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { EventTemplateList } from "./EventTemplateList";
import { CreateEventTemplate } from "./CreateEventTemplate";
import { ViewEventTemplate } from "./ViewEventTemplate";

export const EventTemplateIndex = (): React.ReactElement => {
  useBreadcrumbs("/event-templates/", "EventTemplates");

  return (
    <Switch>
      <PrivateRoute
        exact
        path={"/event-templates/"}
        component={EventTemplateList}
      />
      <PrivateRoute
        path={"/event-templates/new"}
        component={CreateEventTemplate}
      />
      <PrivateRoute
        path={"/event-templates/:id"}
        component={ViewEventTemplate}
      />
    </Switch>
  );
};
