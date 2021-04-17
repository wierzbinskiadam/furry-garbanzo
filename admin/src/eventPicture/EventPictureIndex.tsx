import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { EventPictureList } from "./EventPictureList";
import { CreateEventPicture } from "./CreateEventPicture";
import { ViewEventPicture } from "./ViewEventPicture";

export const EventPictureIndex = (): React.ReactElement => {
  useBreadcrumbs("/event-pictures/", "EventPictures");

  return (
    <Switch>
      <PrivateRoute
        exact
        path={"/event-pictures/"}
        component={EventPictureList}
      />
      <PrivateRoute
        path={"/event-pictures/new"}
        component={CreateEventPicture}
      />
      <PrivateRoute path={"/event-pictures/:id"} component={ViewEventPicture} />
    </Switch>
  );
};
