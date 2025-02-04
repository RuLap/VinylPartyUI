import { AlbumGet } from "./album";
import { UserGet } from "./user";

export interface PartyGet {
    id: number;
    name: string;
    date: string;
    users: UserGet[];
    albums: AlbumGet[];
}

export interface PartySet {
    id: number;
    name: string;
    date: string;
}