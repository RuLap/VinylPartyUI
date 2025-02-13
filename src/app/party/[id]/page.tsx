"use client";

import { 
  Flex, Button, Stack, Box, Text, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Icon,
  Collapse, Input, InputGroup, InputRightElement, Spinner
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import UserCard from "./UserCard";
import { AddIcon } from "@chakra-ui/icons";
import { getParty } from "@/app/parties/actions";
import { useEffect, useState } from "react";
import { PartyGet } from "@/types/party";
import { useParams } from "next/navigation";

const AlbumCard = dynamic(() => import('./AlbumCard'), {
  ssr: false,
  loading: () => <Box w="100%" maxW="600px" h="200px" bg="gray.100" borderRadius="xl" />
});

export default function Home() {
  const params = useParams();
  const id = params?.id as string;

  const [party, setParty] = useState<PartyGet | null>(null);
  const [showAlbumInput, setShowAlbumInput] = useState(false);
  const [spotifyLink, setSpotifyLink] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getParty(id);
        setParty(data);
        console.log(data);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleRateAlbum = (albumId: number, rating: number) => {
    console.log(`Оценка для альбома с ID ${albumId}: ${rating}`);
  };

  const handleAddUser = () => {
    console.log("Добавление нового участника");
  };

  const handleAddAlbum = () => {
    setShowAlbumInput(prev => !prev);
  };

  const handleSaveAlbum = () => {
    console.log("Сохранить альбом со ссылкой на Spotify:", spotifyLink);
    setShowAlbumInput(false);
    setSpotifyLink("");
  };

  if (!party) {
    return (
        <Flex align={"center"} justify={"center"} minHeight={"90%"}>
          <Spinner size={"xl"} />
        </Flex>
    );
  }

  return (
    <Flex
      align="top"
      color="#FFFFFF"
      bgColor="#F3F3F3"
      justify="center"
      paddingTop={{ base: "5%", lg: "2%" }}
      paddingBottom={{ base: "5%", lg: "2%" }}
      minHeight="100vh"
    >
      <Stack w={{ base: '90%', lg: '30%' }}>
        <Text fontSize="2xl" fontWeight="bold" color="#60807f">
          {party.name}
        </Text>
        <Text fontSize="md" color="gray.600">
          {party.date}
        </Text>

        <Accordion allowToggle>
          <AccordionItem>
            <AccordionButton color="#60807f" _hover={{ bg: 'gray.50' }}>
              <Box flex="1" textAlign="left">
                <Text fontSize="xl" fontWeight="bold">
                  Участники
                </Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Flex wrap="wrap" gap={4} justify="flex-start">
                {party.users?.map((user) => (
                  <UserCard
                    key={user.id}
                    id={user.id}
                    name={user.firstName + " " + user.lastName}
                    avatar={user.avatar}
                  />
                ))}
                <Box
                  as="button"
                  onClick={handleAddUser}
                  minW="200px"
                  p={6}
                  border="2px dashed"
                  borderColor="gray.300"
                  borderRadius="xl"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  _hover={{ 
                    borderColor: 'teal.500',
                    bg: 'gray.50',
                    transform: 'scale(0.98)'
                  }}
                  transition="all 0.2s"
                >
                  <Icon as={AddIcon} w={6} h={6} color="teal.500" />
                </Box>
              </Flex>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        <Accordion allowToggle>
          <AccordionItem>
            <AccordionButton color="#60807f" _hover={{ bg: 'gray.50' }}>
              <Box flex="1" textAlign="left">
                <Text fontSize="xl" fontWeight="bold">
                  Альбомы
                </Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Flex direction="column" gap={4}>
                <Button
                  w="100%"
                  maxW="600px"
                  h="75px"
                  bg="white.500"
                  border="2px dashed"
                  borderColor="gray.300"
                  borderRadius="xl"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  _hover={{ 
                    borderColor: 'teal.500',
                    bg: 'gray.50',
                    transform: 'scale(0.98)'
                  }}
                  onClick={handleAddAlbum}
                  transition="all 0.2s"
                >
                  <Icon as={AddIcon} w={7} h={7} color="teal.500" mb={2} />
                  <Text color="teal.500" fontWeight="semibold">
                    Добавить альбом
                  </Text>
                </Button>

                <Collapse in={showAlbumInput} animateOpacity>
                  <Box
                    bg="white.500"
                  >
                    <InputGroup>
                      <Input
                        placeholder="Вставьте ссылку на Spotify"
                        value={spotifyLink}
                        bg={"white"}
                        color={"gray.600"}
                        onChange={(e) => setSpotifyLink(e.target.value)}
                      />
                      <InputRightElement width="6rem" mr={2}>
                        <Button h="1.75rem" size="sm" color={"white.500"} bg={"teal.500"} onClick={handleSaveAlbum}>
                          Сохранить
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </Box>
                </Collapse>

                <Flex wrap="wrap" gap={4} justify="center">
                  {party.albums?.map((album) => (
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
              </Flex>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Stack>
    </Flex>
  );
}
