"use client";

import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from "lucide-react"
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast"
import ApiPost from '@/lib/useApi/post';

const formSchema = z.object({
  email: z.string().email().nonempty("メールアドレスは必須項目です"),
})

export default function Page() {

  const [disabled, setDisabled] = useState(false);
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })
  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try{
      setDisabled(true)
      await ApiPost("/auth/reset", {
        email: data.email
      })
      setDisabled(false)
      form.reset({email: ""})
       // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(e: any){
      const errorMessage = e.message ?? "削除に失敗しました";
      toast({
        variant: "destructive",
        title: `${errorMessage}`,
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
              <div className="mt-4 flex">
                <Button disabled={disabled} type="submit" className='w-full'>
                  {disabled&&<Loader2 className="animate-spin" />}
                  パスワードリセット用リンクを送信
                </Button>
              </div>
            </form>
          </Form>
          <div className='text-center mt-8'>
            <a href={`/auth/sign_in`} className="text-indigo-400 hover:text-indigo-900">ログインページはこちら</a>
          </div>
          </div>
        </div>
      </div>
    </>
  )
}
