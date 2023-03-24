import {
  Button,
  useToast,
  Input,
  FormLabel,
  Checkbox,
  Select,
  Textarea,
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
        startTime: data.startTime,
        endTime: data.endTime,
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLabel>
          Title of the event:
          <Input
            type="text"
            placeholder="Title"
            {...register("title", { required: true, min: 3 })}
          />
        </FormLabel>
        <FormLabel>
          Description of the event:
          <Textarea
            //placeholder="Description"
            {...register("description", {
              required: true,
              min: 20,
              maxLength: 400,
            })}
          />
        </FormLabel>
        <FormLabel>
          Image of the event in URL form:
          <Input
            type="url"
            placeholder="Image URL"
            {...register("image", {})}
          />
        </FormLabel>
        <FormLabel>
          Location of the event:
          <Input
            type="text"
            placeholder="Location"
            {...register("location", { required: true })}
          />
        </FormLabel>
        <FormLabel>
          Start time:
          <Input
            type="datetime-local"
            placeholder="Start Time"
            {...register("startTime", { required: true })}
          />
        </FormLabel>
        <FormLabel>
          End time:
          <Input
            type="datetime-local"
            placeholder="End Time"
            {...register("endTime", { required: true })}
          />
        </FormLabel>

        <FormLabel>
          Catgeories:
          {categories.map(({ name, id }) => (
            <FormLabel key={id}>
              {name.charAt(0).toUpperCase() + name.slice(1)}
              <Checkbox
                type="checkbox"
                id={id}
                value={id}
                {...register("categoryIds", { required: true })}
              />
            </FormLabel>
          ))}
        </FormLabel>
        <FormLabel>
          Attended by:
          {users.map(({ name, id }) => (
            <FormLabel key={id}>
              {name}
              <Checkbox
                type="checkbox"
                id={id}
                value={id}
                {...register("attendedBy", {})}
              />
            </FormLabel>
          ))}
        </FormLabel>
        <FormLabel>Created by:</FormLabel>
        <Select {...register("createdBy")}>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </Select>
        {isPending ? (
          <Button disabled>Adding event...</Button>
        ) : (
          <Button
            type="submit"
            onClick={() =>
              toast({
                title: "Event added",
                description: "we have successfully created the event for you!",
                status: "success",
                duration: 9000,
                isClosable: true,
              })
            }
          >
            Add event
          </Button>
        )}
      </form>
    </>
  );
};
