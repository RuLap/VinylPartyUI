"use client"

import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import CancelButton from "../components/CancelButton";
import AddButton from "../components/AddButton";
import { AddPartyForm } from "./AddPartyForm";
import { PartySet } from "@/types/party";

interface AddPartyButtonProps {
    onAddParty: (newParty: PartySet) => Promise<void>;
}

export function AddPartyButton({onAddParty}: AddPartyButtonProps) {
    const [isFormVisible, setIsFormVisible] = useState(false);
        
    const handleAddClick = () => {
        setIsFormVisible(!isFormVisible);
    };

    const closeForm = () => {
        setIsFormVisible(false)
    }

    return (
        <Flex flex={1} direction={"column"}>
            {isFormVisible
                ? (<CancelButton onClick={handleAddClick} />)
                : (<AddButton onClick={handleAddClick} />)
            }
            {isFormVisible
                ? (<AddPartyForm onAddParty={onAddParty} onClose={closeForm} />)
                : <div />
            }
        </Flex>
    );
}