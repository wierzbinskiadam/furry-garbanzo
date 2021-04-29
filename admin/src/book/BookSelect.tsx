import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { Book as TBook } from "../api/book/Book";

type Data = TBook[];

type Props = Omit<SelectFieldProps, "options">;

export const BookSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>("select-/api/books", async () => {
    const response = await api.get("/api/books");
    return response.data;
  });

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label: item.author && item.author.length ? item.author : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
