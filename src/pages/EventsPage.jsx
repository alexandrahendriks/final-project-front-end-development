// @ts-nocheck
import React, { useEffect } from "react";
import { Heading } from "@chakra-ui/react";
import { Filter } from "../components/Filter";
import { useLoaderData } from "react-router-dom";

//Data Loader
export const loader = async () => {
  const event = await (await fetch(`http://localhost:3000/events/`)).json();
  const categories = await (
    await fetch("http://localhost:3000/categories")
  ).json();
  const users = await (await fetch("http://localhost:3000/users")).json();

  return [event, categories, users];
};

export const EventsPage = () => {
  const [event, categories] = useLoaderData();

  //Jump to the top of the page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Heading
        textAlign="center"
        mb="30px"
        mt="30px"
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
