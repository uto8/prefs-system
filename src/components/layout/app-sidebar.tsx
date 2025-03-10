"use client"

import { useEffect, useState } from "react";
import SidebarDesktop from "./sidebar-desktop"
import SidebarMobile from "./sidebar-mobile"
import {
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import TopBar from "./top-bar";
import { logout } from "../actions";
import { useRouter } from "next/navigation";

export type NavigationItem = {
  name: string;
  url: string;
  icon: React.ElementType;
  current: boolean;
};

export default function AppSidebar ({role: role}:{role: string | null}){
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [navigation, setNavigations] = useState<NavigationItem[]>([]);
  const currentUrl = document.location.pathname + document.location.search;

  useEffect(() => {
    if(role === "ADMIN"){
      setNavigations([
        { name: 'トップページ', url: '/', icon: HomeIcon, current: currentUrl === '/' },
        { name: '店舗管理', url: '/offices/list', icon: UsersIcon, current: currentUrl.startsWith('/offices/') },
        { name: '案件管理', url: '/issues/list', icon: FolderIcon, current: currentUrl.startsWith('/issues/') },
        { name: '営業管理', url: '/sales/list', icon: DocumentDuplicateIcon, current: currentUrl.startsWith('/sales/') },
        { name: '入金一覧', url: '/payment/list?type=deposit', icon: FolderIcon, current: currentUrl.startsWith('/payment/list?type=deposit') },
        { name: '発注一覧', url: '/payment/list?type=payment', icon: DocumentDuplicateIcon, current: currentUrl.startsWith('/payment/list?type=payment') },
        { name: '補修一覧', url: '/payment/list?type=repair', icon: DocumentDuplicateIcon, current: currentUrl.startsWith('/payment/list?type=repair') },
      ])
    }else if(role === "OFFICE"){
      setNavigations([
        { name: 'トップページ', url: '/', icon: HomeIcon, current: currentUrl === '/' },
        { name: '案件管理', url: '/issues/list', icon: FolderIcon, current: currentUrl.startsWith('/issues/') },
        { name: '営業管理', url: '/sales/list', icon: DocumentDuplicateIcon, current: currentUrl.startsWith('/sales/') },
        { name: '入金一覧', url: '/payment/list?type=deposit', icon: FolderIcon, current: currentUrl.startsWith('/payment/list?type=deposit') },
        { name: '発注一覧', url: '/payment/list?type=payment', icon: DocumentDuplicateIcon, current: currentUrl.startsWith('/payment/list?type=payment') },
        { name: '補修一覧', url: '/payment/list?type=repair', icon: DocumentDuplicateIcon, current: currentUrl.startsWith('/payment/list?type=repair') },
      ])
    }else if(role === "SALES"){
      setNavigations([
        { name: '案件管理', url: '/issues/list', icon: FolderIcon, current: currentUrl.startsWith('/issues/') },
        { name: '入金一覧', url: '/payment/list?type=deposit', icon: FolderIcon, current: currentUrl.startsWith('/payment/list?type=deposit') },
        { name: '発注一覧', url: '/payment/list?type=payment', icon: DocumentDuplicateIcon, current: currentUrl.startsWith('/payment/list?type=payment') },
        { name: '補修一覧', url: '/payment/list?type=repair', icon: DocumentDuplicateIcon, current: currentUrl.startsWith('/payment/list?type=repair') },
      ])
    }
  }, [role])

  const router = useRouter();

  const handleLogout = async ():Promise<void> => {
    try{
      await logout();
      router.push('/auth/sign_in')
    }catch(e) {
      throw e;
    }
  }

  return <>
    <SidebarMobile
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      navigation={navigation}
      handleLogout={handleLogout}
    />

    {/* Static sidebar for desktop */}
    <SidebarDesktop
      navigation={navigation}
      handleLogout={handleLogout}
    />

    <TopBar setSidebarOpen={setSidebarOpen}/>

  </>
}
