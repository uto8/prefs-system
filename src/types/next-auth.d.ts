import NextAuth from "next-auth"


declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
    interface Session {
    user: {
      id: string;
      email: string;
      role: string;
      saleId: number | null;
      officeId: number | null;
      companyId: number | null;
      idToken: string | null;
    };
  }

  interface User {
    id: string;
    email: string;
    role: string;
    saleId: number | null;
    officeId: number | null;
    companyId: number | null;
    idToken: string | null;
  }
}

export default NextAuth()
