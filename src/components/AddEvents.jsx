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
  Flex,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Header } from "./Header";

// loader function to get users and categories data for the form
export const loader = async () => {
  const users = await (await fetch("http://localhost:3000/users")).json();
  const categories = await (
    await fetch("http://localhost:3000/categories")
  ).json();

  return [users, categories];
};

export const AddEvents = () => {
  //Loader data from the back-end (users and categories)
  const [users, categories] = useLoaderData();
  const [isPending, setIsPending] = useState(false);

  //Navigation declaration
  const history = useNavigate();

  // React-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //const onSubmit = (data) => console.log(data);

  // onSubmit POST request to the backend
  const onSubmit = async (data) => {
    setIsPending(true);
    const response = await fetch("http://localhost:3000/events", {
      method: "POST",
      body: JSON.stringify({
        createdBy: Number(data.createdBy),
        title: data.title,
        description: data.description,
        image: data.image,
        categoryIds: data.categoryIds.map((id) => parseInt(id)),
        attendedBy: data.attendedBy.map((id) => parseInt(id)),
        location: data.location,
        startTime: data.startTime,
        endTime: data.endTime,
      }),
      headers: { "Content-type": "application/json" },
    });
    if (response.ok) {
      setIsPending(false);
      toast({
        title: "Event added",
        description: "We have successfully created the event for you!",
        status: "success",
        duration: 10000,
        isClosable: true,
        position: "top",
      });
      history("/");
    } else {
      toast({
        title: "Adding the event wasn't successful",
        description: "Something went wrong!",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      setIsPending(false);
    }
  };

  //Jump to the top of the page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // useToast declaration for pop up message
  const toast = useToast();

  return (
    <>
      <Center display="flex" flexDirection="column" ml="10px">
        <Header title={"Add a new event"} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormLabel mb="20px" fontSize="20px" color="#2F855A">
            Title of the event:
            <Input
              mt="10px"
              backgroundColor="white"
              focusBorderColor="#38A169"
              type="text"
              {...register("title", { required: true })}
            />
            {errors.title && errors.title.type === "required" && (
              <Text mt="8px" color="red">
                This field is required!
              </Text>
            )}
          </FormLabel>
          <FormLabel mb="20px" fontSize="20px" color="#2F855A">
            Description of the event:
            <Textarea
              mt="10px"
              backgroundColor="white"
              focusBorderColor="#38A169"
              {...register("description", {
                required: true,
              })}
            />
            {errors.description && errors.description.type === "required" && (
              <Text mt="8px" color="red">
                This field is required!
              </Text>
            )}
          </FormLabel>
          <FormLabel mb="20px" fontSize="20px" color="#2F855A">
            Image of the event in URL form:
            <Input
              mt="10px"
              backgroundColor="white"
              focusBorderColor="#38A169"
              type="url"
              {...register("image", { required: true })}
            />
            {errors.image && errors.image.type === "required" && (
              <Text mt="8px" color="red">
                This field is required!
              </Text>
            )}
          </FormLabel>
          <FormLabel mb="20px" fontSize="20px" color="#2F855A">
            Location of the event:
            <Input
              mt="10px"
              backgroundColor="white"
              focusBorderColor="#38A169"
              type="text"
              {...register("location", { required: true })}
            />
            {errors.location && errors.location.type === "required" && (
              <Text mt="8px" color="red">
                This field is required!
              </Text>
            )}
          </FormLabel>
          <FormLabel mb="20px" fontSize="20px" color="#2F855A">
            Start time:
            <Input
              mt="10px"
              color="black"
              backgroundColor="white"
              focusBorderColor="#38A169"
              type="datetime-local"
              {...register("startTime", { required: true })}
            />
            {errors.startTime && errors.startTime.type === "required" && (
              <Text mt="8px" color="red">
                This field is required!
              </Text>
            )}
          </FormLabel>
          <FormLabel mb="20px" fontSize="20px" color="#2F855A">
            End time:
            <Input
              mt="10px"
              color="black"
              backgroundColor="white"
              focusBorderColor="#38A169"
              type="datetime-local"
              {...register("endTime", { required: true })}
            />
            {errors.endTime && errors.endTime.type === "required" && (
              <Text mt="8px" color="red">
                This field is required!
              </Text>
            )}
          </FormLabel>

          <FormLabel mb="20px" fontSize="20px" color="#2F855A">
            Catgeories:
            <Flex mt="10px">
              {categories.map(({ name, id }) => (
                <FormLabel color="#2F855A" fontSize="17px" key={id}>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                  <Checkbox
                    ml="10px"
                    mt="5px"
                    backgroundColor="white"
                    colorScheme="whatsapp"
                    type="checkbox"
                    id={id}
                    value={id}
                    {...register("categoryIds", {})}
                  />
                </FormLabel>
              ))}
            </Flex>
          </FormLabel>
          <FormLabel mb="20px" fontSize="20px" color="#2F855A">
            Attended by:
            <Flex mt="10px">
              {users.map(({ name, id }) => (
                <FormLabel color="#2F855A" fontSize="17px" key={id}>
                  {name}
                  <Checkbox
                    ml="10px"
                    mt="5px"
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
          <FormLabel mb="20px" fontSize="20px" color="#2F855A">
            Created by:
            <Select
              mt="10px"
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
              mb="20px"
              width={{ lg: "150px" }}
            >
              Adding event...
            </Button>
          ) : (
            <Button
              type="submit"
              color="white"
              background="#38A169"
              mb="20px"
              width={{ lg: "150px" }}
            >
              Add event
            </Button>
          )}
        </form>
      </Center>
    </>
  );
};
