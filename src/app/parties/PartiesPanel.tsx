"use client"

import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { GetActiveParticipationParties, GetArchiveParticipationParties } from "./actions";
import { PartyGet } from "@/types/party";
import PartyList from "./PartyList";
import { AddPartyButton } from "./AddPartyButton";
import { useEffect, useState } from "react";

const PartiesPanel = () => {
    const [partyData, setPartyData] = useState<PartyGet[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    const loadParties = async () => {
        setIsLoading(true);
        try {
            let result: PartyGet[]
            if(activeTab == 0) {
                result = await GetActiveParticipationParties("")
            }
            else {
                result = await GetArchiveParticipationParties("")
            }
            setPartyData(result);
        } catch (error) {
            console.error("Ошибка при загрузке данных:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddParty = async (newParty: PartyGet) => {
        try {
            // Добавляем вечеринку через ваш API или функцию
            //await addParty(newParty);

            // После добавления обновляем состояние partyData
            setPartyData((prevParties) => [...prevParties, newParty]);
        } catch (error) {
            console.error("Ошибка при добавлении вечеринки:", error);
        }
    };

    useEffect(() => {
        loadParties();
      }, [activeTab]); 

    return (
        <Tabs
            isFitted
            variant='soft-rounded'
            colorScheme='green'
            onChange={(index) => setActiveTab(index)}
        >
            <TabList>
                <Tab>Текущие</Tab>
                <Tab>Архив</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <AddPartyButton />
                    <PartyList parties={partyData} isLoading={isLoading} />
                </TabPanel>
                <TabPanel>
                    <AddPartyButton />
                    <PartyList parties={partyData} isLoading={isLoading} />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export default PartiesPanel;
