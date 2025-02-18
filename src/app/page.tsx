'use client'

import RotatingImage from "@/app/components/RotatingImage";
import { Flex, Heading, Stack, Image } from "@chakra-ui/react";

export default function Page() {
  return (
    <Flex
      w={"100%"}
      align={"center"}
      justify={"center"}
      color={"#60807f"}
      bgColor={"#F3F3F3"}
      minHeight={"calc(100vh - 64px)"}
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