'use client'
import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import { RegisterForm } from "./RegisterForm";

const COLORS = {
  primary: "#60807f",
  background: "#F3F3F3"
};

export default function Login() {
  return (
    <Flex
      w="100%"
      align="center"
      justify="center"
      bg={COLORS.background}
      minHeight={"calc(100vh - 64px)"}
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
          Регистрация
        </Heading>        
        <RegisterForm />
      </Stack>
    </Flex>
  )
}