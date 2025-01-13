import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import ApiPost from "@/lib/useApi/post"

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    jwt({token, user}){
      if(user){
        token.id = user.id
      }
      return token
    },
    session({session, token}){
      session.user.id= token.id as string;
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
            email: "yuyutonomura@gmail,com",
            role: user.accountType,
          }
        }catch(e) {
          throw e;
        }
      }
    }),
  ],
})
