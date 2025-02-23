"use client";

import { 
  Flex, Button, Stack, Box, Text, Icon, Input, Spinner, Collapsible
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import UserCard from "./UserCard";
import { useEffect, useState } from "react";
import { PartyGet } from "@/types/party";
import { useParams } from "next/navigation";
import { CreateAlbum, CreateRating, GetParty } from "./actions";
import { useSession } from "@/app/hooks/use-session";
import { toaster } from "@/components/ui/toaster"
import { GrAdd } from "react-icons/gr";
import { AccordionRoot, AccordionItem, AccordionItemTrigger, AccordionItemContent } from "@/components/ui/accordion";

const AlbumCard = dynamic(() => import('./AlbumCard'), {
  ssr: false,
  loading: () => <Box w="100%" maxW="600px" h="200px" bg="gray.100" borderRadius="xl" />
});

export default function Home() {
  const { data: session } = useSession()
  const params = useParams();
  const id = params?.id as string;

  const [party, setParty] = useState<PartyGet | null>(null);
  const [showAlbumInput, setShowAlbumInput] = useState(false);
  const [spotifyLink, setSpotifyLink] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetParty(id);
        if(data) {
          setParty(data);
        }
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleRateAlbum = async (albumId: string, score: number) => {
    try {
      const userId = session.user?.id === null ? "" : session.user!.id
      console.log(party)
      const result = await CreateRating({albumId, userId, score});
      if (result) {
        setParty(prev => {
          if (!prev) return prev;

          const updatedAlbums = prev.albums.map(album => {
            if (album.id === albumId) {
              return {
                ...album,
                ...result,
              };
            }
            return album;
          });

          return {
            ...prev,
            albums: updatedAlbums,
          }
        });
        console.log(party)
        toaster.create({
          title: "Успешно!",
          description: "Альбом оценен",
          type: "success",
          duration: 2000,
      })
      }
    } catch (error) {
      console.error("Ошибка при оценке альбома:", error);
    } finally {
      setShowAlbumInput(false);
    }
  };

  const handleAddUser = () => {
    console.log("Добавление нового участника");
  };

  const handleAddAlbum = () => {
    setShowAlbumInput(prev => !prev);
  };

  const handleSaveAlbum = async () => {
    try {
      const result = await CreateAlbum(id, spotifyLink);
      if (result) {
        setParty(prev => {
          if (!prev) return prev;
          return {
            ...prev,
            albums: [result, ...(prev.albums || [])]
          }
        });
        toaster.create({
          title: "Успешно!",
          description: "Альбом добавлен",
          type: "success",
          duration: 2000,
      })
      }
    } catch (error) {
      console.error("Ошибка при сохранении альбома:", error);
    } finally {
      setShowAlbumInput(false);
      setSpotifyLink("");
    }
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
      justify="center"
      paddingTop={{ base: "15%", lg: "5%", md: "10%", sm: "25%" }}
      paddingBottom={{ base: "5%", lg: "2%" }}
      minHeight={"calc(100vh - 64px)"}
    >
      <Stack w={{ base: '90%', lg: '30%' }}>
        <Text fontSize="2xl" fontWeight="bold" color="#60807f">
          {party.title}
        </Text>
        <Text fontSize="md" color="gray.600">
          {party.description}
        </Text>
        <Text fontSize="md" color="gray.600">
          {party.date}
        </Text>

        <AccordionRoot collapsible>
          <AccordionItem value="Участники">
            <AccordionItemTrigger>Участники</AccordionItemTrigger>
            <AccordionItemContent pb={4}>
              <Flex wrap="wrap" gap={4} justify="flex-start">
                {party.participants?.map((participant) => (
                  <UserCard
                    key={participant.user.id}
                    id={participant.user.id}
                    name={participant.user.first_name + " " + participant.user.last_name}
                    avatar={participant.user.avatar_url}
                    isAdmin={participant.role == "Admin"}
                  />
                ))}
                <Collapsible.Root>
                  <Collapsible.Trigger
                    w="100%"
                    maxW="600px"
                    h="75px"
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
                    onClick={handleAddUser}
                    transition="all 0.2s"
                  >
                    <GrAdd color="teal.500" size={"20px"} />
                    <Text color="teal.500" fontWeight="semibold" paddingRight={"5px"} paddingLeft={"5px"}>
                      Добавить участника
                    </Text>
                  </Collapsible.Trigger>
                  <Collapsible.Content>
                  </Collapsible.Content>
                </Collapsible.Root>
              </Flex>
            </AccordionItemContent>
          </AccordionItem>
        </AccordionRoot>

        <AccordionRoot collapsible>
          <AccordionItem value="Альбомы">
            <AccordionItemTrigger>Альбомы</AccordionItemTrigger>
            <AccordionItemContent pb={4}>
              <Flex direction="column" gap={4}>
                <Collapsible.Root>
                  <Collapsible.Trigger
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
                    <GrAdd size={"20px"} />
                    <Text color="teal.500" fontWeight="semibold">
                      Добавить альбом
                    </Text>
                  </Collapsible.Trigger>
                  <Collapsible.Content>
                  <Flex
                    display="flex"
                    flexDirection="row"
                    paddingTop={"0.75em"}
                  >
                    <Input
                      placeholder="Вставьте ссылку на Spotify"
                      value={spotifyLink}
                      onChange={(e) => setSpotifyLink(e.target.value)}
                    />
                    <Button variant={"primary"} onClick={handleSaveAlbum}>
                      Сохранить
                    </Button>
                    </Flex>
                  </Collapsible.Content>
                </Collapsible.Root>

                <Flex wrap="wrap" gap={4} justify="center">
                  {party.albums?.map((album) => (
                    <AlbumCard
                      key={album.id}
                      id={album.id}
                      imageUrl={album.cover_url}
                      title={album.title}
                      artist={album.artist}
                      rating={album.average_rating}
                      ratedBy={album.ratings}
                      onRate={(rating) => handleRateAlbum(album.id, rating)}
                    />
                  ))}
                </Flex>
              </Flex>
            </AccordionItemContent>
          </AccordionItem>
        </AccordionRoot>
      </Stack>
    </Flex>
  );
}
