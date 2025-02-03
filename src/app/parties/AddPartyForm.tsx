"use client";

import { Box, Button, FormControl, Input, InputGroup, Stack } from "@chakra-ui/react";
import { useState } from "react";

interface AddPartyFormProps {
  onAddParty: (newParty: { name: string, date: string }) => void;
}

export function AddPartyForm({ onAddParty  }: AddPartyFormProps) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name && date) {
      onAddParty({ name, date });
      setName("");
      setDate("");
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
          <FormControl>
            <InputGroup>
              <Input
                placeholder="Название"
                borderWidth={"2px"}
                color={"#43655a"}
                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setName(e.target.value)}
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <InputGroup>
              <Input
                type={"datetime-local"}
                placeholder="Дата и время"
                borderWidth={"2px"}
                color={"#43655a"}
                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setDate(e.target.value)}
              />
            </InputGroup>
          </FormControl>
          <Button
            type={"submit"}
            variant={"solid"}
            color={"#f3f3f3"}
            bgColor={"#849ba1"}
            _hover={{
              bg: "#60807f",
            }}
          >
            Сохранить
          </Button>
        </Stack>
      </form>
    </Box>
  );
}