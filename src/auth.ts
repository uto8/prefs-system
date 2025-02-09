import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import ApiPost from "@/lib/useApi/post"
import { setCookieSession } from "./lib/auth/set-cookie-session";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    jwt({token, user}){
      if(user){
        token.id = user.id;
        token.role = user.role;
        token.companyId = user.companyId || null;
        token.officeId = user.officeId || null;
        token.saleId = user.saleId || null;
        token.idToken = user.idToken || null;
      }
      return token
    },
    session({session, token}){
      session.user.id= token.id as string;
      // session.user.role = token.role as string;
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

          setCookieSession({
            role: user.accountType,
            idToken: user.idToken,
            companyId: user.companyId || null,
            officeId: user.officeId || null,
            saleId: user.saleId || null,
          })

          return {
            id: "1",
            email: `${credentials.email}`,
            role: user.accountType,
            idToken: user.idToken,
            companyId: user.companyId || null,
            officeId: user.officeId || null,
            saleId: user.saleId || null,
          }
        }catch(e) {
          throw e;
        }
      }
    }),
  ],
})
