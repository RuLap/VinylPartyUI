'use client'
import { Box, Button, chakra, Flex, FormControl, FormHelperText, Heading, Input, InputGroup, InputLeftElement, InputRightElement, Link, Stack } from "@chakra-ui/react";
import { LoginForm } from "./LoginForm";
import { Eye, EyeSlash, Lock, User } from 'iconic-react';
import React, { FormEventHandler, useState } from "react";

const IconUser = chakra(User);
const IconLock = chakra(Lock);
const IconEye = chakra(Eye);
const IconEyeSlash = chakra(EyeSlash);

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {}

  return (
    <Flex
      w={"100%"}
      align={"center"}
      alignContent={"center"}
      justifyContent={"center"}
      color={"#FFFFFF"}
      bgColor={"#221B12"}
      height={"100vh"}
    >
      <Stack
        flexDir={"column"}
        mb={2}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Heading color={"primary"}>Авторизация</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={4}
              p={"1em"}
              backgroundColor={"primary"}
              boxShadow={"md"}
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents={"none"}
                    children={<IconUser color={"secondary_fixed"} />}
                  />
                  <Input
                    type={"email"}
                    placeholder="Email"
                    borderWidth={"2px"}
                    onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setLogin(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents={"none"}
                    color={"secondary_fixed"}
                    children={<IconLock color={"secondary_fixed"} />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Пароль"
                    borderWidth={"2px"}
                    onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value)}
                  />
                  <InputRightElement>
                    <Button
                      h={"1.75rem"}
                      size={"sm"}
                      leftIcon={showPassword ? <IconEye /> : <IconEyeSlash />}
                      color={"secondary_fixed"}
                      bgColor={"transparent"}
                      onClick={handleShowClick}
                      _hover={{}}
                      _active={{}}
                    >
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                type={"submit"}
                variant={"solid"}
                color={"#FFFFFF"}
                bgColor={"#E6801A"}
              >
                Войти
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  )
}