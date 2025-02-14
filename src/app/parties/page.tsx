"use client";

import { Flex, Stack } from "@chakra-ui/react";
import PartiesPanel from "./PartiesPanel";

export default function Parties() {
  return (
    <Flex
      align={"top"}
      alignContent={"center"}
      justifyContent={"center"}
      color={"#FFFFFF"}
      bgColor={"#F3F3F3"}
      justify={"flex-start"}
      paddingTop={{ base: "5%", lg: "2%" }}
      paddingBottom={{ base: "5%", lg: "2%" }}
      minHeight={"100vh"}
    >
      <Stack w={{ base: '90%', lg: '20%' }} alignContent={"center"}>
        <PartiesPanel />
      </Stack>
    </Flex>
  );
}
