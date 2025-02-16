"use client"

import RotatingImage from "@/app/components/RotatingImage";
import { Flex, Heading, Stack, Image } from "@chakra-ui/react";

export default function Dashboard() {

  return (
    <Flex
      w={"100%"}
      overflow={"hidden"}
      align={"center"}
      alignContent={"center"}
      justifyContent={"center"}
      color={"#60807f"}
      bgColor={"#F3F3F3"}
      minHeight={"100vh"}
    >
      <Stack
        flexDir={"column"}
        mb={100}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <RotatingImage src="/images/vinyl-logo.png" width={200} height={200} />
        <Heading fontSize={128}>Vinyl Party</Heading>        
      </Stack>
    </Flex>
  )
}