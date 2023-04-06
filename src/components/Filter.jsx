// @ts-nocheck
import React, { useState } from "react";
import PropTypes from "prop-types";
import { FormLabel, Flex } from "@chakra-ui/react";
import { Events } from "./Events";
import { SearchBar } from "./SearchBar";
import { FilterButton } from "./FilterButton";

export const Filter = ({ events, category }) => {
  //State for the searchfield
  const [searchField, setSearchField] = useState("");

  // Filter function and event handler for the searchbar and categories filter
  const matchedEvents = events.filter((event) => {
    return (
      event.title.toLowerCase().includes(searchField.toLowerCase()) ||
      event.categoryIds.includes(Number(searchField))
    );
  });

  // Setting value for the input
  const handleChange = (event) => {
    setSearchField(event.target.value);
  };

  return (
    <>
      <Flex
        flexDirection="column"
        wrap="wrap"
        alignItems="center"
        justify="center"
      >
        <SearchBar onChange={handleChange} />
        <FormLabel
          display="flex"
          flexDirection="column"
          alignItems="center"
          mb={{ base: "20px" }}
          rowGap={4}
          color="#2F855A"
          fontSize={{ base: "25px", sm: "30px" }}
          fontFamily="Times new roman"
        >
          Filter on category:
          <Flex display="flex" flexDirection="row" columnGap={5}>
            {category.map(({ name, id }) => (
              <FilterButton
                key={id}
                value={id}
                onClick={handleChange}
                title={name.charAt(0).toUpperCase() + name.slice(1)}
              />
            ))}
            <FilterButton
              onClick={() => setSearchField("")}
              title={"All events"}
            />
          </Flex>
        </FormLabel>

        {searchField ? (
          <Events events={matchedEvents} category={category} />
        ) : (
          <Events events={events} category={category} />
        )}
      </Flex>
    </>
  );
};

//Prop validation
Filter.propTypes = {
  events: PropTypes.array,
  category: PropTypes.array,
};
