// @ts-nocheck
import React, { useState } from "react";
import PropTypes from "prop-types";
import { FormLabel, Input, Button, Flex } from "@chakra-ui/react";
import { Events } from "./Events";

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
        <Input
          backgroundColor="white"
          focusBorderColor="#38A169"
          display="flex"
          alignItems="center"
          justifyContent="center"
          p="10px"
          mb={{ base: "30px", md: "35px" }}
          ml="5px"
          width={{ base: "300px", sm: "350px", md: "400px" }}
          type="text"
          placeholder="Search here for events"
          onChange={handleChange}
        />

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
              <Button
                key={id}
                value={id}
                onClick={handleChange}
                color="white"
                background="#38A169"
                _hover={{ background: "#38A169" }}
              >
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Button>
            ))}
          </Flex>
        </FormLabel>

        <Events events={matchedEvents} category={category} />
      </Flex>
    </>
  );
};

//Prop validation
Filter.propTypes = {
  events: PropTypes.array,
  category: PropTypes.array,
};
