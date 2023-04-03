// @ts-nocheck
import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
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
  const history = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleDelete = async () => {
    const response = await fetch(`http://localhost:3000/events/` + event.id, {
      method: "DELETE",
    });
    if (response.ok) {
      toast({
        title: "Event updated",
        description: "We have successfully edited the event for you!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      history("/");
    } else {
      toast({
        title: "Event updated",
        description: "Something went wrong!",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <>
      <Event event={event} category={categories} users={users} />
      <Link to={`/event/${event.id}/editevent`}>
        <Button>Edit event</Button>
      </Link>
      <Button onClick={onOpen}>Delete Event</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Are you sure you would like to delete this event?
          </ModalHeader>
          <ModalCloseButton />
          <ModalFooter>
            <Button onClick={handleDelete}>Yes</Button>
            <Button onClick={onClose}>No</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
