import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  console.log("session")
  console.log(session)
  if(!session?.user?.id){
    redirect("/auth/sign_in");
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full px-4">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
