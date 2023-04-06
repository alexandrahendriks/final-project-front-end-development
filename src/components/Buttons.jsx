// @ts-nocheck
import { Button } from "@chakra-ui/react";
import React from "react";
import PropTypes from "prop-types";

export const Buttons = ({ title, onClick }) => {
  return (
    <Button
      color="white"
      background="#38A169"
      mb="20px"
      width={{ base: "350px", xl: "400px" }}
      fontSize={{ xl: "25px" }}
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

//Prop validation
Buttons.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
};
