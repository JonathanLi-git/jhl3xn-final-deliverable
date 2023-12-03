import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            personId: string
        } & DefaultSession["user"]
    }
}