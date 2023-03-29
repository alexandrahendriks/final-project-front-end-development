import {
  Button,
  Modal,
  ModalHeader,
  useDisclosure,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
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
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Event event={event} category={categories} users={users} />
      <Button onClick={onOpen}>Edit event</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit your event!</ModalHeader>
          <EditForm
            event={event}
            category={categories}
            users={users}
            onClose={onClose}
          />
        </ModalContent>
      </Modal>
    </>
  );
};
