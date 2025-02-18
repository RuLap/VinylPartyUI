"use client"

import { Tab, TabList, TabPanel, TabPanels, Tabs, useToast } from "@chakra-ui/react";
import { GetUserParties, CreateParty } from "./actions";
import { PartySet, PartyShortGet } from "@/types/party";
import PartyList from "./PartyList";
import { AddPartyButton } from "./AddPartyButton";
import { useEffect, useState } from "react";
import { useSession } from "../../hooks/use-session";

const PartiesPanel = () => {
    const { data: session } = useSession()
    const toast = useToast()
    const [activeParties, setActiveParties] = useState<PartyShortGet[]>([])
    const [archivedParties, setArchivedParties] = useState<PartyShortGet[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isCreating, setIsCreating] = useState(false)
    const [activeTab, setActiveTab] = useState(0)

    const loadParties = async (status: "Active" | "Archive") => {
        if (!session?.user?.id) return
        
        setIsLoading(true)
        try {
            const result = await GetUserParties(session.user.id, status)
            if (status === "Active") {
                setActiveParties(result)
            } else {
                setArchivedParties(result)
            }
        } catch (error) {
            showError("Ошибка загрузки", "Не удалось загрузить список вечеринок")
        } finally {
            setIsLoading(false)
        }
    };

    const handleAddParty = async (newParty: PartySet) => {
        if (!session?.user?.id) return
        
        setIsCreating(true)
        try {
            const createdParty = await CreateParty(session.user.id, newParty)
            if (activeTab === 0) {
                setActiveParties(prev => [createdParty, ...prev])
            } else {
                setArchivedParties(prev => [createdParty, ...prev])
            }
            
            toast({
                title: "Успешно!",
                description: "Вечеринка создана",
                status: "success",
                duration: 2000,
            })
        } catch (error) {
            showError("Ошибка создания", "Не удалось создать вечеринку")
        } finally {
            setIsCreating(false)
        }
    }

    const showError = (title: string, message: string) => {
        toast({
            title,
            description: message,
            status: "error",
            duration: 3000,
            isClosable: true,
        })
    }

    useEffect(() => {
        if (session?.user?.id) {
            loadParties(activeTab === 0 ? "Active" : "Archive");
        }
    }, [activeTab, session]); 

    return (
        <Tabs
            isFitted
            variant='soft-rounded'
            colorScheme='green'
            onChange={(index) => setActiveTab(index)}
        >
            <TabList>
                <Tab>Активные</Tab>
                <Tab>Архив</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <AddPartyButton onAddParty={handleAddParty} />
                    <PartyList parties={activeParties} isLoading={isLoading} />
                </TabPanel>
                <TabPanel>
                    <AddPartyButton onAddParty={handleAddParty} />
                    <PartyList parties={archivedParties} isLoading={isLoading} />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export default PartiesPanel;
