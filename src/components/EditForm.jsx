// @ts-nocheck
import {
  FormLabel,
  Input,
  Button,
  Textarea,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";

/* export const action = async ({ params, request }) => {
  const formData = Object.fromEntries(await request.formData());
  const newId = await fetch(`http://localhost:3000/events/${params.eventId}`, {
    method: "PUT",
    body: 
  })
};
 */
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
  const [event, categories, users] = useLoaderData();
  const [userEvent, setUserEvent] = useState(event);
  const [isPending, setIsPending] = useState(false);
  const toast = useToast();
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    console.log(userEvent);
    const response = await fetch(
      `http://localhost:3000/evens/` + userEvent.id,
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
    <form onSubmit={handleSubmit}>
      <FormLabel>
        Title of the event:
        <Input name="title" value={userEvent.title} onChange={handleChange} />
      </FormLabel>
      <FormLabel>
        Description of the event:
        <Textarea
          name="description"
          value={userEvent.description}
          onChange={handleChange}
        />
      </FormLabel>
      <FormLabel>
        Image of the event in URL form:
        <Input
          type="url"
          name="image"
          value={userEvent.image}
          onChange={handleChange}
        />
      </FormLabel>
      <FormLabel>
        Location of the event:
        <Input
          name="location"
          value={userEvent.location}
          onChange={handleChange}
        />
      </FormLabel>
      <FormLabel>
        Start time:
        <Input
          type="datetime-local"
          name="startTime"
          value={new Date(userEvent.startTime).toISOString().slice(0, 16)}
          onChange={handleChange}
        />
      </FormLabel>
      <FormLabel>
        End time:
        <Input
          name="endTime"
          type="datetime-local"
          defaultValue={new Date(userEvent.endTime).toISOString().slice(0, 16)}
          onChange={handleChange}
        />
      </FormLabel>

      <FormLabel>
        Catgeories:
        {categories.map(({ name, id }) => (
          <FormLabel key={id}>
            {name.charAt(0).toUpperCase() + name.slice(1)}
            <Checkbox
              type="checkbox"
              name={name}
              value={id}
              defaultChecked={event.categoryIds.includes(id)}
              onChange={handleClick}
            />
          </FormLabel>
        ))}
      </FormLabel>
      {isPending ? (
        <Button disabled>Saving event...</Button>
      ) : (
        <Button type="submit">Save</Button>
      )}

      <Link to={`/event/${event.id}`}>
        <Button>Back</Button>
      </Link>
    </form>
  );
};
