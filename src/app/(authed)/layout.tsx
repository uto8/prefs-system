import AppSidebar from '@/components/layout/app-sidebar'
import { getCookieSession } from '@/lib/auth/get-cookie-session';

export type NavigationItem = {
  name: string;
  url: string;
  icon: React.ElementType;
  current: boolean;
};

export default async function Layout({ children }: { children: React.ReactNode }) {
  const {role} = await getCookieSession();
  return (
    <>
      <div>
        <AppSidebar role={role}/>

        <div className="lg:pl-72">
          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </>
  )
}
