import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User {
        id: string;
        email: string;
        name: string;
        access_token: string;
        provider: string;
        id_token: string | undefined;
    }

    interface Session extends DefaultSession {
        user: User;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        email: string;
        name: string;
        access_token: string;
        provider: string;
        id_token: string | undefined;
    }
}