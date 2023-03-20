import React from "react";

export const Events = ({ events, category, title }) => {
  return (
    <div>
      <h1>{title}</h1>
      {events.map((event) => (
        <div key={event.id}>
          <h2>{event.title}</h2>
          <p>{event.description}</p>
          <p>Start Time: {event.startTime}</p>
          <p>End Time: {event.endTime}</p>
          <p>
            {" "}
            {event.categoryIds
              .map(
                (id) => category.find((category) => category.id === id)?.name
              )
              .join(", ")}
          </p>
          <img src={event.image} alt="" width={250} height={250} />
        </div>
      ))}
    </div>
  );
};
