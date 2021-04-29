import * as React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { Formik } from "formik";
import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  TextField,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { Person as TPerson } from "../api/person/Person";
import { PersonCreateInput } from "../api/person/PersonCreateInput";

const INITIAL_VALUES = {} as PersonCreateInput;

export const CreatePerson = (): React.ReactElement => {
  useBreadcrumbs("/people/new", "Create Person");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    TPerson,
    AxiosError,
    PersonCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/people", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/people"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: PersonCreateInput) => {
      void create(values);
    },
    [create]
  );
  return (
    <>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        <Form
          formStyle={EnumFormStyle.Horizontal}
          formHeaderContent={
            <FormHeader title={"Create Person"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <TextField type="datetime-local" label="Birthday" name="birthday" />
          </div>
          <div>
            <TextField label="Surname" name="surname" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
