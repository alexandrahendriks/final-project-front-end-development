import {
  FormLabel,
  Input,
  Button,
  Select,
  Textarea,
  Checkbox,
  useToast,
  Divider,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const EditForm = ({ event, category, users, onClose }) => {
  const [userEvent, setUserEvent] = useState(event);
  const [isPending, setIsPending] = useState(false);

  const toast = useToast();
  const history = useNavigate();

  //console.log(event);

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  console.log(userEvent.categoryIds);
  return (
    <form onSubmit={() => onSubmit}>
      <FormLabel>
        Title of the event:
        <Input
          type="text"
          value={userEvent.title}
          onChange={(e) => {
            setUserEvent({ ...userEvent, title: e.target.value });
          }}
        />
      </FormLabel>
      <FormLabel>
        Description of the event:
        <Textarea
          value={userEvent.description}
          onChange={(e) => {
            setUserEvent({ ...userEvent, description: e.target.value });
          }}
        />
      </FormLabel>
      <FormLabel>
        Image of the event in URL form:
        <Input
          type="url"
          value={userEvent.image}
          onChange={(e) => {
            setUserEvent({ ...userEvent, image: e.target.value });
          }}
        />
      </FormLabel>
      <FormLabel>
        Location of the event:
        <Input
          type="text"
          placeholder="Location"
          value={userEvent.location}
          onChange={(e) => {
            setUserEvent({ ...userEvent, location: e.target.value });
          }}
        />
      </FormLabel>
      <FormLabel>
        Start time:
        <Input
          type="datetime-local"
          value={new Date(userEvent.startTime).toISOString().slice(0, 16)}
          onChange={(e) => {
            setUserEvent({
              ...userEvent,
              startTime: e.target.value + ":00.000Z",
            });
          }}
        />
      </FormLabel>
      <FormLabel>
        End time:
        <Input
          type="datetime-local"
          value={new Date(userEvent.endTime).toISOString().slice(0, 16)}
          onChange={(e) => {
            setUserEvent({
              ...userEvent,
              endTime: e.target.value,
            });
          }}
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
              defaultChecked={userEvent.categoryIds.includes(id)}
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
