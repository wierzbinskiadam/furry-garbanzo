import * as React from "react";
import { Create, SimpleForm, CreateProps, TextInput } from "react-admin";

export const BookCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="Author" source="author" />
        <TextInput label="PersonID" source="personId" />
        <TextInput label="Titile" source="titile" />
      </SimpleForm>
    </Create>
  );
};
