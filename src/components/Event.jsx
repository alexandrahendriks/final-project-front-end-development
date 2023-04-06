// @ts-nocheck
import React from "react";
import PropTypes from "prop-types";
import { Center, Flex, Image, Text, Badge } from "@chakra-ui/react";
import { Header } from "./Header";
import { Title } from "./Title";

export const Event = ({ event, category, users }) => {
  //Match user with createdBy
  const userId = users.find((id) => {
    return id.id === event.createdBy;
  });

  return (
    <>
      <Center display="flex" flexDir="column">
        <Header title={event.title} />

        <Flex display="flex" flexDir="column">
          <Flex
            flexDir={{ base: "column", lg: "row" }}
            columnGap={50}
            mt={{ base: "50px", md: "60px" }}
            mb="20px"
          >
            <Image
              src={event.image}
              alt={event.title}
              width={{ base: "350px", md: "500px", xl: "700px" }}
              height="auto"
              border="1px"
              borderColor="#38A169"
            />
            <Flex flexDir="column" ml="5px" mt="20px">
              <Flex flexDir="column">
                <Title title={"Event description:"} />
                <Text
                  color="#2F855A"
                  fontSize={{ base: "20px", md: "25px", xl: "30px" }}
                  mb={{ base: "20px", md: "25px" }}
                >
                  {event.description}
                </Text>
              </Flex>
              <hr />
              <Flex flexDirection="column" mt="20px" mb="20px" rowGap={2}>
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
              <Flex flexDir="column" mb="10px" mt="20px">
                <Title title={"Category"} />
                <Flex columnGap={5}>
                  {event.categoryIds.map((id) => {
                    return (
                      <Badge
                        key={id}
                        mb="10px"
                        p="5px"
                        backgroundColor="#9AE6B4"
                        borderBottomRadius="3px"
                        borderTopRadius="3px"
                        width={{ base: "80px", md: "100px", xl: "120px" }}
                        height="auto"
                        textAlign="center"
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
          <Title title={"Event created by:"} />
          <Flex flexDir="column" alignItems="center" mt="20px">
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

//Prop validation
Event.propTypes = {
  events: PropTypes.array,
  category: PropTypes.array,
  title: PropTypes.string,
  id: PropTypes.number,
  event: PropTypes.object,
  users: PropTypes.array,
};
