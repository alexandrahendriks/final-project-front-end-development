import {
  FormLabel,
  Input,
  Button,
  Textarea,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const EditForm = ({ event, category, users, onClose }) => {
  const [userEvent, setUserEvent] = useState({
    id: event.id,
    createdBy: event.createdBy,
    title: event.title,
    description: event.description,
    image: event.image,
    categoryIds: event.categoryIds,
    attendedBy: event.attendedBy,
    location: event.location,
    startTime: event.startTime,
    endTime: event.endTime,
  });
  const [isPending, setIsPending] = useState(false);
  const toast = useToast();
  const history = useNavigate();
  const onSubmit = (data) => {
    console.log(data);
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
  console.log(userEvent);
  //Handlechange function for the input fields
  const handleChange = (e) => {
    setUserEvent({ ...userEvent, [e.target.name]: e.target.value });
    console.log(userEvent);
  };

  return (
    <form onSubmit={() => onSubmit}>
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
        {category.map(({ name, id }) => (
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

      <Button
        type="submit"
        onClick={() =>
          toast({
            title: "Event added",
            description: "We have successfully updated the event for you!",
            status: "success",
            duration: 9000,
            isClosable: true,
          })
        }
      >
        Save
      </Button>
      <Button onClick={onClose}>Close</Button>
    </form>
  );
};
