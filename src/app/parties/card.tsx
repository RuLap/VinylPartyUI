import { Card, Center, Flex, Heading, Image, Stack, StackDivider, Text } from "@chakra-ui/react";

interface PartyCardProps {
  id: string;
  name: string;
  date: string;
}

export default function PartyCard({id, name, date}: PartyCardProps) {
    return (
        <Card
          direction={{ base: 'column', sm: 'row' }}
          overflow='hidden'
          variant='outline'
          color={'#FFFFFF'}
          bgColor={'#221B12'}
          borderColor={'#E6801A'}
          borderWidth={'2px'}
          >
          <Flex w='100%'>
            <Center w='15%' bg='#E6801A' paddingRight={'2px'}>
                <Text fontSize={'20'} fontWeight={'600'}>#{id}</Text>
            </Center>
            <Center w='90%'>
              <Stack w='100%' divider={<StackDivider borderColor={'#E6801A'} borderWidth={'1px'}/>} spacing='1'>
                <Heading paddingLeft={'10px'} paddingTop={'5px'} paddingBottom={'5px'} fontSize={16} w={'100%'}>{name}</Heading>
                <Text paddingLeft={'10px'} paddingBottom={'5px'} color={'#BBBBBB'} fontSize={12}>{date}</Text>
              </Stack>
            </Center>
          </Flex>
      </Card>
    )
}