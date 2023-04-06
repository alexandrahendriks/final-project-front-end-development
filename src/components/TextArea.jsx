// @ts-nocheck
import { Textarea, FormLabel } from "@chakra-ui/react";
import React from "react";
import PropTypes from "prop-types";

export const TextArea = ({ title, value, name, onChange }) => {
  return (
    <FormLabel mb="20px" fontSize="20px" color="#2F855A">
      {title}
      <Textarea
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

//Prop validation

TextArea.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  title: PropTypes.string,
  onChange: PropTypes.func,
};
