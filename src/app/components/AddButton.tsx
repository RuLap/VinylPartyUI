import { Button, chakra } from "@chakra-ui/react";
import { Add } from "iconic-react";
import { MouseEventHandler } from "react";

const IconAdd = chakra(Add);

type AddButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export default function AddButton({ onClick }: AddButtonProps) {
    return (
        <Button
          bg='#abb6be'
          color={'#f3f3f3'}
          onClick={onClick}
          _hover={{
            bg: "#849ba1",
          }}
        >
          <IconAdd boxSize='35' />
      </Button>
    )
}