"use client"

import { Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { logout } from "../login/actions";

export default function Dashboard() {

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
        <Heading fontSize={128}>Vinyl Party</Heading>
        <Button width={"20%"} bgColor={"#E6801A"} fontSize={18} onClick={() => logout}>Logout</Button>
      </Stack>
    </Flex>
  )
}