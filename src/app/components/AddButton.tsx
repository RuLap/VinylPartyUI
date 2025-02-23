import { Button } from "@chakra-ui/react";
import { MouseEventHandler } from "react";
import { GrAdd } from "react-icons/gr";

type AddButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export default function AddButton({ onClick }: AddButtonProps) {
    return (
        <Button
          w="100%"
          onClick={onClick}
          variant={"primary"}
        >
          <GrAdd color="white" />
      </Button>
    )
}