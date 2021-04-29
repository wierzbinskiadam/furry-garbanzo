import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { Person as TPerson } from "../api/person/Person";

type Data = TPerson[];

type Props = Omit<SelectFieldProps, "options">;

export const PersonSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/people",
    async () => {
      const response = await api.get("/api/people");
      return response.data;
    }
  );

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label: item.surname && item.surname.length ? item.surname : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
