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
          mb={{ base: "50px", xl: "80px" }}
          mt={{ base: "50px", md: "70px" }}
          color="#2F855A"
          fontSize={{ base: "40px", md: "50px", xl: "60px" }}
          fontFamily={("Times new roman", "serif")}
        >
          {event.title}
        </Heading>

        <Flex display={"flex"} flexDir={{ base: "column" }}>
          <Flex flexDir={{ base: "column", lg: "row" }} columnGap={50}>
            <Image
              src={event.image}
              alt={event.title}
              width={{ base: "350px", md: "500px", xl: "700px" }}
              height="auto"
              border="1px"
              borderColor="#38A169"
            />
            <Flex
              flexDir={{ base: "column" }}
              ml={{ base: "5px" }}
              mt={{ base: "20px" }}
            >
              <Flex flexDir={"column"}>
                <Heading
                  color="#2F855A"
                  fontSize={{ base: "25px", md: "30px", xl: "40px" }}
                  fontFamily={("Times new roman", "serif")}
                  mb={{ base: "10px", md: "15px", xl: "25px" }}
                >
                  Event description:
                </Heading>
                <Text
                  color="#2F855A"
                  fontSize={{ base: "20px", md: "25px", xl: "30px" }}
                  mb={{ base: "20px", md: "25px" }}
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
                <Text color="#2F855A" fontSize={{ md: "20px", xl: "25px" }}>
                  Start Time: {event.startTime.substring(0, 10)}{" "}
                  {event.startTime.substring(11, 16)}
                </Text>
                <Text color="#2F855A" fontSize={{ md: "20px", xl: "25px" }}>
                  End Time: {event.endTime.substring(0, 10)}{" "}
                  {event.endTime.substring(11, 16)}
                </Text>
              </Flex>
              <hr />
              <Flex flexDir={"column"} mb={{ base: "10px" }}>
                <Heading
                  color="#2F855A"
                  fontSize={{ base: "25px", md: "30px", xl: "40px" }}
                  fontFamily={("Times new roman", "serif")}
                  mb={{ base: "10px", md: "20px", xl: "30px" }}
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
                        width={{ base: "80px", md: "100px", xl: "120px" }}
                        height={{ base: "auto" }}
                        textAlign={"center"}
                        color="#22543D"
                        fontSize={{ xl: "20px" }}
                      >
                        {category.find((category) => category.id === id)?.name}
                      </Badge>
                    );
                  })}
                </Flex>
              </Flex>
            </Flex>
            <hr />
          </Flex>
          <Heading
            color="#2F855A"
            fontSize={{ base: "25px", md: "30px", xl: "40px" }}
            fontFamily={("Times new roman", "serif")}
            mb={{ base: "10px" }}
            mt={{ base: "20px", xl: "35px" }}
          >
            Event created by:
          </Heading>
          <Flex flexDir={"column"} alignItems={"center"} mt={{ base: "20px" }}>
            <Image
              src={userId.image}
              alt={userId.name}
              width={{ base: 150, md: 200, xl: 300 }}
              height={{ base: 150, md: 200, xl: 300 }}
              borderRadius={{ base: "80px", md: "100px", xl: "150px" }}
            />
            <Text
              color="#2F855A"
              fontSize={{ base: "20px", md: "30px", xl: "40px" }}
            >
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
