import { useEffect, useState } from "react";
import { PartyGet } from "@/types/party";
import { parties } from "./actions";
import PartyCard from "./PartyCard";
import { Box, Center, Flex, Spinner } from "@chakra-ui/react";

interface PartyListProps {
  parties: PartyGet[];
  isLoading: boolean;
}

function PartyList({ parties, isLoading }: PartyListProps) {
  return (
    <Flex direction={"column"} w={"100%"} gap={2} px={0} marginTop={"10px"}>
        {
            isLoading ? (
                <Center>
                    <Spinner size={"lg"} color="black" />
                </Center>
            )
            : parties.map((party) => (
                <PartyCard key={party.id} id={party.id} name={party.name} date={party.date} isAdmin={false}/>
            ))
        }
      
    </Flex>
  );
};

export default PartyList;
