import { PartyShortGet } from "@/types/party";
import PartyCard from "./PartyCard";
import { Center, Flex, Spinner } from "@chakra-ui/react";

interface PartyListProps {
  parties: PartyShortGet[];
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
          <PartyCard key={party.id} id={party.id} title={party.title} date={party.date}/>
        ))
      }
      
    </Flex>
  );
};

export default PartyList;
