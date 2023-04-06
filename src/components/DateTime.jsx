// @ts-nocheck
import React from "react";
import PropTypes from "prop-types";
import { FormLabel, Input } from "@chakra-ui/react";

export const DateTime = ({ title, name, value, onChange }) => {
  return (
    <FormLabel mb="20px" fontSize="20px" color="#2F855A">
      {title}
      <Input
        type="datetime-local"
        name={name}
        value={value}
        onChange={onChange}
        mt="10px"
        backgroundColor="white"
        focusBorderColor="#38A169"
        required
      />
    </FormLabel>
  );
};

//Prop validation

DateTime.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  title: PropTypes.string,
  onChange: PropTypes.func,
};
