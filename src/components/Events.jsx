// @ts-nocheck
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Flex, Heading, Image, Box, Badge, Text } from "@chakra-ui/react";

export const Events = ({ events, category }) => {
  return (
    <Flex
      flexDir={{ base: "column", md: "row" }}
      wrap="wrap"
      basis="50px"
      grow="1"
      shrink="0"
      columnGap={{ base: "1", sm: "3", md: "3", lg: "5" }}
      m="10px"
      justify="center"
    >
      {events.map((event) => {
        return (
          <Flex
            backgroundColor="#EDF2F7"
            flexDirection={{ base: "column" }}
            marginBottom="20px"
            borderTopRadius="10px"
            borderBottomRadius="10px"
            maxWidth="300px"
            flexBasis="300px"
            grow="1"
            shrink="0"
            _hover={{ boxShadow: "0 0 20px rgba(33,33,33,.2)" }}
            transition="box-shadow .3s"
            border="1px"
            borderColor="#38A169"
            key={event.id}
          >
            <Link to={`/event/${event.id}`}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                rowGap={2}
              >
                <Image
                  src={event.image}
                  alt=""
                  width="auto"
                  height={220}
                  borderTopRadius="10px"
                />
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Heading
                    fontSize="25px"
                    fontWeight="semibold"
                    color="#2F855A"
                    textAlign={"center"}
                  >
                    {event.title}
                  </Heading>
                  <Text color="#2F855A">{event.description}</Text>
                  <Box color="#2F855A">
                    Start Time: {event.startTime.substring(0, 10)}{" "}
                    {event.startTime.substring(11, 16)}
                  </Box>
                  <Box color="#2F855A">
                    End Time: {event.endTime.substring(0, 10)}{" "}
                    {event.endTime.substring(11, 16)}
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="row"
                    columnGap="10px"
                    mb="10px"
                    mt="5px"
                  >
                    {event.categoryIds.map((id) => {
                      return (
                        <Badge
                          key={id}
                          mb={{ base: "10px" }}
                          p="5px"
                          backgroundColor="#9AE6B4"
                          borderBottomRadius="3px"
                          borderTopRadius="3px"
                          color="#22543D"
                        >
                          {
                            category.find((category) => category.id === id)
                              ?.name
                          }
                        </Badge>
                      );
                    })}
                  </Box>
                </Box>
              </Box>
            </Link>
          </Flex>
        );
      })}
    </Flex>
  );
};

//Prop validation
Events.propTypes = {
  events: PropTypes.array,
  category: PropTypes.array,
  title: PropTypes.string,
  id: PropTypes.number,
  event: PropTypes.object,
};
