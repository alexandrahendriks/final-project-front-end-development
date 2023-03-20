import React from "react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Events</Link>
        </li>
        <li>
          <Link to="/event/1">Event</Link>
        </li>
        <li>
          <Link to="/addevents">Add event</Link>
        </li>
      </ul>
    </nav>
  );
};
