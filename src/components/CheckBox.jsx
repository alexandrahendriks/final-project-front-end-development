// @ts-nocheck
import React from "react";
import PropTypes from "prop-types";
import { FormLabel, Flex, Checkbox } from "@chakra-ui/react";

export const CheckBox = ({ categories, onChange, event, title }) => {
  return (
    <FormLabel mb="20px" fontSize="20px" color="#2F855A">
      {title}
      <Flex mt="10px">
        {categories.map(({ name, id }) => (
          <FormLabel key={id} color="#2F855A" fontSize="17px">
            {name.charAt(0).toUpperCase() + name.slice(1)}
            <Checkbox
              ml="10px"
              mt="5px"
              backgroundColor="white"
              colorScheme="whatsapp"
              type="checkbox"
              name={name}
              value={id}
              defaultChecked={event.categoryIds.includes(id)}
              onChange={onChange}
            />
          </FormLabel>
        ))}
      </Flex>
    </FormLabel>
  );
};

//Prop validation

CheckBox.propTypes = {
  categories: PropTypes.array,
  event: PropTypes.object,
  title: PropTypes.string,
  onChange: PropTypes.func,
};
