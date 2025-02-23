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
  PopoverBody,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserRatingGet } from "@/types/user";
import { PopoverContent, PopoverRoot, PopoverTrigger } from "@/components/ui/popover";
import { Avatar } from "@/components/ui/avatar";

interface AlbumCardProps {
  id: string;
  imageUrl: string;
  title: string;
  artist: string;
  rating?: number;
  onRate?: (rating: number) => void;
  ratedBy?: UserRatingGet[];
}

export default function AlbumCard({ id, imageUrl, title, artist, rating, onRate, ratedBy }: AlbumCardProps) {
  const { open, onToggle } = useDisclosure();
  const [inputRating, setInputRating] = useState("");

  const getRatingColor = (rating: number) => {
    if (rating <= 30) return "red.400";
    if (rating <= 50) return "orange.400";
    if (rating <= 75) return "yellow.400";
    return "green.400";
  };

  const handleRate = () => {
    const ratingValue = parseInt(inputRating, 10);
    if (!isNaN(ratingValue) && ratingValue >= 0 && ratingValue <= 100) {
      onRate?.(ratingValue);
      onToggle();
      setInputRating("");
    } else {
      alert("Введите число от 0 до 100.");
    }
  };

  return (
    <Card.Root
      w="100%"
      maxW="600px"
      borderRadius="xl"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", boxShadow: "xl", cursor: "pointer" }}
      position="relative"
      variant="elevated"
    >
      {rating !== undefined && rating != 0 ? (
        <PopoverRoot>
          <PopoverTrigger
            borderRadius="full"
            position="absolute"
            top="3"
            right="3"
            px={4}
            py={2}
            bg={getRatingColor(rating)}
            color="white"
            _hover={{ bg: getRatingColor(rating) }}
          >
            {rating}
          </PopoverTrigger>
          <PopoverContent w="auto" maxW="200px">
            <PopoverBody>
              <Stack gap={2}>
                {ratedBy?.map((rating, index) => (
                  <Flex key={index} align="center">
                    <Avatar size="sm" src={rating.user.avatar_url} name={rating.user.first_name} mr={2} />
                    <Text fontSize="sm">{rating.user.first_name} {rating.user.last_name}</Text>
                    <Text fontSize="sm" ml="auto" fontWeight="bold" paddingLeft={"5px"}>
                      {rating.score}
                    </Text>
                  </Flex>
                ))}
              </Stack>
            </PopoverBody>
          </PopoverContent>
        </PopoverRoot>
      ) : (
        <Button
          size="sm"
          borderRadius="full"
          position="absolute"
          top="3"
          right="3"
          px={4}
          py={2}
          boxShadow="md"
          onClick={onToggle}
        >
          Оценить
        </Button>
      )}

      <Flex direction="row" align="stretch">
        <Box flexShrink={0} w="180px" h="auto" overflow="hidden">
          <Image
            src={imageUrl}
            alt={title}
            objectFit="cover"
            objectPosition="top"
            w="100%"
            h="100%"
            transition="all 0.3s"
            _hover={{ transform: "scale(1.05)" }}
          />
        </Box>

        <CardBody p={6} flex="1" display="flex" flexDirection="column" justifyContent="center">
          <Heading size="lg" maxLines={2} fontWeight="bold">
            {title}
          </Heading>

          <Text fontSize="lg" color="gray.600" _dark={{ color: "gray.400" }} maxLines={1}>
            {artist}
          </Text>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
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
                  <Button colorScheme="blue" size="sm" onClick={handleRate} disabled={!inputRating}>
                    Подтвердить
                  </Button>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </CardBody>
      </Flex>
    </Card.Root>
  );
}
