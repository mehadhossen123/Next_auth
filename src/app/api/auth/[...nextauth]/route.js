import NextAuth from "next-auth";
// import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

const userList=[
    {name:"mehad",password:"1234"},
    {name:"jihad ",password:"5678"},
    {name:"mithu",password:"9101"}
]

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
    //   input fields
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Enter your name " },
        password: { label: "Password", type: "password",placeholder:"Enter your password" },
        secretCode:{label:"Secret code",type:"text",placeholder:"Enter your code "}
      },
      async authorize(credentials, req) {
        const {username,password,secretCode}=credentials;
        const user=userList.find((u)=>u.name==username);
        if(!user){
            return null;
        }
        const isPasswordOk=user.password==password;
        if(isPasswordOk){
            return user;
        }
        // my own login logic
        return null
       
      },
    }),

    // ...add more providers here
  ],
};

const handler= NextAuth(authOptions);
export { handler as GET, handler as POST };
