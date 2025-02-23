"use client";

import { Tabs } from "@chakra-ui/react";
import { GetUserParties, CreateParty } from "./actions";
import { PartySet, PartyShortGet } from "@/types/party";
import PartyList from "./PartyList";
import { AddPartyButton } from "./AddPartyButton";
import { useEffect, useState } from "react";
import { useSession } from "../../hooks/use-session";
import { toaster } from "@/components/ui/toaster"

const PartiesPanel = () => {
    const { data: session } = useSession();
    const [activeParties, setActiveParties] = useState<PartyShortGet[]>([]);
    const [archivedParties, setArchivedParties] = useState<PartyShortGet[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [panelValue, setPanelValue] = useState<string | null>("Active")

    const loadParties = async (status: "Active" | "Archive") => {
        if (!session?.user?.id) return;

        setIsLoading(true);
        try {
            const result = await GetUserParties(session.user.id, status);
            if (status === "Active") {
                setActiveParties(result);
            } else {
                setArchivedParties(result);
            }
        } catch (error) {
            showError("Ошибка загрузки", "Не удалось загрузить список вечеринок");
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddParty = async (newParty: PartySet) => {
        if (!session?.user?.id) return;

        setIsCreating(true);
        try {
            const createdParty = await CreateParty(session.user.id, newParty);
            if (panelValue === "Active") {
                setActiveParties(prev => [createdParty, ...prev]);
            } else {
                setArchivedParties(prev => [createdParty, ...prev]);
            }

            toaster.create({
                title: "Успешно!",
                description: "Вечеринка создана",
                type: "success",
                duration: 2000,
            });
        } catch (error) {
            showError("Ошибка создания", "Не удалось создать вечеринку");
        } finally {
            setIsCreating(false);
        }
    };

    const showError = (title: string, message: string) => {
        toaster.create({
            title,
            description: message,
            type: "error",
            duration: 3000,
        });
    };

    useEffect(() => {
        if (session?.user?.id) {
            loadParties(panelValue as "Active" | "Archive");
        }
    }, [panelValue, session]);

    return (
        <Tabs.Root
            variant={"subtle"}
            onValueChange={(e) => setPanelValue(e.value)}
            defaultValue={"Active"}
        >
            <Tabs.List
                w={"100%"}
                justifyContent={"center"}
                display={"flex"}
            >
                <Tabs.Trigger value="Active">
                    Активные
                </Tabs.Trigger>
                <Tabs.Trigger value="Archive">
                    Архив
                </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="Active">
                <AddPartyButton onAddParty={handleAddParty} />
                <PartyList parties={activeParties} isLoading={isLoading} />
            </Tabs.Content>
            <Tabs.Content value="Archive">
                <AddPartyButton onAddParty={handleAddParty} />
                <PartyList parties={archivedParties} isLoading={isLoading} />
            </Tabs.Content>
        </Tabs.Root>
    );
};

export default PartiesPanel;