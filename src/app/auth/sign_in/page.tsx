"use client";

import { setCookie } from '@/lib/useCookie/setCookie';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  email: string,
  password: string,
}

export default function Example() {

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async () => {
    try{
      setCookie('accessToken')
      router.push('/');
    }catch(e){
      throw e;
    }
  }

  return (
    <>
      <div
        className="flex h-screen flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8"
        style={{
          background: "transparent linear-gradient(180deg, #45b0e6, #6ca) 0 0 no-repeat padding-box"
        }}
      >

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                   メールアドレス
              </label>
              <div className="mt-2.5">
                <input
                  id="email"
                  type="email"
                  {...register("email", { required: true })}
                  autoComplete="email"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                  {errors.email && <div className="mt-4 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span className="font-medium">メールアドレスを入力してください</span>
                  </div>}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="shop" className="block text-sm font-semibold leading-6 text-gray-900">
                パスワード
                </label>
                <div className="mt-2.5">
                  <input
                    id="password"
                    type="password"
                    autoComplete="email"
                    {...register("password", { required: true })}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.password && <div className="mt-4 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span className="font-medium">パスワードを入力してください</span>
                  </div>}
                </div>
              </div>


              {/* {
                error !== '' &&<div className="mt-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">ログイン情報が間違っています</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                  <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                </span>
              </div>
              } */}

              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  onClick={()=>{router.push('/');}}
                  className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 rounded-md w-full bg-primary-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                  ログイン
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
