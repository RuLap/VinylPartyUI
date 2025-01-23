export interface PartyGet {
    id: string;
    name: string;
    date: string;
    users: [];
    albums: [];
}

export interface PartySet {
    name: string;
    date: string;
}