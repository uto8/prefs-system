'use client';

import { useParams, useRouter } from 'next/navigation';
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from '@/components/ui/form';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { editOffice, getOffice } from './actions';
import TitleComponent from '@/components/layout/title';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().nonempty("名前は必須項目です"),
  email: z.string().email("メールアドレスの形式が無効です").nonempty("メールアドレスは必須項目です"),
  phoneNumber: z.string().nonempty("電話番号は必須項目です"),
})

export default function EditOffice() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const idString: string = id as string;
  const [office, setOffice] = useState({
    name: "",
    email: "",
    id: "",
    phoneNumber: ""
  })
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: office.name,
      email: office.email,
      phoneNumber: office.phoneNumber,
    }
  })

  useEffect(() => {
    if(id){
      const idString: string = id as string;
      const fetchData = async () => {
        try{
          const data = await getOffice(idString)
          setOffice(data)
        }catch(e) {
          throw e;
        }
      }
      fetchData()
    }
  }, [])

  useEffect(() => {
    if (office.name) {
      form.setValue('name', office.name); // 名前をフォームのフィールドに設定
      form.setValue('email', office.email); // メールを設定
      form.setValue('phoneNumber', office.phoneNumber); // 電話番号を設定
    }
  }, [office, form]);

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    await editOffice({
      id: idString,
      office: {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber
      }
    })
    toast({
      variant: "success",
      title: "店舗を更新しました",
    })
    router.push("/offices/list")
  }

  return (
    <>
      <div className="sm:flex sm:items-center mb-8">
        <TitleComponent title="店舗編集"/>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({field}) => (
              <FormItem>
                <FormLabel>
                店舗名
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
                  <Input {...field} type="text" />
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
