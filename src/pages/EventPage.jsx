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

//Data loader
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

  //Navigation hook
  const history = useNavigate();

  //Pop up message hook
  const toast = useToast();

  //Modal actions
  const { isOpen, onOpen, onClose } = useDisclosure();

  //Delete request
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

  // Jump to the top of the page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Center display="flex" flexDir="column" rowGap={5}>
        <Flex flexDirection="column">
          <Event event={event} category={categories} users={users} />
          <Flex
            display="flex"
            flexDirection={{ base: "column", md: "row" }}
            columnGap={{ md: 5 }}
            mt="50px"
            ml={{ lg: "150px" }}
          >
            <Link to={`/event/${event.id}/editevent`}>
              <Button
                color="white"
                background="#38A169"
                mb="10px"
                width={{ base: "350px", xl: "400px" }}
                fontSize={{ xl: "25px" }}
              >
                Edit event
              </Button>
            </Link>
            <Button
              onClick={onOpen}
              color="white"
              background="#38A169"
              mb="20px"
              width={{ base: "350px", xl: "400px" }}
              fontSize={{ xl: "25px" }}
            >
              Delete Event
            </Button>
          </Flex>
          <Modal isOpen={isOpen} onClose={onClose} size={{ xl: "xl" }}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader color="#2F855A">
                Are you sure you would like to delete this event?
              </ModalHeader>
              <ModalCloseButton />
              <ModalFooter display="flex">
                <Button
                  onClick={handleDelete}
                  color="white"
                  background="#38A169"
                  mb="20px"
                  mr="10px"
                >
                  Yes
                </Button>
                <Button
                  onClick={onClose}
                  color="white"
                  background="#C53030"
                  mb="20px"
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
