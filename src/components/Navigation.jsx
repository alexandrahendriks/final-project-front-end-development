import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <Breadcrumb
      display="flex"
      flexDirection="row-reverse"
      mr={{ base: "15px", md: "30px" }}
      spacing="8px"
    >
      <BreadcrumbItem
        mt="20px"
        fontSize={{ base: "18px", md: "25px" }}
        color="#2F855A"
        fontWeight="bold"
      >
        <BreadcrumbLink as={Link} reloadDocument to="/">
          Events
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem
        mt="20px"
        fontSize={{ base: "18px", md: "25px" }}
        color="#2F855A"
        fontWeight="bold"
      >
        <BreadcrumbLink as={Link} reloadDocument to="/addevents">
          Add event
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};
