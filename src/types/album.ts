import { UserRatingGet } from "./user";

export interface AlbumGet {
    id: string;
    title: string;
    artist: string;
    imageUrl: string;
    rating?: number;
    ratedBy?: UserRatingGet[];
}

export interface AlbumSet {
    id: number;
    spotifyLink: string;
}

export interface AlbumCreate {
    spotifyUrl: string
}