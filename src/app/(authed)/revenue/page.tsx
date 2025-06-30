"use client"

import React from 'react'
import {ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

export default function Revenue() {

  const people = [
    { type: '名古屋店',name: '1000000円', title: '2000000円', email: '3000000円', role: '4000000円' },
    { type: '大阪店',name: '1000000円', title: '2000000円', email: '3000000円', role: '4000000円' },
    { type: '横浜店',name: '1000000円', title: '2000000円', email: '3000000円', role: '4000000円' },
  ]

  return (
    <div>
      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold text-gray-900">案件数</h1>
          </div>
        </div>
        <div className='flex justify-end mb-4'>
          <div className="relative z-[-1] flex items-center rounded-md bg-white shadow-sm md:items-stretch">
            <button
              type="button"
              className="z-0 flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
            >
              <span className="sr-only">Previous week</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
            >
              2024年
            </button>
            <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
            <button
              type="button"
              className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
            >
              <span className="sr-only">Next week</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr className="divide-x divide-gray-200">
              <th scope="col" className="py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0"></th>
              <th scope="col" className=" px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                1月
              </th>
              <th scope="col" className=" px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                2月
              </th>
              <th scope="col" className=" px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
              3月
              </th>
              <th scope="col" className="px-2 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pr-0">
              4月
              </th>
              <th scope="col" className="px-2 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pr-0">
              5月
              </th>
              <th scope="col" className=" px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                6月
              </th>
              <th scope="col" className=" px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
              7月
              </th>
              <th scope="col" className="px-2 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pr-0">
              8月
              </th>
              <th scope="col" className="px-2 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pr-0">
              9月
              </th>
              <th scope="col" className=" px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
              10月
              </th>
              <th scope="col" className="px-2 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pr-0">
              11月
              </th>
              <th scope="col" className="px-2 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pr-0">
              12月
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {people.map((person, index) => (
              <tr key={index} className="divide-x divide-gray-200">
                <td className="whitespace-nowrap py-4 text-sm font-medium text-gray-900">
                  {person.type}
                </td>
                <td className="whitespace-nowrap pl-2 py-4 text-sm text-gray-500">{person.title}</td>
                <td className="whitespace-nowrap pl-2 py-4 text-sm text-gray-500">{person.title}</td>
                <td className="whitespace-nowrap pl-2 py-4 text-sm text-gray-500">{person.email}</td>
                <td className="whitespace-nowrap pl-2 py-4 text-sm text-gray-500">{person.title}</td>
                <td className="whitespace-nowrap pl-2 py-4 text-sm text-gray-500">{person.email}</td>
                <td className="whitespace-nowrap pl-2 py-4 text-sm text-gray-500">{person.title}</td>
                <td className="whitespace-nowrap pl-2 py-4 text-sm text-gray-500">{person.email}</td>
                <td className="whitespace-nowrap pl-2 py-4 text-sm text-gray-500">{person.role}</td>
                <td className="whitespace-nowrap pl-2 py-4 text-sm text-gray-500">{person.role}</td>
                <td className="whitespace-nowrap pl-2 py-4 text-sm text-gray-500">{person.email}</td>
                <td className="whitespace-nowrap pl-2 py-4 text-sm text-gray-500">{person.role}</td>
                <td className="whitespace-nowrap pl-2 py-4 text-sm text-gray-500">{person.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
