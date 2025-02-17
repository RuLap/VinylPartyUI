import { UserRatingGet } from "./user";

export interface AlbumGet {
    id: string;
    title: string;
    artist: string;
    cover_url: string;
    average_rating?: number;
    ratings?: UserRatingGet[];
}

export interface AlbumSet {
    id: number;
    spotifyLink: string;
}

export interface AlbumCreate {
    spotifyUrl: string
}