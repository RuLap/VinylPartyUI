declare module "@/lib/session" {
    export interface SessionPayload {
      userId: string;
      expiresAt: Date;
    }
  
    export type Session = {
      user: {
        id: string;
        expires: string;
      } | null;
    };
  }