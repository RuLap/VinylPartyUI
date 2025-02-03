"use client"

import { Flex, Heading, Stack } from "@chakra-ui/react";

export default function Dashboard() {

  return (
    <Flex
      w={"100%"}
      align={"center"}
      alignContent={"center"}
      justifyContent={"center"}
      color={"#60807f"}
      bgColor={"#F3F3F3"}
      height={"100vh"}
    >
      <Stack
        flexDir={"column"}
        mb={2}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Heading fontSize={128}>Vinyl Party</Heading>        
      </Stack>
    </Flex>
  )
}