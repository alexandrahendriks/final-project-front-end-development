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

//Data loader
export const loader = async ({ params }) => {
  const event = await (
    await fetch(`http://localhost:3000/events/${params.eventId}`)
  ).json();
  const categories = await (
    await fetch("http://localhost:3000/categories")
  ).json();
  const users = await (await fetch("http://localhost:3000/users")).json();

  return [event, categories, users];
};

export const EditForm = () => {
  const [event, categories] = useLoaderData();
  const [userEvent, setUserEvent] = useState(event);
  const [isPending, setIsPending] = useState(false);

  //Pop up message hook
  const toast = useToast();

  //Navigation hook
  const history = useNavigate();

  //Jump to the top of the page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //PUT request to the backend
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

  //Setting the state value for categories
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
    console.log(e.target.value);
    setUserEvent({ ...userEvent, [e.target.name]: e.target.value });
    console.log(userEvent);
  };

  return (
    <>
      <Center display="flex" flexDirection="column" ml="10px">
        <Heading
          mb="40px"
          mt="30px"
          color="#2F855A"
          fontSize={{ base: "30px", md: "50px", xl: "60px" }}
          fontFamily="Times new roman"
        >
          Edit your event here
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormLabel mb="20px" fontSize="20px" color="#2F855A">
            Title of the event:
            <Input
              name="title"
              value={userEvent.title}
              onChange={handleChange}
              mt="10px"
              backgroundColor="white"
              focusBorderColor="#38A169"
            />
          </FormLabel>
          <FormLabel mb="20px" fontSize="20px" color="#2F855A">
            Description of the event:
            <Textarea
              name="description"
              value={userEvent.description}
              onChange={handleChange}
              mt="10px"
              backgroundColor="white"
              focusBorderColor="#38A169"
            />
          </FormLabel>
          <FormLabel mb="20px" fontSize="20px" color="#2F855A">
            Image of the event in URL form:
            <Input
              type="url"
              name="image"
              value={userEvent.image}
              onChange={handleChange}
              mt="10px"
              backgroundColor="white"
              focusBorderColor="#38A169"
            />
          </FormLabel>
          <FormLabel mb="20px" fontSize="20px" color="#2F855A">
            Location of the event:
            <Input
              name="location"
              value={userEvent.location}
              onChange={handleChange}
              mt="10px"
              backgroundColor="white"
              focusBorderColor="#38A169"
            />
          </FormLabel>

          <FormLabel mb="20px" fontSize="20px" color="#2F855A">
            Start time:
            <Input
              type="datetime-local"
              name="startTime"
              value={userEvent.startTime}
              onChange={handleChange}
              required
              mt="10px"
              backgroundColor="white"
              focusBorderColor="#38A169"
            />
          </FormLabel>
          <FormLabel mb="20px" fontSize="20px" color="#2F855A">
            End time:
            <Input
              name="endTime"
              type="datetime-local"
              value={userEvent.location}
              onChange={handleChange}
              mt="10px"
              backgroundColor="white"
              focusBorderColor="#38A169"
              required
            />
          </FormLabel>

          <FormLabel mb="20px" fontSize="20px" color="#2F855A">
            Catgeories:
            <Flex mt="10px">
              {categories.map(({ name, id }) => (
                <FormLabel key={id} color="#2F855A" fontSize="17px">
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                  <Checkbox
                    ml="10px"
                    mt="5px"
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
              mb="20px"
              mr="20px"
              width={{ lg: "150px" }}
            >
              Saving event...
            </Button>
          ) : (
            <Button
              type="submit"
              color="white"
              background="#38A169"
              mb="20px"
              mr="20px"
              width={{ lg: "150px" }}
            >
              Save
            </Button>
          )}

          <Link to={`/event/${event.id}`}>
            <Button
              color="white"
              background="#38A169"
              mb="20px"
              width={{ lg: "150px" }}
            >
              Back
            </Button>
          </Link>
        </form>
      </Center>
    </>
  );
};
