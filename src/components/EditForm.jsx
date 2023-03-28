import {
  FormLabel,
  Input,
  Button,
  Select,
  Textarea,
  Checkbox,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const EditForm = ({ event, category, users }) => {
  const [isPending, setIsPending] = useState(false);
  const { register, handleSubmit } = useForm();
  const history = useNavigate();

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

  return (
    <form>
      <FormLabel>
        Title of the event:
        <Input
          type="text"
          placeholder={event.title}
          contentEditable={true}
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
        <Input type="url" placeholder="Image URL" {...register("image", {})} />
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
        {category.map(({ name, id }) => (
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
    </form>
  );
};
