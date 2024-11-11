'use client'

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useRouter } from "next/navigation";

const people = [
  { type: '案件数',name: '1000000円', title: '2000000円', email: '3000000円', role: '4000000円' },
  { type: '契約数',name: '1000000円', title: '2000000円', email: '3000000円', role: '4000000円' },
  { type: '契約額',name: '1000000円', title: '2000000円', email: '3000000円', role: '4000000円' },
  { type: '入金額',name: '1000000円', title: '2000000円', email: '3000000円', role: '4000000円' },
  { type: '売上',name: '1000000円', title: '2000000円', email: '3000000円', role: '4000000円' },
  { type: '出金額',name: '1000000円', title: '2000000円', email: '3000000円', role: '4000000円' },
  { type: '粗利',name: '1000000円', title: '2000000円', email: '3000000円', role: '4000000円' },
  { type: '平均単価',name: '1000000円', title: '2000000円', email: '3000000円', role: '4000000円' },
  { type: '自社工事売上',name: '1000000円', title: '2000000円', email: '3000000円', role: '4000000円' },
  { type: '予定出金額',name: '1000000円', title: '2000000円', email: '3000000円', role: '4000000円' },
  { type: '予定入金額',name: '1000000円', title: '2000000円', email: '3000000円', role: '4000000円' },
]

export default function Example() {

  const router = useRouter();

  return (
    <div className="sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">売上管理</h1>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">

          <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
              {people.map((client, index) => (
                <li onClick={()=>(router.push('/revenue'))} key={index} className="overflow-hidden rounded-xl border border-gray-200">
                  <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                    <div className="text-sm/6 font-medium text-gray-900">{client.type}</div>
                    <Menu as="div" className="relative ml-auto">
                      <MenuButton className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Open options</span>
                        {/* <EllipsisHorizontalIcon aria-hidden="true" className="h-5 w-5" /> */}
                      </MenuButton>
                      <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                      >
                        <MenuItem>
                          <a href="#" className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50">
                            View<span className="sr-only">, {client.name}</span>
                          </a>
                        </MenuItem>
                      </MenuItems>
                    </Menu>
                  </div>
                  <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm/6">
                    <div className="flex justify-between gap-x-4 py-3">
                      <dt className="text-gray-500">600万円</dt>
                      <dd className="text-gray-700">

                      </dd>
                    </div>
                  </dl>
                </li>
              ))}
            </ul>
        </div>
      </div>
    </div>
  )
}
