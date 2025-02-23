"use client";

import { Box, Button, Text } from "@chakra-ui/react";
import { useState } from "react";

interface RatingInputProps {
  onRate: (rating: number) => void;
  initialRating?: number;
}

export default function RatingInput({ onRate, initialRating = 0 }: RatingInputProps) {
  const [rating, setRating] = useState(initialRating);

  const handleRate = () => {
    onRate(rating);
  };

  return (
    <Box>
      <Text fontSize="md" mb={2}>
        Оцените альбом (0-100):
      </Text>
      <Text mt={2} fontSize="lg" fontWeight="bold">
        Текущая оценка: {rating}
      </Text>
      <Button
        mt={4}
        colorScheme="blue"
        onClick={handleRate}
        disabled={rating === initialRating}
      >
        Подтвердить оценку
      </Button>
    </Box>
  );
}