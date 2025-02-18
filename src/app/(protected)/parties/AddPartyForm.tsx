"use client";

import { PartySet } from "@/types/party";
import { Box, Button, FormControl, Input, InputGroup, Stack } from "@chakra-ui/react";
import { useState } from "react";

interface AddPartyFormProps {
  onAddParty: (newParty: PartySet) => Promise<void>;
  onClose: () => void;
}

export function AddPartyForm({ onAddParty, onClose }: AddPartyFormProps) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (title && date) {
      try {
        await onAddParty({ 
          title, 
          date: new Date(date).toISOString(),
          description 
        });
        onClose();
        setTitle("");
        setDate("");
        setDescription("");
      } catch (error) {
        console.error("Ошибка при создании вечеринки:", error);
      }
    }
  };

  return (
    <Box minW={{ base: "100%", lg: "100%" }}>
      <form onSubmit={handleSubmit}>
        <Stack
          spacing={4}
          p={"1em"}
          backgroundColor={"primary"}
          boxShadow={"md"}
        >
          <FormControl isRequired>
            <InputGroup>
              <Input
                placeholder="Название"
                value={title}
                borderWidth={"2px"}
                color={"#43655a"}
                onChange={(e) => setTitle(e.target.value)}
              />
            </InputGroup>
          </FormControl>

          <FormControl isRequired>
            <InputGroup>
              <Input
                type={"datetime-local"}
                value={date}
                borderWidth={"2px"}
                color={"#43655a"}
                onChange={(e) => setDate(e.target.value)}
              />
            </InputGroup>
          </FormControl>

          <FormControl>
            <InputGroup>
              <Input
                placeholder="Описание"
                value={description}
                borderWidth={"2px"}
                color={"#43655a"}
                onChange={(e) => setDescription(e.target.value)}
              />
            </InputGroup>
          </FormControl>

          <Button
            type="submit"
            variant="solid"
            color="#f3f3f3"
            bgColor="teal.500"
            _hover={{ bg: "teal.600" }}
            isDisabled={!title || !date}
          >
            Сохранить
          </Button>
        </Stack>
      </form>
    </Box>
  );
}