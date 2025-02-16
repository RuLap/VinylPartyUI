import { AlbumGet } from "./album";
import { UserGet } from "./user";

export interface PartySet {
    title: string;
    date: string;
    description: string;
}

export type PartyShortGet = PartySet & {
    id: string,
    title: string;
    date: string;
    description: string;
}

export type PartyGet = PartySet & {
    id: string;
    users: UserGet[];
    albums: AlbumGet[];
    createdAt: string;
    updatedAt: string;
};