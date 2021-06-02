import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  ListProps,
  TextField,
  DateField,
} from "react-admin";

export const PersonShow = (props: ListProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField label="Birthday" source="birthday" />
        <DateField source="createdAt" label="Created At" />
        <TextField label="ID" source="id" />
        <TextField label="Surname" source="surname" />
        <DateField source="updatedAt" label="Updated At" />
      </SimpleShowLayout>
    </Show>
  );
};
