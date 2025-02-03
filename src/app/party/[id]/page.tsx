'use client';

import { Flex, Stack, Box, Text, Heading, Container, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel } from "@chakra-ui/react";
import dynamic from 'next/dynamic';
import UserCard from "./UserCard";

const AlbumCard = dynamic(() => import('./AlbumCard'), {
    ssr: false,
    loading: () => <Box w="100%" maxW="600px" h="200px" bg="gray.100" borderRadius="xl" />
  });

  const party = {
    id: 1,
    name: "Вечеринка 1",
    date: "2023-10-01",
    users: [
      { id: 1, name: "Иван Иванов", avatar: "https://bit.ly/dan-abramov" },
      { id: 2, name: "Петр Петров", avatar: "https://bit.ly/kent-c-dodds" },
      { id: 3, name: "Анна Сидорова", avatar: "https://bit.ly/ryan-florence" },
    ],
    albums: [
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
      },
    ],
  };

export default function Home() {
  const handleRateAlbum = (albumId: number, rating: number) => {
    console.log(`Оценка для альбома с ID ${albumId}: ${rating}`);
  };

  return (
    <Flex
      align={"top"}
      alignContent={"center"}
      justifyContent={"center"}
      color={"#FFFFFF"}
      bgColor={"#F3F3F3"}
      justify={"flex-start"}
      paddingTop={{ base: "5%", lg: "2%" }}
      paddingBottom={{ base: "5%", lg: "2%" }}
      minHeight={"100vh"}
    >
      <Stack w={{ base: '90%', lg: '30%' }}>
        <Text fontSize="2xl" fontWeight="bold" color={"#60807f"}>
          {party.name}
        </Text>
        <Text fontSize="md" color="gray.600">
          {party.date}
        </Text>

        <Accordion allowToggle>
          <AccordionItem>
            <AccordionButton color={"#60807f"}>
              <Box flex="1" textAlign="left">
                <Text fontSize="xl" fontWeight="bold" color={"#60807f"}>
                  Участники
                </Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Flex wrap="wrap" gap={4} w="100%" justify="center">
                {party.users.map((user) => (
                  <UserCard
                    key={user.id}
                    id={user.id}
                    name={user.name}
                    avatar={user.avatar}
                  />
                ))}
              </Flex>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        <Accordion allowToggle>
          <AccordionItem>
            <AccordionButton color={"#60807f"}>
              <Box flex="1" textAlign="left">
                <Text fontSize="xl" fontWeight="bold" color={"#60807f"}>
                  Альбомы
                </Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
            <Flex wrap="wrap" gap={4} w="100%" justify="center">
                {party.albums.map((album) => (
                  <AlbumCard
                    key={album.id}
                    id={album.id}
                    imageUrl={album.imageUrl}
                    title={album.title}
                    artist={album.artist}
                    rating={album.rating}
                    ratedBy={album.ratedBy}
                    onRate={(rating) => handleRateAlbum(album.id, rating)}
                  />
                ))}
              </Flex>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Stack>
    </Flex>
  );
}