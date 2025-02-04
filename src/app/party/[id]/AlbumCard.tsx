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
import { motion, AnimatePresence } from "framer-motion"; // Импорт анимаций
import { UserRatingGet } from "@/types/user";

interface AlbumCardProps {
  id: number;
  imageUrl: string;
  title: string;
  artist: string;
  rating?: number;
  onRate?: (rating: number) => void;
  ratedBy?: UserRatingGet[];
}

export default function AlbumCard({ id, imageUrl, title, artist, rating, onRate, ratedBy }: AlbumCardProps) {
  const { isOpen, onToggle } = useDisclosure();
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
    <Card
      w="100%"
      maxW="600px"
      borderRadius="xl"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", boxShadow: "xl", cursor: "pointer" }}
      position="relative"
      variant="elevated"
      bg="white"
      _dark={{ bg: "gray.700" }}
    >
      {rating !== undefined ? (
        <Popover trigger="hover" placement="top">
          <PopoverTrigger>
            <Button
              size="sm"
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
            </Button>
          </PopoverTrigger>
          <PopoverContent w="auto" maxW="200px">
            <PopoverBody>
              <Stack spacing={2}>
                {ratedBy?.map((user, index) => (
                  <Flex key={index} align="center">
                    <Avatar size="sm" src={user.avatar} name={user.firstName} mr={2} />
                    <Text fontSize="sm">{user.firstName} {user.lastName}</Text>
                    <Text fontSize="sm" ml="auto" fontWeight="bold" paddingLeft={"5px"}>
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
          size="sm"
          borderRadius="full"
          position="absolute"
          top="3"
          right="3"
          px={4}
          py={2}
          bg="whiteAlpha.800"
          _dark={{ bg: "blackAlpha.800" }}
          boxShadow="md"
          borderColor="purple.500"
          _hover={{ bg: "teal.500", color: "whiteAlpha.800" }}
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
          <Heading size="lg" noOfLines={2} fontWeight="bold" color="gray.800" _dark={{ color: "whiteAlpha.900" }}>
            {title}
          </Heading>

          <Text fontSize="md" color="gray.600" _dark={{ color: "gray.400" }} noOfLines={1}>
            {artist}
          </Text>

          <AnimatePresence>
            {isOpen && (
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
                  <Button colorScheme="blue" size="sm" onClick={handleRate} isDisabled={!inputRating}>
                    Подтвердить
                  </Button>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </CardBody>
      </Flex>
    </Card>
  );
}
