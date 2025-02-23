"use client";

import { Avatar } from "@/components/ui/avatar";
import { Box, Flex, Icon, chakra, Card, Heading } from "@chakra-ui/react";
import {UserOctagon} from "iconic-react"

const userAdmin = chakra(UserOctagon)

interface UserCardProps {
  id: string;
  name: string;
  avatar: string;
  isAdmin: boolean;
}

export default function UserCard({ id, name, avatar, isAdmin }: UserCardProps) {
  return (
    <Card.Root id={id}>
      <Card.Body>
        <Flex flex='1' gap='2' alignItems='center' flexWrap='wrap'>
          <Avatar src={avatar} />
          <Box>
            <Heading size='md'>{name}</Heading>
          </Box>
        </Flex>
      </Card.Body>
      {isAdmin ? <Icon as={userAdmin} boxSize={"20px"} position={"absolute"} color={"blcak.950"} top={3} right={3}/> : <Flex />}
    </Card.Root>
  )
}