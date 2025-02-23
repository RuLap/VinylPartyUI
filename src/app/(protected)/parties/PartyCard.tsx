import { Card, Text } from "@chakra-ui/react";
import NextLink from "next/link";

interface PartyCardProps {
  id: string;
  title: string;
  date: string;
}

export default function PartyCard({id, title, date}: PartyCardProps) {
    return (
      <NextLink href={`/parties/${id}`} passHref>
        <Card.Root
          w={"100%"}
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
        >        
          <Card.Body
            p={{ base: 4, sm: 6 }}
            flex="1"
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Card.Title
              maxLines={2}
              fontWeight="bold"
            >
              {title}
            </Card.Title>
            
            <Text
              fontSize={{ base: 'sm', sm: 'md' }}
              maxLines={1}
            >
              {date}
            </Text>
          </Card.Body>

      </Card.Root>
      </NextLink>
    )
}