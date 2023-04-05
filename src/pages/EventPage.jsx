// @ts-nocheck
import {
  Button,
  Center,
  Flex,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Center display={"flex"} flexDir={"column"} rowGap={5}>
        <Flex flexDirection={{ base: "column" }}>
          <Event event={event} category={categories} users={users} />
          <Flex
            display={"flex"}
            flexDirection={{ base: "column", md: "row" }}
            columnGap={{ md: 5 }}
            mt={{ base: "50px" }}
          >
            <Link to={`/event/${event.id}/editevent`}>
              <Button
                color="white"
                background="#38A169"
                mb={{ base: "10px" }}
                width="350px"
              >
                Edit event
              </Button>
            </Link>
            <Button
              onClick={onOpen}
              color="white"
              background="#38A169"
              mb={{ base: "20px" }}
              width="350px"
            >
              Delete Event
            </Button>
          </Flex>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader color="#2F855A">
                Are you sure you would like to delete this event?
              </ModalHeader>
              <ModalCloseButton />
              <ModalFooter display={"flex"}>
                <Button
                  onClick={handleDelete}
                  color="white"
                  background="#38A169"
                  mb={{ base: "20px" }}
                  mr="10px"
                >
                  Yes
                </Button>
                <Button
                  onClick={onClose}
                  color="white"
                  background="#C53030"
                  mb={{ base: "20px" }}
                >
                  No
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>
      </Center>
    </>
  );
};
