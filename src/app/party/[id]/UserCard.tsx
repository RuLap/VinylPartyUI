"use client";

import { Box, Flex, Avatar, Text, Icon, chakra, Card, CardHeader, Heading } from "@chakra-ui/react";
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
    <Card id={id}>
      <CardHeader>
        <Flex>
          <Flex flex='1' gap='2' alignItems='center' flexWrap='wrap'>
            <Avatar src={avatar} />
            <Box>
              <Heading size='md'>{name}</Heading>
            </Box>
          </Flex>
        </Flex>
      </CardHeader>
      {isAdmin ?  <Icon as={userAdmin} boxSize={"20px"} position={"absolute"} top={3} right={3}/> : <Flex />}
    </Card>
  )
}