import * as React from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery, useMutation } from "react-query";
import { Formik } from "formik";
import pick from "lodash.pick";

import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  EnumButtonStyle,
  TextField,
} from "@amplication/design-system";

import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { Person as TPerson } from "../api/person/Person";
import { PersonUpdateInput } from "../api/person/PersonUpdateInput";

export const ViewPerson = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/people/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TPerson,
    AxiosError,
    [string, string]
  >(["get-/api/people", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/people"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TPerson, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/people"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//people");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TPerson, AxiosError, PersonUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/people"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: PersonUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.surname);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () => pick(data, ["birthday", "surname"]),
    [data]
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <>
      {data && (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form
            formStyle={EnumFormStyle.Horizontal}
            formHeaderContent={
              <FormHeader
                title={`${"Person"} ${
                  data?.surname && data?.surname.length
                    ? data.surname
                    : data?.id
                }`}
              >
                <Button
                  type="button"
                  disabled={updateIsLoading}
                  buttonStyle={EnumButtonStyle.Secondary}
                  icon="trash_2"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button type="submit" disabled={updateIsLoading}>
                  Save
                </Button>
              </FormHeader>
            }
          >
            <div>
              <TextField
                type="datetime-local"
                label="Birthday"
                name="birthday"
              />
            </div>
            <div>
              <TextField label="Surname" name="surname" />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
