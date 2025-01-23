export interface ReviewGet {
    id: string;
    rating: number;
    comment: string;
}

export interface ReviewSet {
    id: string;    
    albumId: string;
    userId: string;
    rating: number;
    comment: string;
}