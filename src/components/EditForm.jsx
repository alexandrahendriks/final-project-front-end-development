// @ts-nocheck
import {
  FormLabel,
  Input,
  Button,
  Textarea,
  Checkbox,
  useToast,
  Center,
  Heading,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";

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

export const EditForm = () => {
  const [event, categories] = useLoaderData();
  const [userEvent, setUserEvent] = useState(event);
  const [isPending, setIsPending] = useState(false);
  const toast = useToast();
  const history = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    console.log(userEvent);
    const response = await fetch(
      `http://localhost:3000/events/` + userEvent.id,
      {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(userEvent),
      }
    );
    if (response.ok) {
      setIsPending(false);
      toast({
        title: "Event updated",
        description: "We have successfully edited the event for you!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      history(`/event/${userEvent.id}`);
    } else {
      toast({
        title: "Event updated",
        description: "Something went wrong!",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      setIsPending(false);
    }
  };

  const handleClick = (e) => {
    const { value, checked } = e.target;
    const categoryIds = userEvent.categoryIds;
    if (checked) {
      const valueExist = categoryIds.includes(Number(value));
      if (!valueExist) {
        categoryIds.push(Number(value));
        setUserEvent({ ...userEvent, categoryIds: categoryIds });
      }
    } else {
      setUserEvent({
        ...userEvent,
        categoryIds: categoryIds.filter((id) => Number(value) !== id),
      });
    }
  };

  //Handlechange function for the input fields
  const handleChange = (e) => {
    setUserEvent({ ...userEvent, [e.target.name]: e.target.value });
    console.log(userEvent);
  };

  return (
    <>
      <Center display={"flex"} flexDirection={"column"} ml={{ base: "10px" }}>
        <Heading
          mb="40px"
          mt="30px"
          color="#2F855A"
          fontSize={{ base: "30px", md: "50px", xl: "60px" }}
          fontFamily={"Times new roman"}
        >
          Edit your event here
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormLabel
            mb={{ base: "20px" }}
            fontSize={{ base: "20px" }}
            color="#2F855A"
          >
            Title of the event:
            <Input
              name="title"
              value={userEvent.title}
              onChange={handleChange}
              mt={{ base: "10px" }}
              backgroundColor="white"
              focusBorderColor="#38A169"
            />
          </FormLabel>
          <FormLabel
            mb={{ base: "20px" }}
            fontSize={{ base: "20px" }}
            color="#2F855A"
          >
            Description of the event:
            <Textarea
              name="description"
              value={userEvent.description}
              onChange={handleChange}
              mt={{ base: "10px" }}
              backgroundColor="white"
              focusBorderColor="#38A169"
            />
          </FormLabel>
          <FormLabel
            mb={{ base: "20px" }}
            fontSize={{ base: "20px" }}
            color="#2F855A"
          >
            Image of the event in URL form:
            <Input
              type="url"
              name="image"
              value={userEvent.image}
              onChange={handleChange}
              mt={{ base: "10px" }}
              backgroundColor="white"
              focusBorderColor="#38A169"
            />
          </FormLabel>
          <FormLabel
            mb={{ base: "20px" }}
            fontSize={{ base: "20px" }}
            color="#2F855A"
          >
            Location of the event:
            <Input
              name="location"
              value={userEvent.location}
              onChange={handleChange}
              mt={{ base: "10px" }}
              backgroundColor="white"
              focusBorderColor="#38A169"
            />
          </FormLabel>
          <FormLabel
            mb={{ base: "20px" }}
            fontSize={{ base: "20px" }}
            color="#2F855A"
          >
            Start time:
            <Input
              type="datetime-local"
              name="startTime"
              value={new Date(userEvent.startTime).toISOString().slice(0, 16)}
              onChange={handleChange}
              mt={{ base: "10px" }}
              backgroundColor="white"
              focusBorderColor="#38A169"
            />
          </FormLabel>
          <FormLabel
            mb={{ base: "20px" }}
            fontSize={{ base: "20px" }}
            color="#2F855A"
          >
            End time:
            <Input
              name="endTime"
              type="datetime-local"
              defaultValue={new Date(userEvent.endTime)
                .toISOString()
                .slice(0, 16)}
              onChange={handleChange}
              mt={{ base: "10px" }}
              backgroundColor="white"
              focusBorderColor="#38A169"
            />
          </FormLabel>

          <FormLabel
            mb={{ base: "20px" }}
            fontSize={{ base: "20px" }}
            color="#2F855A"
          >
            Catgeories:
            <Flex mt={{ base: "10px" }}>
              {categories.map(({ name, id }) => (
                <FormLabel key={id} color="#2F855A" fontSize={{ base: "17px" }}>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                  <Checkbox
                    ml={"10px"}
                    mt={"5px"}
                    backgroundColor="white"
                    colorScheme="whatsapp"
                    type="checkbox"
                    name={name}
                    value={id}
                    defaultChecked={event.categoryIds.includes(id)}
                    onChange={handleClick}
                  />
                </FormLabel>
              ))}
            </Flex>
          </FormLabel>
          {isPending ? (
            <Button
              disabled
              color="white"
              background="#38A169"
              mb={{ base: "20px" }}
              mr={{ base: "20px" }}
            >
              Saving event...
            </Button>
          ) : (
            <Button
              type="submit"
              color="white"
              background="#38A169"
              mb={{ base: "20px" }}
              mr={{ base: "20px" }}
            >
              Save
            </Button>
          )}

          <Link to={`/event/${event.id}`}>
            <Button color="white" background="#38A169" mb={{ base: "20px" }}>
              Back
            </Button>
          </Link>
        </form>
      </Center>
    </>
  );
};
