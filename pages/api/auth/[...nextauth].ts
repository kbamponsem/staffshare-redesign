import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],

  secret: process.env.JWT_SECRET,
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.id = user.id;
        token.email = user.email;
        token.access_token = user as any;
        token.provider = account.provider;
        token.id_token = account.id_token;
      }
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    }
  }
});
