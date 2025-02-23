import { Button } from "@chakra-ui/react";
import { MouseEventHandler } from "react";
import { GrClose } from "react-icons/gr";

type CancelButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export default function CancelButton({ onClick }: CancelButtonProps) {
    return (
      <Button
        w={"100%"}
        onClick={onClick}
        variant={"primary"}
      >
        <GrClose color="white" />
    </Button>
    )
}