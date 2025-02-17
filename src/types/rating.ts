import { UserRatingGet } from "./user"

export interface RatingCreate {
    albumId: string,
    userId: string,
    score: number
}