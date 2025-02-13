import { AlbumGet } from "./album";
import { UserGet } from "./user";

export interface PartyGet {
    id: string;
    name: string;
    description: string;
    date: string;
    users: UserGet[];
    albums: AlbumGet[];
}

export interface PartySet {
    id: number;
    name: string;
    date: string;
}