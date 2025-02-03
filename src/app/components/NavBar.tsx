"use client";

import { Box, Flex, Link as ChakraLink, Icon, Text, chakra, Stack, Button } from "@chakra-ui/react";
import { MusicPlay } from "iconic-react";
import NextLink from "next/link";
import { logout } from "../login/actions";

const VinylIcon = chakra(MusicPlay);

export default function NavBar() {
  const navItems = [
    { name: "Вечеринки", path: "/parties" },
    { name: "Одна вечеринка", path: "/party" },
  ];

  return (
    <Box 
      as="nav" 
      bg="#F3F3F3"
      py={4}
      px={{ base: 8, md: 16 }}
      boxShadow="0px 4px 12px rgba(0, 0, 0, 0.2)"
      position="sticky"
      top={0}
      zIndex={10}
      height="64px"
      display="flex"
      alignItems="center"
    >
      <Flex
        justify="space-between"
        align="center"
        maxW="1200px"
        mx="auto"
        width="100%"
      >
        <ChakraLink
          as={NextLink}
          href="/dashboard"
          fontSize="32"
          fontWeight="bold"
          _hover={{ textDecoration: "none" }}
        >
          <Stack direction={"row"}>
            <Icon as={VinylIcon} alignSelf={"center"} boxSize={42} color={"#60807f"} />
            <Text color={"#60807f"}>Vinyl Party</Text>
          </Stack>
        </ChakraLink>

        <Flex
          gap={{ base: 6, md: 12 }}
          align="center"
        >
          {navItems.map(({ name, path }) => (
            <ChakraLink
              key={path}
              as={NextLink}
              href={path}
              px={24}
              py={2}
              borderRadius="md"
              fontWeight="semibold"
              fontSize={{ base: "xl", md: "2xl" }}
              color="gray.700"
              position="relative"
              transition="all 0.3s ease"
              _hover={{
                textDecoration: "none",
                color: "purple.600",
                _after: {
                  transform: "scaleX(1)",
                },
              }}
              _after={{
                content: '""',
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "2px",
                bg: "purple.600",
                transform: "scaleX(0)",
                transition: "transform 0.3s ease",
              }}
            >
              {name}
            </ChakraLink>
          ))}

        </Flex>        
      </Flex>
    </Box>
  );
}