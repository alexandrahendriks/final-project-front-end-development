import React, { useState } from "react";
import PropTypes from "prop-types";
import { FormLabel, Input, Button } from "@chakra-ui/react";
import { Events } from "./Events";

export const Filter = ({ events, category }) => {
  const [searchField, setSearchField] = useState("");

  // Filter function and event handler for the searchbar and categories filter
  const matchedEvents = events.filter((event) => {
    return (
      event.title.toLowerCase().includes(searchField.toLowerCase()) ||
      event.categoryIds.includes(Number(searchField))
    );
  });

  const handleChange = (event) => {
    setSearchField(event.target.value);
  };

  return (
    <>
      <Input
        backgroundColor="white"
        mb={{ base: "30px", md: "40px" }}
        ml="5px"
        width={{ base: "300px", md: "400px" }}
        type="text"
        placeholder="Search here for recipe"
        onChange={handleChange}
      />
      <FormLabel>
        Filter on category:
        {category.map(({ name, id }) => (
          <Button key={id} value={id} onClick={handleChange}>
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Button>
        ))}
      </FormLabel>
      <Events events={matchedEvents} category={category} />
    </>
  );
};

Filter.propTypes = {
  events: PropTypes.array,
  category: PropTypes.array,
};
