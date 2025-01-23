'use client';

import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form"
import Link from "next/link";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from '@/components/ui/form';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createSale } from './actions';
import { useEffect } from 'react';
import { useAppDispatch } from '@/stores';
import { addValue } from '@/stores/reducers/saleReducer';



const formSchema = z.object({
  name: z.string().nonempty("名前は必須項目です"),
  email: z.string().email().nonempty("メールアドレスは必須項目です"),
  password: z.string().min(5, "5文字以上で入力してください").nonempty("パスワードは必須項目です"),
  phoneNumber: z.string().nonempty("電話番号は必須項目です"),
})

export default function AddSales() {
  const router = useRouter();
  const dispatch = useAppDispatch();


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
    },
  })

  useEffect(() => {
    const fetch = async () => {
      try{
        // const offices = await getOffices();
        // console.log('offices data')
        // console.log(offices)
        // dispatch(setValue(offices));
      }  catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetch()
  }, [])

  // useEffect(() => {
  //   setOffices(value)
  // }, [value])

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {

    try{
      console.log("data")
      console.log(data)
      createSale({
        name: data.name,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
        companyId: 1
      });
      dispatch(addValue({
        id: "2",
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber
      }));
      router.push('/sales/list');
    } catch (e) {
      console.error("Error creating sales representative:", e);
      // Handle error (e.g., show error message to user)
    }
  }

  return (
    <>
      <div className="sm:flex sm:items-center mb-8">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">営業追加</h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            href="#"
            onClick={router.back}
            className="block rounded-md bg-[#0054ac] px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            営業一覧に戻る
          </Link>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({field}) => (
              <FormItem>
                <FormLabel>
                営業名
                </FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem>
                <FormLabel>
                メールアドレス
                </FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({field}) => (
              <FormItem>
                <FormLabel>
                パスワード
                </FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({field}) => (
              <FormItem>
                <FormLabel>
                電話番号
                </FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-4">
            <Button type="submit">
              登録
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

