"use client";

import { Box, Flex, Link as ChakraLink, Icon, Text, chakra, Stack } from "@chakra-ui/react";
import { MusicPlay } from "iconic-react";
import NextLink from "next/link";
import { useSession } from "../hooks/use-session";
import NavBarItems from "./NavBarItems";

const VinylIcon = chakra(MusicPlay);

export default function NavBar() {
  const { data: session } = useSession()
  console.log(session.user)
  const privateNavItems = [
    { name: "Вечеринки", path: "/parties" },
  ];

  const publicNavItems = [
    { name: "Войти", path: "/login" },
    { name: "Регистрация", path: "/register" }
  ];

  return (
    <Box 
      as="nav" 
      bg="#F3F3F3"
      px={{ base: 8, md: 16 }}
      boxShadow="0px 4px 12px rgba(0, 0, 0, 0.2)"
      position="fixed"
      top={0}
      left={0}
      width={"100%"}
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
          href="/"
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
          {!session.user
            ? <NavBarItems navItems={publicNavItems} /> 
            : <NavBarItems navItems={privateNavItems} />
          }
        </Flex>        
      </Flex>
    </Box>
  );
}