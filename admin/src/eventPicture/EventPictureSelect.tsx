import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { EventPicture as TEventPicture } from "../api/eventPicture/EventPicture";

type Data = TEventPicture[];

type Props = Omit<SelectFieldProps, "options">;

export const EventPictureSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/event-pictures",
    async () => {
      const response = await api.get("/api/event-pictures");
      return response.data;
    }
  );

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label: item.image && item.image.length ? item.image : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
