export interface UserGet {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
}

export interface UserSet {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface UserRatingGet {
    id: number;
    firstName: string;
    lastName: string;
    avatar: string;
    rating: number;
}