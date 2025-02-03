"use client";

import { Box, Button, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from "@chakra-ui/react";
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
      <Slider
        aria-label="Оценка альбома"
        defaultValue={initialRating}
        min={0}
        max={100}
        step={1}
        value={rating}
        onChange={(value) => setRating(value)}
      >
        <SliderTrack bg="gray.200">
          <SliderFilledTrack bg="blue.500" />
        </SliderTrack>
        <SliderThumb boxSize={6} />
      </Slider>
      <Text mt={2} fontSize="lg" fontWeight="bold">
        Текущая оценка: {rating}
      </Text>
      <Button
        mt={4}
        colorScheme="blue"
        onClick={handleRate}
        isDisabled={rating === initialRating}
      >
        Подтвердить оценку
      </Button>
    </Box>
  );
}