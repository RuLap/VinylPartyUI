import { Card, CardBody, Flex, Heading, Text, chakra, Icon } from "@chakra-ui/react";
import NextLink from "next/link";
import {UserOctagon} from "iconic-react"

const userAdmin = chakra(UserOctagon)

interface PartyCardProps {
  id: string;
  title: string;
  date: string;
  isAdmin: boolean;
}

export default function PartyCard({id, title, date, isAdmin}: PartyCardProps) {
    return (
      <NextLink href={`/party/${id}`} passHref>
        <Card
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
          bg="white"
          _dark={{ bg: "gray.700" }}
        >        
          <CardBody
            p={{ base: 4, sm: 6 }}
            flex="1"
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Heading 
              size={{ base: 'md', sm: 'md' }} 
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
              {date}
            </Text>
          </CardBody>

      </Card>
      </NextLink>
    )
}