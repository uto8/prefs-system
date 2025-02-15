"use client";

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { loginWithCredentials } from './actions';
import { Input } from '@/components/ui/input';
import { Loader2 } from "lucide-react"
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  email: z.string().email().nonempty("メールアドレスは必須項目です"),
  password: z.string().min(5, "5文字以上で入力してください").nonempty("パスワードは必須項目です"),
})

export default function SignIn() {

  const [disabled, setDisabled] = useState(false);
  const { toast } = useToast()

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try{
      setDisabled(true)
      await loginWithCredentials({
        email: data.email,
        password: data.password,
      });
      router.push('/')
    }catch(e){
      toast({
        variant: "destructive",
        title: "ログインエラー",
      })
      setDisabled(false)
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
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-4"
            >
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
              <div className="mt-4 flex">
                <Button disabled={disabled} type="submit" className='w-full'>
                  {disabled&&<Loader2 className="animate-spin" />}
                  ログイン
                </Button>
              </div>
            </form>
          </Form>
          </div>
        </div>
      </div>
    </>
  )
}
