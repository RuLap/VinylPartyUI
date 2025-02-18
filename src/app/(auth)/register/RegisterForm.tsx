"use client";

import { useEffect, useState } from "react";
import { useActionState } from "react";
import { Box, Button, chakra, FormControl, FormErrorMessage, Input, InputGroup, InputLeftElement, InputRightElement, Stack, Text } from "@chakra-ui/react";
import { Eye, EyeSlash, User, Lock, Text as IconInputText } from "iconic-react";
import { useRouter } from "next/navigation";
import { register } from "./actions";

const IconUser = chakra(User);
const IconLock = chakra(Lock);
const IconEye = chakra(Eye);
const IconEyeSlash = chakra(EyeSlash);
const IconText = chakra(IconInputText)

interface FormState {
  error?: string;
  success?: boolean;
}

export function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    async (previousState: FormState, formData: FormData) => {
      try {
        const user = await register({
          email: formData.get("email") as string,
          first_name: formData.get("firstName") as string,
          last_name: formData.get("lastName") as string,
          password: formData.get("password") as string
        });
        
        return { success: true, error: undefined };
      } catch (error) {
        return { 
          success: false,
          error: error instanceof Error 
            ? error.message 
            : "Произошла неизвестная ошибка" 
        };
      }
    },
    { error: undefined, success: false }
  );

  useEffect(() => {
    console.log(state)
    if (state.success) {
      router.replace("/");
      router.refresh();
    }
  }, [state.success, router]);

  const COLORS = {
    primary: "#3182CE",
    error: "#E53E3E"
  };

  return (
    <Box rounded="lg" bg="white" boxShadow="lg" p={8}>
      <form action={formAction}>
        <Stack spacing={6}>
          <FormControl isInvalid={!!state.error}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <IconUser color={"teal"} boxSize={5} />
              </InputLeftElement>
              <Input
                name="email"
                type="email"
                placeholder="Email"
                focusBorderColor={COLORS.primary}
                _placeholder={{ color: 'gray.400' }}
                required
              />
            </InputGroup>
          </FormControl>

          <FormControl isInvalid={!!state.error}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <IconText color={"teal"} boxSize={5} />
              </InputLeftElement>
              <Input
                name="firstName"
                type="text"
                placeholder="Имя"
                focusBorderColor={COLORS.primary}
                _placeholder={{ color: 'gray.400' }}
                required
              />
            </InputGroup>
          </FormControl>

          <FormControl isInvalid={!!state.error}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <IconText color={"teal"} boxSize={5} />
              </InputLeftElement>
              <Input
                name="lastName"
                type="text"
                placeholder="Фамилия"
                focusBorderColor={COLORS.primary}
                _placeholder={{ color: 'gray.400' }}
                required
              />
            </InputGroup>
          </FormControl>

          <FormControl isInvalid={!!state.error}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <IconLock color={"teal"} boxSize={5} />
              </InputLeftElement>
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Пароль"
                focusBorderColor={COLORS.primary}
                _placeholder={{ color: 'gray.400' }}
                required
                minLength={8}
              />
              <InputRightElement>
                <Button
                  variant="ghost"
                  onClick={() => setShowPassword(!showPassword)}
                  _hover={{ bg: 'transparent' }}
                  _active={{ bg: 'transparent' }}
                  p={0}
                >
                  {showPassword ? (
                    <IconEyeSlash color={COLORS.primary} boxSize={5} />
                  ) : (
                    <IconEye color={COLORS.primary} boxSize={5} />
                  )}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          {state.error && (
            <Text color={COLORS.error} fontSize="sm">
              {state.error}
            </Text>
          )}

          <Button
            type="submit"
            colorScheme="teal"
            isLoading={isPending}
            loadingText="Вход..."
            width="full"
          >
            Зарегистрироваться
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
