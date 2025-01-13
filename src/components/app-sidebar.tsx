"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
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

const items = [
  { name: 'トップページ', url: '/', icon: HomeIcon },
  { name: '店舗管理', url: '/shops/list', icon: UsersIcon },
  { name: '案件管理', url: '/issues/list', icon: FolderIcon },
  { name: '営業管理', url: '/sales/list', icon: DocumentDuplicateIcon },
  { name: '入金一覧', url: '/payment/list?type=deposit', icon: FolderIcon },
  { name: '発注一覧', url: '/payment/list?type=payment', icon: DocumentDuplicateIcon },
]

export function AppSidebar() {
  const handleLogout = async () => {
    await logout()
  }
  return (
    <Sidebar className="!bg-black">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
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
