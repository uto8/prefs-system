'use client'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

const clients = [
  {
    id: 1,
    name: '横浜店',
    imageUrl: 'https://tailwindui.com/plus/img/logos/48x48/tuple.svg',
    lastInvoice: { date: 'December 13, 2022', dateTime: '2022-12-13', amount: '$2,000.00', status: 'Overdue' },
  },
  {
    id: 2,
    name: '名古屋店',
    imageUrl: 'https://tailwindui.com/plus/img/logos/48x48/savvycal.svg',
    lastInvoice: { date: 'January 22, 2023', dateTime: '2023-01-22', amount: '$14,000.00', status: 'Paid' },
  },
  {
    id: 3,
    name: '大阪店',
    imageUrl: 'https://tailwindui.com/plus/img/logos/48x48/reform.svg',
    lastInvoice: { date: 'January 23, 2023', dateTime: '2023-01-23', amount: '$7,600.00', status: 'Paid' },
  },
  {
    id: 4,
    name: '福岡店',
    imageUrl: 'https://tailwindui.com/plus/img/logos/48x48/reform.svg',
    lastInvoice: { date: 'January 23, 2023', dateTime: '2023-01-23', amount: '$7,600.00', status: 'Paid' },
  },
]
export default function Example() {

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">売上管理</h1>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
              {clients.map((client) => (
                <li key={client.id} className="overflow-hidden rounded-xl border border-gray-200">
                  <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                    <div className="text-sm/6 font-medium text-gray-900">{client.name}</div>
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
                        <MenuItem>
                          <a href="#" className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50">
                            Edit<span className="sr-only">, {client.name}</span>
                          </a>
                        </MenuItem>
                      </MenuItems>
                    </Menu>
                  </div>
                  <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm/6">
                    <div className="flex justify-between gap-x-4 py-3">
                      <dt className="text-gray-500">売上</dt>
                      <dd className="text-gray-700">
                        1000万円
                      </dd>
                    </div>
                    <div className="flex justify-between gap-x-4 py-3">
                      <dt className="text-gray-500">利益</dt>
                      <dd className="text-gray-700">
                        600万円
                      </dd>
                    </div>
                  </dl>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
