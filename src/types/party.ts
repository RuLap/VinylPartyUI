import { AlbumGet } from "./album";
import { UserGet } from "./user";
import { ParticipantGet } from "./participant"

export interface PartySet {
    title: string;
    date: string;
    description: string;
}

export type PartyShortGet = PartySet & {
    id: string,
}

export type PartyGet = PartySet & {
    id: string,
    participants: ParticipantGet[];
    albums: AlbumGet[];
};