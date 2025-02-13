import { UserRatingGet } from "./user"

export interface RatingCreate {
    userId: string,
    score: number
}