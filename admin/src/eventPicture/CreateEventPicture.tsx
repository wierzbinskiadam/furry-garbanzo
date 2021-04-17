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
import { EventPicture as TEventPicture } from "../api/eventPicture/EventPicture";
import { EventPictureCreateInput } from "../api/eventPicture/EventPictureCreateInput";

const INITIAL_VALUES = {} as EventPictureCreateInput;

export const CreateEventPicture = (): React.ReactElement => {
  useBreadcrumbs("/event-pictures/new", "Create EventPictures");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    TEventPicture,
    AxiosError,
    EventPictureCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/event-pictures", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/event-pictures"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: EventPictureCreateInput) => {
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
            <FormHeader title={"Create EventPictures"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <TextField label="Image" name="image" />
          </div>
          <div>
            <TextField type="number" step={1} label="Sort" name="sort" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
