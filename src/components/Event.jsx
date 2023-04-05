// @ts-nocheck
import React from "react";
import PropTypes from "prop-types";
import { Center, Flex, Heading, Image, Text, Badge } from "@chakra-ui/react";

export const Event = ({ event, category, users }) => {
  const userId = users.find((id) => {
    return id.id === event.createdBy;
  });

  return (
    <>
      <Center display={"flex"} flexDir={{ base: "column" }}>
        <Heading
          textAlign="center"
          mb={{ base: "50px" }}
          mt={{ base: "50px" }}
          color="#2F855A"
          fontSize={{ base: "40px", md: "50px", xl: "60px" }}
          fontFamily={("Times new roman", "serif")}
        >
          {event.title}
        </Heading>

        <Flex display={"flex"} flexDir={{ base: "column" }}>
          <Image
            src={event.image}
            alt={event.title}
            width={{ base: "350px" }}
            height="auto"
            border="1px"
            borderColor="#38A169"
          />
          <Flex
            flexDir={{ base: "column" }}
            ml={{ base: "10px" }}
            mt={{ base: "20px" }}
          >
            <Flex flexDir={"column"}>
              <Heading
                color="#2F855A"
                fontSize={{ base: "25px", md: "50px", xl: "60px" }}
                fontFamily={("Times new roman", "serif")}
                mb={{ base: "10px" }}
              >
                Event description:
              </Heading>
              <Text
                color="#2F855A"
                fontSize={{ base: "20px" }}
                mb={{ base: "20px" }}
              >
                {event.description}
              </Text>
            </Flex>
            <hr />
            <Flex
              flexDirection={{ base: "column" }}
              mt={{ base: "20px" }}
              mb={{ base: "20px" }}
              rowGap={2}
            >
              <Text color="#2F855A">
                Start Time: {event.startTime.substring(0, 10)}{" "}
                {event.startTime.substring(11, 16)}
              </Text>
              <Text color="#2F855A">
                End Time: {event.endTime.substring(0, 10)}{" "}
                {event.endTime.substring(11, 16)}
              </Text>
            </Flex>
            <hr />
            <Flex flexDir={"column"} mb={{ base: "10px" }}>
              <Heading
                color="#2F855A"
                fontSize={{ base: "25px", md: "50px", xl: "60px" }}
                fontFamily={("Times new roman", "serif")}
                mb={{ base: "10px" }}
                mt={{ base: "10px" }}
              >
                Category:
              </Heading>
              <Flex columnGap={5}>
                {event.categoryIds.map((id) => {
                  return (
                    <Badge
                      key={id}
                      mb={{ base: "10px" }}
                      p="5px"
                      backgroundColor="#9AE6B4"
                      borderBottomRadius="3px"
                      borderTopRadius="3px"
                      width={{ base: "80px" }}
                      textAlign={"center"}
                      color="#22543D"
                    >
                      {category.find((category) => category.id === id)?.name}
                    </Badge>
                  );
                })}
              </Flex>
            </Flex>
          </Flex>
          <hr />
          <Heading
            color="#2F855A"
            fontSize={{ base: "25px", md: "50px", xl: "60px" }}
            fontFamily={("Times new roman", "serif")}
            mb={{ base: "10px" }}
            mt={{ base: "20px" }}
          >
            Event created by:
          </Heading>
          <Flex flexDir={"column"} alignItems={"center"} mt={{ base: "20px" }}>
            <Image
              src={userId.image}
              alt={userId.name}
              width={150}
              height={150}
              borderRadius={"80px"}
            />
            <Text color="#2F855A" fontSize={{ base: "20px" }}>
              {userId.name}
            </Text>
          </Flex>
        </Flex>
      </Center>
    </>
  );
};

Event.propTypes = {
  events: PropTypes.array,
  category: PropTypes.array,
  title: PropTypes.string,
  id: PropTypes.number,
  event: PropTypes.object,
  users: PropTypes.array,
};

{
  /* <div key={event.id}>
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p>
        Start Time: {event.startTime.substring(0, 10)}{" "}
        {event.startTime.substring(11, 16)}
      </p>
      <p>
        End Time: {event.endTime.substring(0, 10)}{" "}
        {event.endTime.substring(11, 16)}
      </p>
      <p>
        {" "}
        {event.categoryIds
          .map((id) => category.find((category) => category.id === id)?.name)

          .join(", ")}
      </p>
      <img src={event.image} alt="" width={250} height={250} />
    </div> */
}
