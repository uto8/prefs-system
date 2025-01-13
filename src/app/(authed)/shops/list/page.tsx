"use client"

// import { getOffices } from "@/features/offices/list";
// import { useAppDispatch, useAppSelector } from "@/stores";
// import { setValue } from "@/stores/reducers/officeReducer";
// import { useEffect } from "react";


export default function ShopList() {
  // const { value } = useAppSelector((state) => state.offices);
  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   if (value.length === 0) {
  //     const fetch = async () => {
  //         try{
  //           const offices = await getOffices();
  //           dispatch(setValue(offices));
  //         }  catch (error) {
  //         console.error('Error fetching data:', error);
  //       }
  //     }
  //     fetch()
  //   }
  // },[value, dispatch])
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">店舗一覧</h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <a
            href="/shops/add"
            className="block rounded-md px-3 py-2 text-center text-sm font-semibold text-white shadow-sm bg-[#0054ac] focus-visible:outline focus-visible:outline-2"
          >
            店舗追加
          </a>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    店舗名
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    メールアドレス
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    住所
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Role
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                    名古屋店
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">nagoya@gmail.com</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">09012345678</td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <a href="/shops/1/edit" className="text-indigo-600 hover:text-indigo-900">
                      編集<span className="sr-only">, 名前</span>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
