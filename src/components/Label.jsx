// @ts-nocheck
import React from "react";
import PropTypes from "prop-types";
import { FormLabel, Input } from "@chakra-ui/react";

export const Label = ({ title, name, value, onChange }) => {
  return (
    <FormLabel mb="20px" fontSize="20px" color="#2F855A">
      {title}
      <Input
        name={name}
        value={value}
        onChange={onChange}
        mt="10px"
        backgroundColor="white"
        focusBorderColor="#38A169"
      />
    </FormLabel>
  );
};

Label.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
