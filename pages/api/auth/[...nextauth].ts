import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectAPI } from "@/pages/__shared/services";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        const { email, password } = credentials;
        const res = await connectAPI("/login", "POST", {
          email,
          password,
        });

        if (res.status === 200) {
          const { email, id, access_token, username } = res.data.data;
          return {
            name: username,
            email,
            id,
            access_token,
          };
        }
        return null;
      },
    }),
  ],

  secret: process.env.JWT_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT - user", user);
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("SESSION - user", session, token);
      return session;
    },
  },
});
