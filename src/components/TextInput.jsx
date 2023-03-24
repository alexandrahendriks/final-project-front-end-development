import { Input } from "@chakra-ui/react";
import React from "react";
import { Events } from "./Events";
import PropTypes from "prop-types";

export const TextInput = ({ events, category, ...props }) => {
  return (
    <>
      <Input
        backgroundColor="white"
        mb={{ base: "30px", md: "40px" }}
        ml="5px"
        width={{ base: "300px", md: "400px" }}
        type="text"
        placeholder="Search here for recipe"
        {...props}
      />
      <Events events={events} category={category} />
    </>
  );
};

TextInput.propTypes = {
  events: PropTypes.array,
  category: PropTypes.array,
};
