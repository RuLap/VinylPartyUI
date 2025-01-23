"use client"

import { Button, Card, Flex, Stack, Image, Box, HStack, Badge, CardBody } from "@chakra-ui/react";
import PartyCard from "./card";
import AddButton from "../components/AddButton";
import { MouseEventHandler, useState } from "react";
import { AddPartyForm } from "./AddPartyForm";
import CancelButton from "../components/CancelButton";

export default function Parties() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleAddClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    setIsFormVisible(!isFormVisible);
  }

  return (
    <Flex
      align={"center"}
      alignContent={"center"}
      justifyContent={"center"}
      color={"#FFFFFF"}
      bgColor={"#221B12"}
      justify={"flex-start"}
      paddingTop={{ base: "5%", lg: "2%"}}
      paddingBottom={{ base: "5%", lg: "2%"}}
      minHeight={"100hv"}
    >
      <Stack w={{ base: '90%', lg: '20%' }}>
        {isFormVisible
          ? (<CancelButton onClick={handleAddClick} />)
          : (<AddButton onClick={handleAddClick} />)
        }       
        {isFormVisible
          ? (<AddPartyForm />)
          : <div />
        }
        <PartyCard />
        <PartyCard />
        <PartyCard />
        <PartyCard />
        <PartyCard />
        <PartyCard />
        <PartyCard />
        <PartyCard />
        <PartyCard />
        <PartyCard />
        <PartyCard />
        <PartyCard />
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