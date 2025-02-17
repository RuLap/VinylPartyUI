import { boolean } from "zod";
import { UserShortGet } from "./user";

export interface ParticipantGet {
    user: UserShortGet;
    role: string;
}