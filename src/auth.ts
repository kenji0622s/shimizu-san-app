import NextAuth, { DefaultSession } from 'next-auth';
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { prisma } from "./lib/prisma";
import bcryptjs from "bcryptjs";
import { authConfig } from "./auth.config";

declare module "next-auth" {
  interface User {
    role: string;
  }
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
}

declare module "@auth/core/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: string;
  }
}

async function getUser(email: string) {
  // ユーザー取得関数
  return await prisma.user.findUnique({
    where: { email: email },
  });
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
        .object({ email: z.string().email(), password: z.string().min(8) })
        .safeParse(credentials);
        
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          
          const passwordsMatch = await bcryptjs.compare(
            password,
            user.password
          );
          if (passwordsMatch) return user;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
