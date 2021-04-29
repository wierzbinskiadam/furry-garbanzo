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
import { Book as TBook } from "../api/book/Book";
import { BookCreateInput } from "../api/book/BookCreateInput";

const INITIAL_VALUES = {} as BookCreateInput;

export const CreateBook = (): React.ReactElement => {
  useBreadcrumbs("/books/new", "Create Book");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    TBook,
    AxiosError,
    BookCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/books", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/books"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: BookCreateInput) => {
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
            <FormHeader title={"Create Book"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <TextField label="Author" name="author" />
          </div>
          <div>
            <TextField label="PersonID" name="personId" />
          </div>
          <div>
            <TextField label="Titile" name="titile" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
