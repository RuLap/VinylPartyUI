'use client'

import { Flex, Stack, Box, Heading, Container } from "@chakra-ui/react";
import dynamic from 'next/dynamic';

const AlbumCard = dynamic(() => import('./AlbumCard'), {
    ssr: false,
    loading: () => <Box w="100%" maxW="600px" h="200px" bg="gray.100" borderRadius="xl" />
  });

const albums = [
  {
    imageUrl: "https://i.scdn.co/image/ab67616d00001e025225e9931a558f6d2f541a7d",
    title: "Origin Of Symmetry",
    artist: "Muse",
    rating: 85
  },
  {
    imageUrl: "https://i.scdn.co/image/ab67616d00001e02e7dd69ac32cf313fde62cbad",
    title: "Tell Me I'm Pretty",
    artist: "Cage The Elephant",
    rating: 30
  },
  {
    imageUrl: "https://i.scdn.co/image/ab67616d00001e0224f31a0a281320f0cec6f86f",
    title: "Rage Against The Machine",
    artist: "Rage Against The Machine"
  },
  {
    imageUrl: "https://i.scdn.co/image/ab67616d00001e022df0d98a423025032d0db1f7",
    title: "Blurryface",
    artist: "Twenty One Pilots"
  },
  {
    imageUrl: "https://i.scdn.co/image/ab67616d00001e024ae1c4c5c45aabe565499163",
    title: "AM",
    artist: "Arctic Monkeys"
  },
  {
    imageUrl: "https://i.scdn.co/image/ab67616d00001e027d3f52647c096088e1d8ec67",
    title: "Billy Talent II",
    artist: "Billy Talent",
    rating: 60
  },
  {
    imageUrl: "https://i.scdn.co/image/ab67616d00001e02b036f68e97ce9f5372bfb350",
    title: "What Went Down",
    artist: "Foals"
  },
  {
    imageUrl: "https://i.scdn.co/image/ab67616d00001e0258406b3f1ac3ceaff7a64fef",
    title: "The Getaway",
    artist: "Red Hot Chili Peppers",
    rating: 40
  },
];

export default function Home() {
    return (
      <Box
        minH="100vh"
        py={12}
        bg="#F3F3F3"
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
              {albums.map((album, index) => (
                <AlbumCard
                  key={index}
                  imageUrl={album.imageUrl}
                  title={album.title}
                  artist={album.artist}
                  rating = {album.rating}
                />
              ))}
            </Stack>
          </Flex>
        </Container>
      </Box>
    );
  }