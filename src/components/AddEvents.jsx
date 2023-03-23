import React, { useState } from "react";
import { redirect, useLoaderData } from "react-router-dom";
import { Form } from "react-router-dom";

export const action = async ({ request }) => {
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
};

export const loader = async () => {
  const userResponse = await fetch("http://localhost:3000/users");
  const users = await userResponse.json();
  const categoriesResponse = await fetch("http://localhost:3000/categories");
  const categories = await categoriesResponse.json();
  return [users, categories];
};

export const AddEvents = () => {
  const [users, categories] = useLoaderData();
  const [categoriesArray, setCategoriesArray] = useState([]);

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

  console.log(categoriesArray);

  return (
    <>
      <div className="form">
        <Form method="post" id="new-event-form">
          <label>
            <span>Title of the event:</span>
            <input type="text" name="title" />
          </label>

          <label>
            <span>Event description:</span>
            <textarea rows={6} maxLength={400} name="description" />
          </label>
          <fieldset>
            <label>
              <span>Catgeories:</span>
              {categories.map(({ name, id }) => (
                <label key={id}>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                  <input
                    type="checkbox"
                    id={id}
                    value={id}
                    name="categoryIds"
                    onChange={handleChange}
                  />
                </label>
              ))}
            </label>
          </fieldset>
          <label>
            <span>Upload image URL:</span>
            <input type="url" name="image" />
          </label>

          <label>
            <span>Attended by</span>
            <select name="attendedBy">
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Location:</span>
            <input type="text" name="location" />
          </label>

          <label>
            <span>Start time:</span>
            <input type="datetime-local" name="startTime" />
            <span>End time:</span>
            <input type="datetime-local" name="endTime" />
          </label>
          <label>
            <span>Created by:</span>
            <select name="createdBy">
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          <button>Add event!</button>
        </Form>
      </div>
    </>
  );
};
