"use client";

import { Flex, Stack } from "@chakra-ui/react";
import PartiesPanel from "./PartiesPanel";

export default function Parties() {
  return (
    <Flex
      align={"flex-start"}
      justify={"center"}
      color={"#FFFFFF"}
      bgColor={"#F3F3F3"}
      paddingY={{ base: "5%", lg: "2%" }}
      paddingBottom={{ base: "5%", lg: "2%" }}
      minHeight={"calc(100vh - 64px)"}
    >
      <Stack w={{ base: '90%', lg: '20%' }} alignContent={"center"}>
        <PartiesPanel />
      </Stack>
    </Flex>
  );
}
