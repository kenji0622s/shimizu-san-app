import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  callbacks: {
    jwt({ token, user }) {
      if (user && user.id) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id ?? "";
        session.user.name = token.name ?? "";
        session.user.email = token.email ?? "";
        session.user.role = token.role ?? "";
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      enum Role {
        ADMIN = "ADMIN",
        USER = "USER",
        GUEST = "GUEST",
      }

      const isLoggedIn = !!auth?.user;
      const userRole = auth?.user?.role;

      // 管理者用ページ
      const adminPaths = ["/manage"];
      // ユーザー用ページ(管理者も可)
      const userPaths = ["/dashboard", "/mypage", "/myposts"];
      //ログイン必須ページ
      const protectedPaths = [...adminPaths, ...userPaths];

      const isProtectedPath = protectedPaths.some((path) =>
        nextUrl.pathname.startsWith(path)
      );

      // 管理者用ページの認可
      const isAdminPath = adminPaths.some((path) =>
        nextUrl.pathname.startsWith(path)
      );
      if (isAdminPath) {
        if (userRole === Role.ADMIN) return true;

        if (isLoggedIn){
          return Response.redirect(new URL("/dashboard", nextUrl));
        }else{ 
          return Response.redirect(new URL("/", nextUrl));
        }
      }

      // ユーザー用ページの認可
      const isUserPath = userPaths.some((path) =>
        nextUrl.pathname.startsWith(path)
      );
      if (isUserPath) {
        if (userRole === Role.USER || userRole === Role.ADMIN) return true;
        return Response.redirect(new URL("/", nextUrl));
      }

      // ログイン必須ページの確認
      if (isProtectedPath) {
        if (isLoggedIn) return true;
        return Response.redirect(new URL("/login", nextUrl));
      }

      // ログイン済みユーザーのリダイレクト
      if (isLoggedIn && nextUrl.pathname === "/login") {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      // それ以外のリクエストは許可
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
  providers: [],
} satisfies NextAuthConfig;
