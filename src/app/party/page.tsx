// app/page.tsx
'use client';

import { Flex, Stack, Box, Heading, Container } from "@chakra-ui/react";
import dynamic from 'next/dynamic';

const AlbumCard = dynamic(() => import('./AlbumCard'), {
    ssr: false,
    loading: () => <Box w="100%" maxW="600px" h="200px" bg="gray.100" borderRadius="xl" />
  });

const albums = [
  {
    id: 1,
    imageUrl: "https://i.scdn.co/image/ab67616d00001e025225e9931a558f6d2f541a7d",
    title: "Origin Of Symmetry",
    artist: "Muse",
    rating: 85,
    ratedBy: [
      { name: "Иван Иванов", avatar: "https://bit.ly/dan-abramov", rating: 90 },
      { name: "Петр Петров", avatar: "https://bit.ly/kent-c-dodds", rating: 80 },
    ],
  },
  {
    id: 2,
    imageUrl: "https://i.scdn.co/image/ab67616d00001e02e7dd69ac32cf313fde62cbad",
    title: "Tell Me I'm Pretty",
    artist: "Cage The Elephant",
    rating: 30,
    ratedBy: [
      { name: "Анна Сидорова", avatar: "https://bit.ly/ryan-florence", rating: 30 },
    ],
  },
  {
    id: 3,
    imageUrl: "https://i.scdn.co/image/ab67616d00001e0224f31a0a281320f0cec6f86f",
    title: "Rage Against The Machine",
    artist: "Rage Against The Machine",
  },
  {
    id: 4,
    imageUrl: "https://i.scdn.co/image/ab67616d00001e022df0d98a423025032d0db1f7",
    title: "Blurryface",
    artist: "Twenty One Pilots",
  },
  {
    id: 5,
    imageUrl: "https://i.scdn.co/image/ab67616d00001e024ae1c4c5c45aabe565499163",
    title: "AM",
    artist: "Arctic Monkeys",
  },
  {
    id: 6,
    imageUrl: "https://i.scdn.co/image/ab67616d00001e027d3f52647c096088e1d8ec67",
    title: "Billy Talent II",
    artist: "Billy Talent",
    rating: 60,
    ratedBy: [
      { name: "Сергей Сергеев", avatar: "https://bit.ly/sage-adebayo", rating: 60 },
    ],
  },
  {
    id: 7,
    imageUrl: "https://i.scdn.co/image/ab67616d00001e02b036f68e97ce9f5372bfb350",
    title: "What Went Down",
    artist: "Foals",
  },
  {
    id: 8,
    imageUrl: "https://i.scdn.co/image/ab67616d00001e0258406b3f1ac3ceaff7a64fef",
    title: "The Getaway",
    artist: "Red Hot Chili Peppers",
    rating: 40,
    ratedBy: [
      { name: "Мария Кузнецова", avatar: "https://bit.ly/prosper-baba", rating: 40 },
    ],
  },
];

export default function Home() {
  const handleRateAlbum = (albumId: number, rating: number) => {
    console.log(`Оценка для альбома с ID ${albumId}: ${rating}`);
    // Здесь можно добавить логику для отправки оценки на сервер
  };

  return (
    <Box
      minH="100vh"
      py={12}
      bg="gray.50"
      _dark={{ bg: "gray.900" }}
    >
      <Container maxW="container.lg">
        <Heading 
          mb={8} 
          textAlign="center"
          fontSize="4xl"
          fontWeight="bold"
          color="gray.800"
          _dark={{ color: "whiteAlpha.900" }}
        >
          Альбомы
        </Heading>

        <Flex justify="center">
          <Stack 
            w="100%"
            maxW="600px"
            gap={{ base: 2, sm: 4, md: 6 }}
          >
            {albums.map((album) => (
              <AlbumCard
                id={album.id}
                key={album.id}
                imageUrl={album.imageUrl}
                title={album.title}
                artist={album.artist}
                rating={album.rating}
                ratedBy={album.ratedBy} // Передаем список оценивших пользователей
                onRate={(rating) => handleRateAlbum(album.id, rating)} // Передаем функцию для обработки оценки
              />
            ))}
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
}