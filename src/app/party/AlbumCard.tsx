// components/AlbumCard.tsx
"use client";

import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Input,
  Text,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Avatar,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";

interface AlbumCardProps {
  id: number;
  imageUrl: string;
  title: string;
  artist: string;
  rating?: number; // Текущая оценка альбома
  onRate?: (rating: number) => void; // Функция для отправки оценки
  ratedBy?: { name: string; avatar: string; rating: number }[]; // Список пользователей, оценивших альбом
}

export default function AlbumCard({ id, imageUrl, title, artist, rating, onRate, ratedBy }: AlbumCardProps) {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Для управления отображением поля ввода
  const [inputRating, setInputRating] = useState(""); // Состояние для хранения введенной оценки

  const getRatingColor = (rating: number) => {
    if (rating <= 30) return "red.400";
    if (rating <= 50) return "orange.400";
    if (rating <= 75) return "yellow.400";
    return "green.400";
  };

  const handleRate = () => {
    const ratingValue = parseInt(inputRating, 10); // Преобразуем введенное значение в число

    // Проверяем, что введенное значение является числом и находится в диапазоне от 0 до 100
    if (!isNaN(ratingValue) && ratingValue >= 0 && ratingValue <= 100) {
      if (onRate) {
        onRate(ratingValue); // Отправляем новую оценку
        onClose(); // Закрываем поле ввода
        setInputRating(""); // Сбрасываем введенное значение
      }
    } else {
      alert("Пожалуйста, введите число от 0 до 100."); // Валидация ввода
    }
  };

  const toggleRatingInput = () => {
    if (isOpen) {
      onClose(); // Закрываем поле ввода, если оно открыто
    } else {
      onOpen(); // Открываем поле ввода, если оно закрыто
    }
  };

  return (
    <Card
      w="100%"
      maxW="600px"
      borderRadius="xl"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{
        transform: "translateY(-5px)",
        boxShadow: "xl",
        cursor: "pointer",
      }}
      position="relative"
      variant="elevated"
      bg="white"
      _dark={{ bg: "gray.700" }}
    >
      {rating !== undefined ? (
        <Popover trigger="hover" placement="top">
          <PopoverTrigger>
            <Button
              size={{ base: "xs", sm: "sm", md: "md" }}
              fontSize={{ base: "10px", sm: "16px", md: "18px" }}
              borderRadius="full"
              position="absolute"
              top={{ base: "1", sm: "3", md: "4" }}
              right={{ base: "1", sm: "3", md: "4" }}
              px={{ base: 1, sm: 3, md: 4 }}
              py={{ base: 1, sm: 3, md: 4 }}
              bg={getRatingColor(rating)}
              color="white"
              _hover={{ bg: getRatingColor(rating) }}
            >
              {rating}
            </Button>
          </PopoverTrigger>
          <PopoverContent w="auto" maxW="200px">
            <PopoverBody>
              <Stack spacing={2}>
                {ratedBy?.map((user, index) => (
                  <Flex key={index} align="center">
                    <Avatar size="sm" src={user.avatar} name={user.name} mr={2} />
                    <Text fontSize="sm">{user.name}</Text>
                    <Text fontSize="sm" ml="auto" fontWeight="bold">
                      {user.rating}
                    </Text>
                  </Flex>
                ))}
              </Stack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      ) : (
        <Button
          size={{ base: "xs", sm: "sm", md: "md" }}
          fontSize={{ base: "10px", sm: "16px", md: "18px" }}
          borderRadius="full"
          position="absolute"
          top={{ base: "1", sm: "3", md: "4" }}
          right={{ base: "1", sm: "3", md: "4" }}
          px={{ base: 1, sm: 3, md: 4 }}
          py={{ base: 1, sm: 3, md: 4 }}
          bg="whiteAlpha.800"
          _dark={{ bg: "blackAlpha.800" }}
          boxShadow="md"
          borderColor="purple.500"
          _hover={{ bg: "blue.500", color: "whiteAlpha.800" }}
          onClick={toggleRatingInput} // Переключаем состояние поля ввода
        >
          Оценить
        </Button>
      )}

      <Flex direction="row" align="stretch">
        <Box
          flexShrink={0}
          w={{ base: "120px", sm: "180px" }}
          h="auto"
          overflow="hidden"
          position="relative"
        >
          <Image
            src={imageUrl}
            alt={title}
            objectFit="cover"
            objectPosition="top"
            w="100%"
            h="100%"
            transition="all 0.3s"
            _hover={{
              transform: "scale(1.05)",
            }}
          />
        </Box>

        <CardBody
          p={{ base: 4, sm: 6 }}
          flex="1"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Heading
            size={{ base: "md", sm: "lg" }}
            noOfLines={2}
            fontWeight="bold"
            color="gray.800"
            _dark={{ color: "whiteAlpha.900" }}
          >
            {title}
          </Heading>

          <Text
            fontSize={{ base: "sm", sm: "md" }}
            color="gray.600"
            _dark={{ color: "gray.400" }}
            noOfLines={1}
          >
            {artist}
          </Text>

          {/* Поле для ввода оценки */}
          {isOpen && (
            <Box mt={4}>
              <Input
                type="number"
                placeholder="Введите оценку (0-100)"
                value={inputRating}
                onChange={(e) => setInputRating(e.target.value)}
                min={0}
                max={100}
                size="sm"
                mb={2}
              />
              <Button
                colorScheme="blue"
                size="sm"
                onClick={handleRate}
                isDisabled={!inputRating} // Кнопка неактивна, если поле пустое
              >
                Подтвердить
              </Button>
            </Box>
          )}
        </CardBody>
      </Flex>
    </Card>
  );
}