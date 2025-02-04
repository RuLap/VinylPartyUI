import { UserRatingGet } from "./user";

export interface AlbumGet {
    id: number;
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