"use client";

import { Box, Flex, Avatar, Text } from "@chakra-ui/react";

interface UserCardProps {
  id: number;
  name: string;
  avatar: string;
}

export default function UserCard({ id, name, avatar }: UserCardProps) {
  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      bg="white"
      _dark={{ bg: "gray.700" }}
      transition="all 0.3s"
      _hover={{
        transform: "translateY(-5px)",
        boxShadow: "xl",
        cursor: "pointer",
      }}
      w={{ base: "100%", sm: "70%" }}
    >
      <Flex align="center">
        <Avatar size="md" src={avatar} name={name} mr={6} />
        <Text fontSize="20" fontWeight="bold" color={"black"}>
          {name}
        </Text>
      </Flex>
    </Box>
  );
}