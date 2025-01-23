import { Button, Card, CardBody, CardFooter, Center, chakra, Flex, Heading, Image, Stack, StackDivider, Text } from "@chakra-ui/react";
import { Add } from "iconic-react";
import { HtmlHTMLAttributes, MouseEventHandler } from "react";

const IconAdd = chakra(Add);

type AddButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export default function AddButton({ onClick }: AddButtonProps) {
    return (
        <Button
          bg='#E6801A'
          color={'#221B12'}
          onClick={onClick}
          _hover={{
            bg: "#E6801A",
            color: "#221B12",
          }}
        >
          <IconAdd boxSize='35' />
      </Button>
    )
}