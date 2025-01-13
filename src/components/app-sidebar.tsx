/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import { logout } from "./actions"
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function AppSidebar() {

  type NavigationItem = {
    name: string;
    url: string;
    icon: React.ElementType;
  };

  const [role, setRole] = useState();
  const [navigations, setNavigations] = useState<NavigationItem[]>([]);

  useEffect(() => {
    const fetchSession = async () => {
      const res = await getSession();
      console.log("res")
      // @ts-expect-error
      console.log(res?.user.role)
      // @ts-expect-error
      setRole(res?.user?.role);
    };
    fetchSession();
  }, []);


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useEffect(() => {
    if(role === "ADMIN"){
      setNavigations([
        { name: 'トップページ', url: '/', icon: HomeIcon },
        { name: '店舗管理', url: '/shops/list', icon: UsersIcon },
        { name: '案件管理', url: '/issues/list', icon: FolderIcon },
        { name: '営業管理', url: '/sales/list', icon: DocumentDuplicateIcon },
        { name: '入金一覧', url: '/payment/list?type=deposit', icon: FolderIcon },
        { name: '発注一覧', url: '/payment/list?type=payment', icon: DocumentDuplicateIcon },
      ])
    }else if(role === "OFFICE"){
      setNavigations([
        { name: 'トップページ', url: '/', icon: HomeIcon },
        { name: '案件管理', url: '/issues/list', icon: FolderIcon },
        { name: '営業管理', url: '/sales/list', icon: DocumentDuplicateIcon },
        { name: '入金一覧', url: '/payment/list?type=deposit', icon: FolderIcon },
        { name: '発注一覧', url: '/payment/list?type=payment', icon: DocumentDuplicateIcon },
      ])
    }else if(role === "SALES"){
      setNavigations([
        { name: '案件管理', url: '/issues/list', icon: FolderIcon },
        { name: '入金一覧', url: '/payment/list?type=deposit', icon: FolderIcon },
        { name: '発注一覧', url: '/payment/list?type=payment', icon: DocumentDuplicateIcon },
      ])
    }
  }, [role])

  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/auth/sign_in')
  }
  return (
    <Sidebar className="!bg-black">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigations.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <a className="bold text-white" href={item.url}>
                      <item.icon />
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <button className="text-white" onClick={() => {handleLogout()}}>ログアウト</button>
      </SidebarFooter>
    </Sidebar>
  )
}
