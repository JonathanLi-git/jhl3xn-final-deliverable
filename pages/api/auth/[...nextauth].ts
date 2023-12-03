import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login'
  },
  secret: process.env.AUTH_SECRET,
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
        if(data.data[0].length === 0)
          return null
        const user = {
          _id: data.data[0][0].personId,
          name: data.data[0][0].personId,
          email: data.data[0][0].personId
        }
        return user
        console.log(data.data[0][0])
        return data.data[0][0];
      },
    }),
  ],
};

export default NextAuth(authOptions)


