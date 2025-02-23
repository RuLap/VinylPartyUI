"use client";

import { Flex, Stack } from "@chakra-ui/react";
import PartiesPanel from "./PartiesPanel";

export default function Parties() {
  return (
    <Flex
      align={"flex-start"}
      justify={"center"}
      paddingTop={{ base: "15%", lg: "5%", md: "10%", sm: "25%" }}
      paddingBottom={{ base: "5%", lg: "2%" }}
      minHeight={"calc(100vh - 64px)"}
    >
      <Stack w={{ base: '90%', lg: '20%' }} alignContent={"center"}>
        <PartiesPanel />
      </Stack>
    </Flex>
  );
}
