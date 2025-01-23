"use client"

import { Flex, Stack } from "@chakra-ui/react";
import PartyCard from "./card";
import AddButton from "../components/AddButton";
import { MouseEventHandler, useActionState, useEffect, useState } from "react";
import { AddPartyForm } from "./AddPartyForm";
import CancelButton from "../components/CancelButton";
import { parties, saveParty } from "./actions";
import { PartyGet } from "@/types/party";

export default function Parties() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [partyList, setPartyList] = useState<PartyGet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await parties(); // Вызываем метод загрузки данных
        setPartyList(data);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      } finally {
        setIsLoading(false); // Завершаем состояние загрузки
      }
    };

    fetchData();
  }, []);

  const handleAddClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    setIsFormVisible(!isFormVisible);
  }

  const handleAddParty = async (newParty: { name: string, date: string }) => {
    try {
      await saveParty(newParty); // Сохраняем новую вечеринку
  
      // Добавляем новую вечеринку в текущий список
      setPartyList(prevList => [
        ...prevList,
        {
          id: (prevList.length + 1).toString(), // генерируем ID для новой вечеринки
          name: newParty.name,
          date: newParty.date,
          users: [],
          albums: []
        }
      ]);

      setIsFormVisible(false);
    } catch (error) {
      console.error("Ошибка при добавлении вечеринки:", error);
    }
  };

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
      minHeight={"100vh"}
    >
      <Stack w={{ base: '90%', lg: '20%' }}>
        {isFormVisible
          ? (<CancelButton onClick={handleAddClick} />)
          : (<AddButton onClick={handleAddClick} />)
        }       
        {isFormVisible
          ? (<AddPartyForm onAddParty={handleAddParty} />)
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