import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login'
  },
  secret: process.env.AUTH_SECRETy,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      type: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log(credentials)
        const response = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          body: JSON.stringify({
            params: [credentials?.username, credentials?.password],
            method: "login",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log(data)
        if (data.data[0].length > 0) {
          return data.data[0];
        }
        return null;
      },
    }),
  ],
};

export default NextAuth(authOptions)


