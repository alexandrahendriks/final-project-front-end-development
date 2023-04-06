// @ts-nocheck
import { Heading } from "@chakra-ui/react";
import React from "react";
import PropTypes from "prop-types";
export const Title = ({ title }) => {
  return (
    <Heading
      color="#2F855A"
      fontSize={{ base: "25px", md: "30px", xl: "40px" }}
      fontFamily={("Times new roman", "serif")}
      mb={{ base: "10px", md: "15px", xl: "25px" }}
    >
      {title}
    </Heading>
  );
};

//Prop validation
Title.propTypes = {
  title: PropTypes.string,
};
