import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { EventPicture as TEventPicture } from "../api/eventPicture/EventPicture";

type Props = { id: string };

export const EventPictureTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    TEventPicture,
    AxiosError,
    [string, string]
  >(["get-/api/event-pictures", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/event-pictures"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/event-pictures"}/${id}`} className="entity-id">
      {data?.image && data?.image.length ? data.image : data?.id}
    </Link>
  );
};
