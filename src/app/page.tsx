'use client'

import RotatingImage from "@/app/components/RotatingImage";
import { Button, Flex, Heading, Stack } from "@chakra-ui/react";

export default function Page() {
  return (
    <Flex
      w={"100%"}
      align={"center"}
      justify={"center"}
      minHeight={"calc(100vh - 64px)"}
    >
      <Stack
        flexDir={"column"}
        mb={100}
        gap={100}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <RotatingImage src="/images/vinyl-logo.png" width={200} height={200} />
        <Heading fontSize={128}>Vinyl Party</Heading>        
      </Stack>
    </Flex>
  )
}