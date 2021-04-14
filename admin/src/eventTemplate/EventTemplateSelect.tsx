import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { EventTemplate as TEventTemplate } from "../api/eventTemplate/EventTemplate";

type Data = TEventTemplate[];

type Props = Omit<SelectFieldProps, "options">;

export const EventTemplateSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/event-templates",
    async () => {
      const response = await api.get("/api/event-templates");
      return response.data;
    }
  );

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label: item.id && item.id.length ? item.id : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
