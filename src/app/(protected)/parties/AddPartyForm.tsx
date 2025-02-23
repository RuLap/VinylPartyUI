"use client";

import { PartySet } from "@/types/party";
import { useState } from "react";
import { Box, Button, Field, FieldLabel, Input, Stack } from "@chakra-ui/react";

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
    <Box minW={{ base: "100%", lg: "100%" }} paddingTop={"0.75em"}>
      <form onSubmit={handleSubmit}>
        <Stack gap={4} p={"1em"} boxShadow={"md"} rounded={"lg"}>
          <Field.Root>
            <FieldLabel>Название</FieldLabel>
            <Input
              placeholder="Введите название"
              value={title}
              rounded={"lg"}
              borderWidth={"2px"}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Field.Root>

          <Field.Root>
            <FieldLabel>Дата</FieldLabel>
            <Input
              type="datetime-local"
              value={date}
              rounded={"lg"}
              borderWidth={"2px"}
              onChange={(e) => setDate(e.target.value)}
            />
          </Field.Root>

          <Field.Root>
            <FieldLabel>Описание</FieldLabel>
            <Input
              placeholder="Введите описание"
              value={description}
              rounded={"lg"}
              borderWidth={"2px"}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Field.Root>

          <Button
            type="submit"
            variant={"primary"}
            disabled={!title || !date}
          >
            Сохранить
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
