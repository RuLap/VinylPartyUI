"use client"

import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import CancelButton from "../components/CancelButton";
import AddButton from "../components/AddButton";
import { AddPartyForm } from "./AddPartyForm";

export function AddPartyButton() {
    const [isFormVisible, setIsFormVisible] = useState(false);
        
    const handleAddClick = () => {
        setIsFormVisible(!isFormVisible);
    };

    return (
        <Flex flex={1} direction={"column"}>
            {isFormVisible
                ? (<CancelButton onClick={handleAddClick} />)
                : (<AddButton onClick={handleAddClick} />)
            }
            {isFormVisible
                ? (<AddPartyForm onAddParty={() => {}} partyId={0} />)
                : <div />
            }
        </Flex>
    );
}