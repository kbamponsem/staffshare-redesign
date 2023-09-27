import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectAPI } from "../services";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        const { email, password } = credentials;
        const res = await connectAPI("/credential_login", "POST", {
          email,
          password,
        });


        // console.log("res", res.data);

        if (res.status === 200) {
          const { email, id, access_token, username } = res.data.data;
          return {
            name: username,
            email,
            id,
            access_token,
          };
        }
        return res.data.message;
      },
    }),
  ],

  secret: process.env.JWT_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      // console.log("{jwt}", token, user, account);
      if (account) {
        token.id = user.id;
        token.email = user.email;
        token.access_token = user as any;
        token.provider = account.provider;
      }
      return { ...token, ...user };
    },
    async session({ session, token }) {
      console.log("session", session);
      console.log("token", token);
      session.user = token;
      return session;
    }
  },
  pages: {
    error: "/login",
    signIn: "/server/login",
    signOut: "/server/login",
  },
  events: {
    async signIn(message) {
      // console.log("signIn", message);
      // Extract user information from message
      const { email, id } = message.user;
      // Create or update user in database
      const res = await connectAPI("/check_oauth_user_exists", "POST", {
        email,
        oauth_id: id,
        provider: 'google',
        username: ''
      });

      console.log("res", res);
    }
  }
});
