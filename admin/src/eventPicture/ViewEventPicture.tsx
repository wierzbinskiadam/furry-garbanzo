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
import { EventPicture as TEventPicture } from "../api/eventPicture/EventPicture";
import { EventPictureUpdateInput } from "../api/eventPicture/EventPictureUpdateInput";

export const ViewEventPicture = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/event-pictures/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TEventPicture,
    AxiosError,
    [string, string]
  >(["get-/api/event-pictures", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/event-pictures"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TEventPicture, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/event-pictures"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//event-pictures");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TEventPicture, AxiosError, EventPictureUpdateInput>(
    async (data) => {
      const response = await api.patch(`${"/api/event-pictures"}/${id}`, data);
      return response.data;
    }
  );

  const handleSubmit = React.useCallback(
    (values: EventPictureUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.image);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(() => pick(data, ["image", "sort"]), [
    data,
  ]);

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
                title={`${"EventPictures"} ${
                  data?.image && data?.image.length ? data.image : data?.id
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
              <TextField label="Image" name="image" />
            </div>
            <div>
              <TextField type="number" step={1} label="Sort" name="sort" />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
