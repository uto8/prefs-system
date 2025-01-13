import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import ApiPost from "@/lib/useApi/post"

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    jwt({token, user}){
      if(user){
        token.id = user.id;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.role = (user as any).role;
      }
      return token
    },
    session({session, token}){
      session.user.id= token.id as string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (session as any).user.role = token.role as string;
      return {...session, token}
    }
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try{
          const user = await ApiPost('/auth/sign_in', {
            email: credentials.email,
            password: credentials.password
          })
          return {
            id: "1",
            email: `${credentials.email}`,
            role: user.accountType,
          }
        }catch(e) {
          throw e;
        }
      }
    }),
  ],
})
