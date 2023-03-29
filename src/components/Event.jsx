import React from "react";
import PropTypes from "prop-types";

export const Event = ({ event, category, users }) => {
  const userId = users.find((id) => {
    return id.id === event.createdBy;
  });

  //console.log(userId);
  //console.log(event.createdBy);
  // console.log(users);
  return (
    <>
      <div>
        <h1>{event.title}</h1>
        <img src={event.image} alt={event.title} width="300px" height="250px" />
        <h2>Event description:</h2>
        <p>{event.description}</p>
        <div>
          <p>
            Start Time: {event.startTime.substring(0, 10)}{" "}
            {event.startTime.substring(11, 16)}
          </p>
          <p>
            End Time: {event.endTime.substring(0, 10)}{" "}
            {event.endTime.substring(11, 16)}
          </p>
        </div>
        <h2>Category:</h2>
        <p>
          {" "}
          {event.categoryIds
            .map((id) => category.find((category) => category.id === id)?.name)
            .join(", ")}
        </p>
        <h2>Created by:</h2>
        <p>{userId.name}</p>
        <img src={userId.image} alt={userId.name} width={350} height={350} />
      </div>
    </>
  );
};

Event.propTypes = {
  events: PropTypes.array,
  category: PropTypes.array,
  title: PropTypes.string,
  id: PropTypes.number,
  event: PropTypes.object,
};

{
  /* <div key={event.id}>
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p>
        Start Time: {event.startTime.substring(0, 10)}{" "}
        {event.startTime.substring(11, 16)}
      </p>
      <p>
        End Time: {event.endTime.substring(0, 10)}{" "}
        {event.endTime.substring(11, 16)}
      </p>
      <p>
        {" "}
        {event.categoryIds
          .map((id) => category.find((category) => category.id === id)?.name)

          .join(", ")}
      </p>
      <img src={event.image} alt="" width={250} height={250} />
    </div> */
}
