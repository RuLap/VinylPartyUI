"use client";

import { Box, Button, FormControl, Input, InputGroup, InputLeftElement, Stack } from "@chakra-ui/react";
import { useFormStatus } from "react-dom";

export function AddPartyForm() {
  return (
    <Box minW={{ base: "100%", lg: "100%" }}>
      <form>
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
                //onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setLogin(e.target.value)}
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
                //onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setLogin(e.target.value)}
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