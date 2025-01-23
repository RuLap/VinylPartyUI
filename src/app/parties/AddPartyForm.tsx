"use client";

import { Box, Button, FormControl, Input, InputGroup, InputLeftElement, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { useFormStatus } from "react-dom";

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
              <InputLeftElement
                pointerEvents={"none"}
              />
              <Input
                placeholder="Название"
                borderWidth={"2px"}
                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setName(e.target.value)}
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <InputGroup>
              <InputLeftElement
                pointerEvents={"none"}
              />
              <Input
                type={"datetime-local"}
                placeholder="Дата и время"
                borderWidth={"2px"}
                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setDate(e.target.value)}
              />
            </InputGroup>
          </FormControl>
          <Button
            type={"submit"}
            variant={"solid"}
            color={"#FFFFFF"}
            bgColor={"#E6801A"}
          >
            Сохранить
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit">
      Сохранить
    </button>
  );
}