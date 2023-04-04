// @ts-nocheck
import {
  Button,
  useToast,
  Input,
  FormLabel,
  Checkbox,
  Select,
  Textarea,
  Center,
  Heading,
  Flex,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

// loader function to get users and categories data for the form
export const loader = async () => {
  const userResponse = await fetch("http://localhost:3000/users");
  const users = await userResponse.json();
  const categoriesResponse = await fetch("http://localhost:3000/categories");
  const categories = await categoriesResponse.json();
  return [users, categories];
};

export const AddEvents = () => {
  //Loader data from the back-end (users and categories)
  const [users, categories] = useLoaderData();
  const [isPending, setIsPending] = useState(false);

  //Navigation declaration
  const history = useNavigate();

  // React-hook-form
  const { register, handleSubmit } = useForm();

  //const onSubmit = (data) => console.log(data);

  // onSubmit POST request to the backend
  const onSubmit = async (data) => {
    setIsPending(true);
    await fetch("http://localhost:3000/events", {
      method: "POST",
      body: JSON.stringify({
        createdBy: Number(data.createdBy),
        title: data.title,
        description: data.description,
        image: data.image,
        categoryIds: data.categoryIds.map((id) => parseInt(id)),
        attendedBy: data.attendedBy.map((id) => parseInt(id)),
        location: data.location,
        startTime: data.startTime + ":00.000Z",
        endTime: data.endTime + ":00.000Z",
      }),
      headers: { "Content-type": "application/json" },
    }).then(() => {
      setIsPending(false);
      history("/");
    });
  };

  // useToast declaration for pop up message
  const toast = useToast();

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
          Add a new event
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormLabel
            mb={{ base: "20px" }}
            fontSize={{ base: "20px" }}
            color="#2F855A"
          >
            Title of the event:
            <Input
              mt={{ base: "10px" }}
              backgroundColor="white"
              focusBorderColor="#38A169"
              type="text"
              {...register("title", { required: true, min: 3 })}
            />
          </FormLabel>
          <FormLabel
            mb={{ base: "20px" }}
            fontSize={{ base: "20px" }}
            color="#2F855A"
          >
            Description of the event:
            <Textarea
              mt={{ base: "10px" }}
              backgroundColor="white"
              colorScheme="whatsapp"
              focusBorderColor="#38A169"
              {...register("description", {
                required: true,
                min: 20,
                maxLength: 400,
              })}
            />
          </FormLabel>
          <FormLabel
            mb={{ base: "20px" }}
            fontSize={{ base: "20px" }}
            color="#2F855A"
          >
            Image of the event in URL form:
            <Input
              mt={{ base: "10px" }}
              backgroundColor="white"
              colorScheme="whatsapp"
              focusBorderColor="#38A169"
              type="url"
              {...register("image", {})}
            />
          </FormLabel>
          <FormLabel
            mb={{ base: "20px" }}
            fontSize={{ base: "20px" }}
            color="#2F855A"
          >
            Location of the event:
            <Input
              mt={{ base: "10px" }}
              backgroundColor="white"
              colorScheme="whatsapp"
              focusBorderColor="#38A169"
              type="text"
              {...register("location", { required: true })}
            />
          </FormLabel>
          <FormLabel
            mb={{ base: "20px" }}
            fontSize={{ base: "20px" }}
            color="#2F855A"
          >
            Start time:
            <Input
              mt={{ base: "10px" }}
              color="black"
              backgroundColor="white"
              focusBorderColor="#38A169"
              type="datetime-local"
              {...register("startTime", { required: true })}
            />
          </FormLabel>
          <FormLabel
            mb={{ base: "20px" }}
            fontSize={{ base: "20px" }}
            color="#2F855A"
          >
            End time:
            <Input
              mt={{ base: "10px" }}
              color="black"
              backgroundColor="white"
              focusBorderColor="#38A169"
              type="datetime-local"
              {...register("endTime", { required: true })}
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
                <FormLabel color="#2F855A" fontSize={{ base: "17px" }} key={id}>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                  <Checkbox
                    ml={"10px"}
                    mt={"5px"}
                    backgroundColor="white"
                    colorScheme="whatsapp"
                    type="checkbox"
                    id={id}
                    value={id}
                    {...register("categoryIds", { required: true })}
                  />
                </FormLabel>
              ))}
            </Flex>
          </FormLabel>
          <FormLabel
            mb={{ base: "20px" }}
            fontSize={{ base: "20px" }}
            color="#2F855A"
          >
            Attended by:
            <Flex mt={{ base: "10px" }}>
              {users.map(({ name, id }) => (
                <FormLabel color="#2F855A" fontSize={{ base: "17px" }} key={id}>
                  {name}
                  <Checkbox
                    ml={"10px"}
                    mt={"5px"}
                    backgroundColor="white"
                    colorScheme="whatsapp"
                    type="checkbox"
                    id={id}
                    value={id}
                    {...register("attendedBy", {})}
                  />
                </FormLabel>
              ))}
            </Flex>
          </FormLabel>
          <FormLabel
            mb={{ base: "20px" }}
            fontSize={{ base: "20px" }}
            color="#2F855A"
          >
            Created by:
            <Select
              mt={{ base: "10px" }}
              color="black"
              backgroundColor="white"
              focusBorderColor="#38A169"
              {...register("createdBy")}
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Select>
          </FormLabel>

          {isPending ? (
            <Button
              disabled
              color="white"
              background="#38A169"
              mb={{ base: "20px" }}
            >
              Adding event...
            </Button>
          ) : (
            <Button
              type="submit"
              onClick={() =>
                toast({
                  title: "Event added",
                  description:
                    "We have successfully created the event for you!",
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                  position: "top",
                })
              }
              color="white"
              background="#38A169"
              mb={{ base: "20px" }}
            >
              Add event
            </Button>
          )}
        </form>
      </Center>
    </>
  );
};
