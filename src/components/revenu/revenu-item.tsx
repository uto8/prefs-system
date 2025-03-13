"use client"

import React from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

export type RevenuData = {
  title: string;
  count: number;
  unit: string;
}

export default function RevenuItem({
  data
}: {
  data: RevenuData
}) {
  console.log(data)
  return (
    <>
      <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
        <div className="text-sm/6 font-medium text-gray-900">{data.title}</div>
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
                View<span className="sr-only">, {data.count}{data.unit}</span>
              </a>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
      <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm/6">
        <div className="flex justify-between gap-x-4 py-3">
          <dt className="text-gray-500">{data.count}{data.unit}</dt>
          <dd className="text-gray-700">

          </dd>
        </div>
      </dl>
    </>
  )
}
