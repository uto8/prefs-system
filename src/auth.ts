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
        token.receptionId = user.receptionId || null;
        token.userId = user.userId || null;
        token.idToken = user.idToken || null;
      }
      return token
    },
    session({session, token}){
      session.user = {
        id: token.id as string,
        role: token.role as string,
        companyId: token.companyId as number | null,
        officeId: token.officeId as number | null,
        saleId: token.saleId as number | null,
        receptionId: token.receptionId as number | null,
        userId: token.userId as string | null,
        email: token.email as string,
        idToken: token.idToken as string | null,
        emailVerified: null,
      };
      return session
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

          if(!user.idToken){
            return null
          }

          // userIdを決定（役割に応じて適切なIDを設定）
          let userId = null;
          if (user.accountType === 'ADMIN') {
            userId = user.companyId;
          } else if (user.accountType === 'OFFICE') {
            userId = user.officeId;
          } else if (user.accountType === 'SALES') {
            userId = user.saleId;
          } else if (user.accountType === 'RECEPTION') {
            userId = user.receptionId;
          }

          setCookieSession({
            role: user.accountType,
            idToken: user.idToken,
            companyId: user.companyId || null,
            officeId: user.officeId || null,
            saleId: user.saleId || null,
            receptionId: user.receptionId || null,
            userId: userId ? userId.toString() : null
          })

          return {
            id: "1",
            email: `${credentials.email}`,
            role: user.accountType,
            idToken: user.idToken,
            companyId: user.companyId || null,
            officeId: user.officeId || null,
            saleId: user.saleId || null,
            receptionId: user.receptionId || null,
            userId: userId ? userId.toString() : null,
          }
        }catch(e) {
          throw new Error("Invalid email or password");
        }
      }
    }),
  ],
})
