import React from "react";
import { Heading } from "@chakra-ui/react";
import { useFetch } from "../useFetch";
import { Events } from "../components/Events";

export const EventsPage = () => {
  const {
    data: events,
    isLoading,
    error,
  } = useFetch("http://localhost:3000/events");

  const { data: category } = useFetch("http://localhost:3000/categories");

  return (
    <>
      <Heading>List of all events!</Heading>

      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}
      {events && (
        <Events
          events={events}
          category={category}
          title="List of all events!"
        />
      )}
    </>
  );
};
