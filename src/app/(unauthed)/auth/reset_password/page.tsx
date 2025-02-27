"use client";

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from "lucide-react"
import { useEffect, useState } from 'react';
import { useToast } from "@/hooks/use-toast"
import ApiPost from '@/lib/useApi/post';

const formSchema = z.object({
  code: z.string().nonempty("コードは必須項目です"),
  password: z.string().min(5, "5文字以上で入力してください").nonempty("パスワードは必須項目です"),
})

export default function Page() {

  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(false);
  const { toast } = useToast()

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      password: "",
    },
  })


  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setEmail(searchParams.get("email")??"");
  }, []);

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try{
      setDisabled(true)
      await ApiPost(`/auth/reset/${email}/password`, {
        resetCode: data.code,
        newPassword: data.password,
      })
      setDisabled(false)
      toast({
        variant: "success",
        title: `パスワードを更新しました`,
      })
      router.push("/auth/sign_in")
       // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(e: any){
      const errorMessage = "失敗しました";
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
                name="code"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>
                    リセットコード
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
                  パスワードを変更
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
