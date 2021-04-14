import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { EventTemplate as TEventTemplate } from "../api/eventTemplate/EventTemplate";

type Props = { id: string };

export const EventTemplateTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    TEventTemplate,
    AxiosError,
    [string, string]
  >(["get-/api/event-templates", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/event-templates"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/event-templates"}/${id}`} className="entity-id">
      {data?.id && data?.id.length ? data.id : data?.id}
    </Link>
  );
};
