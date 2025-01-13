import React from 'react'
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function LoggedOutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  console.log("session")
  console.log(session)
  if(!!session?.user?.id){
    redirect("/");
  }
  return children
}
