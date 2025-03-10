"use client"

import { Dispatch, SetStateAction, useEffect } from "react"
import { Bars3Icon, BellIcon } from "@heroicons/react/24/outline"
import { getNotifications } from "./actions"
import { toast, Toaster } from 'sonner';
import { useAppDispatch, useAppSelector } from "@/stores";
import { setValue } from "@/stores/reducers/notificationReducer";
import { useRouter } from "next/navigation";


export default function TopBar ({
  setSidebarOpen: setSidebarOpen,
}: {
  setSidebarOpen: Dispatch<SetStateAction<boolean>>,
}) {
  const { value } = useAppSelector((state) => state.notifications);
  const dispatch = useAppDispatch();
  const router = useRouter()

  async function fetchData() {
    const result = await getNotifications();
    dispatch(setValue(result));
  }
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    console.log("==")
    displayNotifications()
  }, [value]);

  const displayNotifications = () => {
    value.map((notification) => {
      toast.error(
        <div>
          <strong>{notification.issue?.issueCode}</strong>
          未入金の案件があります
        </div>,{
          action: {
            label: 'こちら',
            onClick: () => {
              router.push(`/payment/list?type=deposit&issue_id=${notification.issue.id}`)
            }
          },
        }
      )
    })
  }
  return<>
    <div className="lg:pl-72">
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button type="button" onClick={() => setSidebarOpen(true)}  className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon aria-hidden="true" className="size-6" />
      </button>

      {/* Separator */}
      <div aria-hidden="true" className="h-6 w-px bg-gray-900/10 lg:hidden" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <form action="#" method="GET" className="grid flex-1 grid-cols-1">
          {/* <input
            name="search"
            type="search"
            placeholder="Search"
            aria-label="Search"
            className="col-start-1 row-start-1 block size-full bg-white pl-8 text-base text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm/6"
          /> */}
          {/* <MagnifyingGlassIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 size-5 self-center text-gray-400"
          /> */}
        </form>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <button onClick={()=>{displayNotifications()}} type="button" className="relative -m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
            <span className="sr-only">View notifications</span>
            <BellIcon aria-hidden="true" className="size-6" />
            {value.length !== 0 && <span
              className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white"
            >
              {value.length}
            </span>}
          </button>


          {/* Separator */}
          <div aria-hidden="true" className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" />
        </div>
      </div>
    </div>
    <Toaster position="top-right" richColors/>
    </div>
  </>
}
