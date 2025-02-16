'use client'
import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import { LoginForm } from "./LoginForm";

const COLORS = {
  primary: "#60807f",
  background: "#F3F3F3"
};

export default function Login() {
  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
      bg={COLORS.background}
    >
      <Stack
        spacing={8}
        mx="auto"
        maxW="md"
        w="full"
        px={4}
      >
        <Heading 
          textAlign="center" 
          color={COLORS.primary}
          fontSize="2xl"
        >
          Авторизация
        </Heading>        
        <LoginForm />
      </Stack>
    </Flex>
  )
}