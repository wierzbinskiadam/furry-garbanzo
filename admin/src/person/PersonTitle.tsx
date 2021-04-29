import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Person as TPerson } from "../api/person/Person";

type Props = { id: string };

export const PersonTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    TPerson,
    AxiosError,
    [string, string]
  >(["get-/api/people", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/people"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/people"}/${id}`} className="entity-id">
      {data?.surname && data?.surname.length ? data.surname : data?.id}
    </Link>
  );
};
