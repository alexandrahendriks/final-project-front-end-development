import React, { useState } from "react";
import PropTypes from "prop-types";
import { TextInput } from "./TextInput";

export const SearchBar = ({ events, category }) => {
  const [searchField, setSearchField] = useState("");

  const matchedEvents = events.filter((event) => {
    return event.title.toLowerCase().includes(searchField.toLowerCase());
  });

  const handleChange = (event) => {
    setSearchField(event.target.value);
  };
  return (
    <>
      <TextInput
        onChange={handleChange}
        events={matchedEvents}
        category={category}
      />
    </>
  );
};

SearchBar.propTypes = {
  events: PropTypes.array,
  category: PropTypes.array,
};
