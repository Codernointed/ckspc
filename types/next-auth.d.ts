import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    role?: string;
    branch?: string | null;
  }

  interface Session {
    user: {
      role: string;
      branch: string | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    branch?: string | null;
  }
}
