import React from "react";
import { redirect, useLoaderData } from "react-router-dom";
import { Form } from "react-router-dom";
import PropTypes from "prop-types";

export const action = async ({ request }) => {
  const formData = Object.fromEntries(await request.formData());
  const newId = await fetch("http://localhost:3000/events", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-type": "application/json" },
  })
    .then((res) => res.json())
    .then((json) => json.id);
  return redirect(`event/${newId}`);
};

export const loader = async () => {
  const users = await fetch("http://localhost:3000/users");
  const categories = await fetch("http://localhost:3000/categories");

  return users, categories;
};

export const AddEvents = () => {
  const { users, categories } = useLoaderData();

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

          <label>
            <span>Catgeories</span>
            {categories.map((categorie) => (
              <label key={categorie.id}>
                {categorie.name.charAt(0).toUpperCase() +
                  categorie.name.slice(1)}
                <input
                  type="checkbox"
                  value={categorie.id}
                  name={categorie.name}
                />
              </label>
            ))}
          </label>

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
            {users.map((user) => (
              <select name="createdBy" key={user.id}>
                <option value={user.is}>{user.name}</option>
              </select>
            ))}
          </label>
          <button>Add event!</button>
        </Form>
      </div>
    </>
  );
};

AddEvents.propTypes = {
  users: PropTypes.array,
};
