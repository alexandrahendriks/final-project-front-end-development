// @ts-nocheck
import React from "react";
import PropTypes from "prop-types";
import { Button } from "@chakra-ui/react";

export const FilterButton = ({ key, value, onClick, title }) => {
  return (
    <Button
      key={key}
      value={value}
      onClick={onClick}
      color="white"
      background="#38A169"
      _hover={{ background: "#38A169" }}
    >
      {title}
    </Button>
  );
};

//Prop validation

FilterButton.propTypes = {
  key: PropTypes.number,
  value: PropTypes.number,
  onClick: PropTypes.number,
  title: PropTypes.string,
};
