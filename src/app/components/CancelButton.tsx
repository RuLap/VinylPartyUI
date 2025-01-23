import { Button, chakra } from "@chakra-ui/react";
import { Add } from "iconic-react";
import { MouseEventHandler } from "react";

const IconAdd = chakra(Add);

type CancelButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export default function CancelButton({ onClick }: CancelButtonProps) {
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
        <IconAdd
          boxSize='35'
          sx={{
              transform: "rotate(45deg)"
          }}
        />
    </Button>
    )
}