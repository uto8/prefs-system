"use client"

import AppSidebar from '@/components/layout/app-sidebar'
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getSession } from './actions';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

export type NavigationItem = {
  name: string;
  url: string;
  icon: React.ElementType;
  current: boolean;
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  async function fetchData() {
    const result = await getSession();
    setSession(result);
    if(!result?.user?.idToken){
      redirect("/auth/sign_in");
    }
  }
  useEffect(() =>{
    fetchData()
  }, [])
  return (
    <>
      <div>
        <AppSidebar role={session?.user.role?? ""}/>

        <div className="lg:pl-72">

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8"><SessionProvider children={children}/></div>
          </main>
        </div>
      </div>
    </>
  )
}
