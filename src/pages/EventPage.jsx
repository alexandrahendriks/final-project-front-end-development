// @ts-nocheck
import {
  Button,
  Modal,
  ModalHeader,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  FormLabel,
  Checkbox,
  Input,
  useToast,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { EditForm } from "../components/EditForm";
import { Event } from "../components/Event";

export const loader = async ({ params }) => {
  const eventResponse = await fetch(
    `http://localhost:3000/events/${params.eventId}`
  );
  const event = await eventResponse.json();
  const categoriesResponse = await fetch("http://localhost:3000/categories");
  const categories = await categoriesResponse.json();
  const usersResponse = await fetch("http://localhost:3000/users");
  const users = await usersResponse.json();

  return [event, categories, users];
};

export const EventPage = () => {
  const [event, categories, users] = useLoaderData();

  return (
    <>
      <Event event={event} category={categories} users={users} />
      <Link to={`/event/${event.id}/editevent`}>
        <Button>Edit event</Button>
      </Link>
    </>
  );
};
