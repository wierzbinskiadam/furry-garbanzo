import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  ListProps,
  TextField,
  DateField,
} from "react-admin";

export const BookShow = (props: ListProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField label="Author" source="author" />
        <DateField source="createdAt" label="Created At" />
        <TextField label="ID" source="id" />
        <TextField label="PersonID" source="personId" />
        <TextField label="Titile" source="titile" />
        <DateField source="updatedAt" label="Updated At" />
      </SimpleShowLayout>
    </Show>
  );
};
