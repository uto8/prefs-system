"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from '@/components/ui/form';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { createReception } from '@/app/(authed)/receptions/add/actions';



const formSchema = z.object({
  name: z.string().nonempty("名前は必須項目です"),
  email: z.string().email().nonempty("メールアドレスは必須項目です"),
  password: z.string().min(5, "5文字以上で入力してください").nonempty("パスワードは必須項目です"),
  phoneNumber: z.string().nonempty("電話番号は必須項目です"),
})

export default function CreateReceptionForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const officeId = Number(searchParams.get('office_id')) ?? null;
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
    },
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try{
      const body = {
        name: data.name,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
        ...(officeId && { "officeId": officeId }),
      }
      await createReception(body);
      toast({
        variant: "success",
        title: "受付を作成しました",
      })
      router.push('/receptions/list');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      const errorMessage = e.message ?? "受付更新に失敗しました";
      toast({
        variant: "destructive",
        title: `${errorMessage}`,
      })
    }
  }

  return (
    <>
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
                受付名
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
