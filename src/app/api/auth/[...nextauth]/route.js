import { connect } from "@/lib/dbConndect";
import NextAuth from "next-auth";
// import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";



export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      //   input fields
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "Enter your email ",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        const user = await connect("users").findOne({ email: email });
        if (!user) {
          return null;
        }
        const isPasswordOk = await bcrypt.compare(password, user.password);
        if (isPasswordOk) {
          return user;
        }
        // my own login logic
        return null;
      },
    }),

    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token, user }) {
      if(token){
        session.role=token.role;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if(user){
        token.email=user.email,
        token.role=user.role
      }
      return token;
    },
  },
};

const handler= NextAuth(authOptions);
export { handler as GET, handler as POST };
