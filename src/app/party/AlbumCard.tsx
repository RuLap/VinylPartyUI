'use client';

import { Box, Button, Card, CardBody, Flex, Heading, Image, Text } from "@chakra-ui/react";

interface AlbumCardProps {
  imageUrl: string;
  title: string;
  artist: string;
  rating?: number;
}

export default function AlbumCard({ imageUrl, title, artist, rating }: AlbumCardProps) {
  const getRatingColor = (rating: number) => {
    if (rating <= 30) return "red.400";
    if (rating <= 50) return "orange.400";
    if (rating <= 75) return "yellow.400";
    return "green.400";
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
        cursor: "pointer"
      }}
      position="relative"
      variant="elevated"
      bg="white"
      _dark={{ bg: "gray.700" }}
    >
      {rating !== undefined ? 
      (
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
      ) :
      (
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
        >
          Оценить
        </Button>
      )}
      
      <Flex direction="row" align="stretch">
        <Box
          flexShrink={0}
          w={{ base: '120px', sm: '180px' }} 
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
              transform: "scale(1.05)"
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
            size={{ base: 'md', sm: 'lg' }} 
            noOfLines={2}
            fontWeight="bold"
            color="gray.800"
            _dark={{ color: "whiteAlpha.900" }}
          >
            {title}
          </Heading>
          
          <Text
            fontSize={{ base: 'sm', sm: 'md' }} 
            color="gray.600"
            _dark={{ color: "gray.400" }}
            noOfLines={1}
          >
            {artist}
          </Text>
        </CardBody>
      </Flex>
    </Card>
  );
}
