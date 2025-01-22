"use client"

import { Button, Card, Flex, Stack, Image, Box, HStack, Badge, CardBody } from "@chakra-ui/react";
import PartyCard from "./card";

export default function Parties() {
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
      <Stack>
        <PartyCard />
        <PartyCard />
        <PartyCard />
        <PartyCard />
        <PartyCard />
        <PartyCard />
      </Stack>
    </Flex>
  )
}