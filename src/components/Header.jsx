// @ts-nocheck
import React from "react";
import { Heading } from "@chakra-ui/react";
import PropTypes from "prop-types";

export const Header = ({ title }) => {
  return (
    <Heading
      textAlign="center"
      mb="40px"
      mt="30px"
      color="#2F855A"
      fontSize={{ base: "40px", md: "50px", xl: "60px" }}
      fontFamily={("Times new roman", "serif")}
    >
      {title}
    </Heading>
  );
};

//Prop validation
Header.propTypes = {
  title: PropTypes.string,
};
