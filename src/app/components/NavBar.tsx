"use client";

import { Box, Flex, Link as ChakraLink, Icon, Text, chakra } from "@chakra-ui/react";
import { MusicPlay } from "iconic-react";
import NextLink from "next/link";

const VinylIcon = chakra(MusicPlay)

export default function NavBar() {
  const navItems = [
    { name: "Дашборд", path: "/dashboard", icon: <VinylIcon /> },
    { name: "Вечеринки", path: "/parties" },
    { name: "Одна вечеринка", path: "/party" },
    
  ];

  return (
    <Box 
      as="nav" 
      bg="#f7fafc"
      py={4}
      px={{ base: 4, md: 8 }}
      boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
      position="sticky"
      top={0}
      zIndex={10}
      height="64px"
      display="flex"
      alignItems="center"
    >
      <Flex
        justify="center"
        align="center"
        gap={{ base: 6, md: 12 }}
        maxW="1200px"
        mx="auto"
        width="100%"
      >
        {navItems.map(({ name, path, icon }) => (
          <ChakraLink
            key={path}
            as={NextLink}
            href={path}
            px={4}
            py={3}
            borderRadius="md"
            fontWeight="semibold"
            fontSize={{ base: "200", md: "300" }}
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
            {icon ?
            (
              <Icon as={VinylIcon} boxSize={36} />
            ) :
            (
              name
            )}
          </ChakraLink>
        ))}
      </Flex>
    </Box>
  );
}