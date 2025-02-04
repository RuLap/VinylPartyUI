"use client"

import { Flex, Stack } from "@chakra-ui/react";
import PartyCard from "./PartyCard";
import AddButton from "../components/AddButton";
import { MouseEventHandler, useEffect, useState } from "react";
import { AddPartyForm } from "./AddPartyForm";
import CancelButton from "../components/CancelButton";
import { parties, saveParty } from "./actions";
import { PartyGet, PartySet } from "@/types/party";

let nextId = 0;

export default function Parties() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [partyList, setPartyList] = useState<PartyGet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await parties();
        setPartyList(data);
        console.log(data);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    setIsFormVisible(!isFormVisible);
  }

  const handleAddParty = async (newParty: PartySet) => {
    try {
      await saveParty(newParty);
  
      setPartyList(prevList => [
        ...prevList,
        {
          id: (prevList.length + 1),
          name: newParty.name,
          date: newParty.date,
          users: [],
          albums: []
        }
      ]);

      nextId = nextId + 1;

      setIsFormVisible(false);
    } catch (error) {
      console.error("Ошибка при добавлении вечеринки:", error);
    }
  };

  return (
    <Flex
      align={"top"}
      alignContent={"center"}
      justifyContent={"center"}
      color={"#FFFFFF"}
      bgColor={"#F3F3F3"}
      justify={"flex-start"}
      paddingTop={{ base: "5%", lg: "2%"}}
      paddingBottom={{ base: "5%", lg: "2%"}}
      minHeight={"100vh"}
    >
      <Stack w={{ base: '90%', lg: '20%' }}>
        {isFormVisible
          ? (<CancelButton onClick={handleAddClick} />)
          : (<AddButton onClick={handleAddClick} />)
        }       
        {isFormVisible
          ? (<AddPartyForm onAddParty={handleAddParty} partyId={nextId} />)
          : <div />
        }
        {isLoading
          ? (<p>Загрузка...</p>)
          : (
            partyList.map((party) => (
              <PartyCard key={party.id} id={party.id} name={party.name} date={party.date} />
            )
          )
        )}
      </Stack>
    </Flex>
  )
}