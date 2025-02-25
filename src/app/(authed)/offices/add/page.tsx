'use client';

import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form"
import { useAppDispatch } from '@/stores';
import { addValue } from '@/stores/reducers/officeReducer';
import { createOffices } from '@/features/offices/add';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from '@/components/ui/form';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import TitleComponent from '@/components/layout/title';

const formSchema = z.object({
  name: z.string().nonempty("名前は必須項目です"),
  email: z.string().email().nonempty("メールアドレスは必須項目です"),
  password: z.string().min(5, "5文字以上で入力してください").nonempty("パスワードは必須項目です"),
  phoneNumber: z.string().nonempty("電話番号は必須項目です"),
  address: z.string().nonempty("住所は必須項目です"),
})

export default function CastAdd() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
      address: ""
    },
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try{
      dispatch(addValue({
        id: "",
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        companyId: 0
      }));
      await createOffices({
        address: data.address,
        name: data.name,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
        cognito_id: "gadsgdsa",
        companyId: 1
      })
      router.push('/offices/list');
    }catch(e) {
      throw e;
    }

  }

  return (
    <>
      <div className="sm:flex sm:items-center mb-8">
        <TitleComponent title="営業追加"/>
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
          <FormField
            control={form.control}
            name="address"
            render={({field}) => (
              <FormItem>
                <FormLabel>
                住所
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
