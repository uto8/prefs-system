'use client';

import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form"
import { createOffices } from '@/features/offices/add';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from '@/components/ui/form';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';

const formSchema = z.object({
  name: z.string().nonempty("名前は必須項目です"),
  officeCode: z.string().nonempty("店舗番号は必須項目です"),
  email: z.string().email().nonempty("メールアドレスは必須項目です"),
  password: z.string().min(8, "8文字以上で入力してください").nonempty("パスワードは必須項目です"),
  phoneNumber: z.string().nonempty("電話番号は必須項目です"),
  address: z.string().nonempty("住所は必須項目です"),
  isFranchise: z.boolean(),
})

export default function CreateOfficeForm({companyId}: {companyId: number}) {
  const router = useRouter();
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      officeCode: "",
      email: "",
      password: "",
      phoneNumber: "",
      address: "",
      isFranchise: false
    },
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try{
      await createOffices({
        address: data.address,
        name: data.name,
        officeCode: data.officeCode,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
        // Todo cognito_idの設定
        cognito_id: "gadsgdsa",
        companyId: companyId,
        isFranchise: data.isFranchise
      })
      toast({
        variant: "success",
        title: "店舗を作成しました",
      })
      router.push('/offices/list');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(e: any) {
      const errorMessage = e.message ?? "店舗作成に失敗しました";
      toast({
        variant: "destructive",
        title: `${errorMessage}`,
      })
      throw e;
    }

  }

  return (
    <>
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
            name="officeCode"
            render={({field}) => (
              <FormItem>
                <FormLabel>
                店舗番号
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
          <div className='my-4'>
            <FormField
              control={form.control}
              name="isFranchise"
              render={() => (
              <FormItem>
                <FormField
                    control={form.control}
                    name="isFranchise"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={1}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange(true)
                                  : field.onChange(false)
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {"加盟店"}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                </FormItem>
              )}
            />
          </div>
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
