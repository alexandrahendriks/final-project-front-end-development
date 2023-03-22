import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const Events = ({ events, category, title }) => {
  return (
    <div>
      <h1>{title}</h1>
      {events.map((event) => {
        return (
          <div key={event.id}>
            <Link to={`/event/${event.id}`}>
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
                  .map(
                    (id) =>
                      category.find((category) => category.id === id)?.name
                  )

                  .join(", ")}
              </p>
              <img src={event.image} alt="" width={250} height={250} />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

Events.propTypes = {
  events: PropTypes.array,
  category: PropTypes.array,
  title: PropTypes.string,
  id: PropTypes.number,
  event: PropTypes.object,
};
