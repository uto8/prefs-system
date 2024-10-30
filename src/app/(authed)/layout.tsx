'use client'
import { useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react'
import {
  Bars3Icon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { useRouter } from "next/navigation";
import { Transition } from '@headlessui/react'


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter();
  const [dynamicSegment, setDynamicSegment] = useState('');
  const [type, setType] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // クライアントサイドでのみ実行される
      const segments = window.location.href.split('/');
      const segment = segments.length > 3 ? segments[3] : '';
      setDynamicSegment(segment);
    }
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setType(searchParams.get("type"));
  }, []);

  const [show, setShow] = useState(true)

  const navigation = [
    { name: 'トップページ', href: '/', icon: HomeIcon, current: dynamicSegment == '' },
    { name: '店舗管理', href: '/shops/list', icon: UsersIcon, current: dynamicSegment == 'shops' },
    { name: '案件管理', href: '/issues/list', icon: FolderIcon, current: dynamicSegment == 'issues' },
    { name: '営業管理', href: '/sales/list', icon: DocumentDuplicateIcon, current: dynamicSegment == 'sales' },
    { name: '入金一覧', href: '/payment/list?type=deposit', icon: FolderIcon, current: (dynamicSegment == 'payment')&& (type=='deposit') },
    { name: '発注一覧', href: '/payment/list?type=payment', icon: DocumentDuplicateIcon, current: (dynamicSegment == 'payment')&& (type=='payment') },
  ]
  const handleLogout = async () => {
    router.push('/auth/sign_in')
  }
  return (

      <div>
        {/* アラート　状態管理で閉じたら閉じたっきりにする */}
        <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition show={show}>
            <div className="bg-red-50 ring-red-600/20 pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg shadow-lg ring-1 ring-opacity-5 transition data-[closed]:data-[enter]:translate-y-2 data-[enter]:transform data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in data-[closed]:data-[enter]:sm:translate-x-2 data-[closed]:data-[enter]:sm:translate-y-0">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                  <XCircleIcon aria-hidden="true" className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm text-red-700 font-bold mb-4">未入金の支払いがあります</p>
                    <div>
                      <a href="/payment/list?type=deposit" className='text-sm font-medium text-red-700'>案件番号#1111　→</a>
                    </div>
                    <div>
                      <a href="/payment/list?type=deposit" className='text-sm font-medium text-red-700'>案件番号#2222　→</a>
                    </div>
                    <div>
                      <a href="/payment/list?type=deposit" className='text-sm font-medium text-red-700'>案件番号#3333　→</a>
                    </div>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setShow(false)
                      }}
                      className="inline-flex rounded-md bg-white bg-red-200 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon aria-hidden="true" className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
      {/* アラート */}
        <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6 text-white" />
                  </button>
                </div>
              </TransitionChild>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10">
                <div className="flex h-16 shrink-0 items-center">

                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <a
                              href={item.href}
                              className={classNames(
                                item.current
                                  ? 'bg-gray-800 text-white'
                                  : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                              )}
                            >
                              <item.icon aria-hidden="true" className="h-6 w-6 shrink-0" />
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li className="mt-auto">
                      <a
                        href="#"
                        onClick={handleLogout}
                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                      >
                        ログアウト
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
            <div className="flex h-16 shrink-0 items-center">

            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-gray-800 text-white'
                              : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                            'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                          )}
                        >
                          <item.icon aria-hidden="true" className="h-6 w-6 shrink-0" />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="-mx-6 mt-auto">
                  <a
                    href="#"
                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
                  >
                    {/* <img
                      alt=""
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="h-8 w-8 rounded-full bg-gray-800"
                    /> */}
                    {/* <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">Tom Cook</span> */}
                  </a>
                </li>
                <li className="mt-auto">
                  <a
                    href="#"
                    onClick={handleLogout}
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                  >
                    ログアウト
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-400 lg:hidden">
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-white">財務管理</div>
          <a href="#">
            <span className="sr-only">Your profile</span>
            {/* <img
              alt=""
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              className="h-8 w-8 rounded-full bg-gray-800"
            /> */}
          </a>
        </div>

        <main className="py-10 lg:pl-72">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
  );
}
