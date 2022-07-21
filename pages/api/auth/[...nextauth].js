import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "coco@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const url = "/api/users/signin";
        const response = await axios.post(`${process.env.NEXTAUTH_URL + url}`, {
          email: credentials.username,
          password: credentials.password,
        });

        if (response) {
          return response.data.user;
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.SECRET,
  jwt: {
    encryption: true,
  },
  database: process.env.MONGO_URL,
  callbacks: {
    async jwt({ token, user, account, profile }) {
      console.log("token==>", token);
      console.log("user==>", user);
      console.log("account==>", account);
      console.log("profile==>", profile);
      if (user) {
        token.user = user;
      }
      if (account) {
        token.accessToken = account.access_token;
      }

      return token;
    },
    async session(session, token, user) {
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log(baseUrl, "url::", url);
      return baseUrl;
    },
  },
});