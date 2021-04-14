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
import { UserSelect } from "../user/UserSelect";
import { EventTemplate as TEventTemplate } from "../api/eventTemplate/EventTemplate";
import { EventTemplateCreateInput } from "../api/eventTemplate/EventTemplateCreateInput";

const INITIAL_VALUES = {} as EventTemplateCreateInput;

export const CreateEventTemplate = (): React.ReactElement => {
  useBreadcrumbs("/event-templates/new", "Create EventTemplate");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    TEventTemplate,
    AxiosError,
    EventTemplateCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/event-templates", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/event-templates"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: EventTemplateCreateInput) => {
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
            <FormHeader title={"Create EventTemplate"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <TextField label="Description" name="description" textarea />
          </div>
          <div>
            <UserSelect label="Teacher" name="teacher.id" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
