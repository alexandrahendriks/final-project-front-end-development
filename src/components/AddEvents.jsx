import {
  Button,
  useToast,
  Input,
  FormLabel,
  Checkbox,
  Select,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";

/* export const action = async ({ request }) => {
  const formData = await request.formData();
  const submission = {
    createdBy: Number(formData.get("createdBy")),
    title: formData.get("title"),
    description: formData.get("description"),
    image: formData.get("image"),
    categoryIds: [Number(formData.get("categoryIds"))],
    attendedBy: [Number(formData.get("attendedBy"))],
    location: formData.get("location"),
    startTime: formData.get("startTime"),
    endTime: formData.get("endTime"),
  };
  const newId = await fetch("http://localhost:3000/events", {
    method: "POST",
    body: JSON.stringify(submission),
    headers: { "Content-type": "application/json" },
  })
    .then((res) => res.json())
    .then((json) => json.id);
  return redirect(`event/${newId}`);
}; */

export const loader = async () => {
  const userResponse = await fetch("http://localhost:3000/users");
  const users = await userResponse.json();
  const categoriesResponse = await fetch("http://localhost:3000/categories");
  const categories = await categoriesResponse.json();
  return [users, categories];
};

/*export const AddEvents = () => {
  //Loader data from the back-end (users and categories)
  const [users, categories] = useLoaderData();

  // Toast function to display the success message after POST request
  const toast = useToast();

  const handleChange = (e) => {
    setCategoriesArray([]);
    const value = e.target.value;
    const checked = e.target.checked;
    console.log(value, checked);
    if (checked) {
      setCategoriesArray([...categoriesArray, value]);
    } else {
      setCategoriesArray(categoriesArray.filter((e) => e !== value));
    }
  };


}; */

export const AddEvents = () => {
  //Loader data from the back-end (users and categories)
  const [users, categories] = useLoaderData();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //const onSubmit = (data) => console.log(data);
  const onSubmit = (data) => {
    fetch("http://localhost:3000/events", {
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
  };
  console.log(errors);

  const toast = useToast();

  return (
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
    </form>
  );
};
