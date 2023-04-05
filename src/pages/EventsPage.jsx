// @ts-nocheck
import React, { useEffect } from "react";
import { Heading } from "@chakra-ui/react";
import { Filter } from "../components/Filter";
import { useLoaderData } from "react-router-dom";

//Data Loader
export const loader = async () => {
  const eventResponse = await fetch(`http://localhost:3000/events/`);
  const event = await eventResponse.json();
  const categoriesResponse = await fetch("http://localhost:3000/categories");
  const categories = await categoriesResponse.json();
  const usersResponse = await fetch("http://localhost:3000/users");
  const users = await usersResponse.json();

  return [event, categories, users];
};

export const EventsPage = () => {
  const [event, categories] = useLoaderData();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Heading
        textAlign="center"
        mb={{ base: "30px" }}
        mt={{ base: "30px" }}
        color="#2F855A"
        fontSize={{ base: "40px", md: "50px", xl: "60px" }}
        fontFamily={("Times new roman", "serif")}
      >
        All events
      </Heading>
      <Filter events={event} category={categories} />
    </>
  );
};
