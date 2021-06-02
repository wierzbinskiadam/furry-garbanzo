import * as React from "react";
import { Edit, SimpleForm, EditProps, TextInput } from "react-admin";

export const BookEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="Author" source="author" />
        <TextInput label="PersonID" source="personId" />
        <TextInput label="Titile" source="titile" />
      </SimpleForm>
    </Edit>
  );
};
