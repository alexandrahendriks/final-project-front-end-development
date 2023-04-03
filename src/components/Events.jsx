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
            maxWidth={{ base: "300px" }}
            flexBasis="300px"
            grow="1"
            shrink="0"
            _hover={{ boxShadow: "0 0 20px rgba(33,33,33,.2)" }}
            transition={"box-shadow .3s"}
            border="1px"
            borderColor="#38A169"
            key={event.id}
          >
            <Link to={`/event/${event.id}`}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                rowGap={2}
              >
                <Image
                  src={event.image}
                  alt=""
                  width="auto"
                  height={220}
                  borderTopRadius="10px"
                />
                <Heading fontSize={"25px"} fontWeight={"semibold"}>
                  {event.title}
                </Heading>
                <Text>{event.description}</Text>

                <Box>
                  Start Time: {event.startTime.substring(0, 10)}{" "}
                  {event.startTime.substring(11, 16)}
                </Box>
                <Box>
                  End Time: {event.endTime.substring(0, 10)}{" "}
                  {event.endTime.substring(11, 16)}
                </Box>
                <Badge>
                  {" "}
                  {event.categoryIds
                    .map(
                      (id) =>
                        category.find((category) => category.id === id)?.name
                    )

                    .join(", ")}
                </Badge>
              </Box>
            </Link>
          </Flex>
        );
      })}
    </Flex>
  );
};

Events.propTypes = {
  events: PropTypes.array,
  category: PropTypes.array,
  title: PropTypes.string,
  id: PropTypes.number,
  event: PropTypes.object,
};
