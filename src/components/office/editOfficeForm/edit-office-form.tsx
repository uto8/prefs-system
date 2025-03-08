'use client';

import { useParams, useRouter } from 'next/navigation';
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from '@/components/ui/form';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { editOffice } from '@/app/(authed)/offices/[id]/edit/actions';
import { Checkbox } from '@/components/ui/checkbox';
import { Office } from '@/types/Office';

const formSchema = z.object({
  name: z.string().nonempty("名前は必須項目です"),
  officeCode: z.string().nonempty("店舗番号は必須項目です"),
  email: z.string().email("メールアドレスの形式が無効です").nonempty("メールアドレスは必須項目です"),
  phoneNumber: z.string().nonempty("電話番号は必須項目です"),
  isFranchise: z.boolean()
})

export default function EditOfficeForm({
  companyId,
  office
}: {
  companyId: number;
  office: Office;
}) {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const idString: string = id as string;
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: office.name,
      officeCode: office.officeCode,
      email: office.email,
      phoneNumber: office.phoneNumber,
      isFranchise: office.isFranchise
    }
  })

  useEffect(() => {
    if (office.name) {
      form.setValue('name', office.name); // 名前をフォームのフィールドに設定
      form.setValue('officeCode', office.officeCode); // 名前をフォームのフィールドに設定
      form.setValue('email', office.email); // メールを設定
      form.setValue('phoneNumber', office.phoneNumber); // 電話番号を設定
    }
  }, [office, form]);

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try{
      await editOffice({
        id: idString,
        office: {
          name: data.name,
          officeCode: data.officeCode,
          email: data.email,
          phoneNumber: data.phoneNumber,
          isFranchise: data.isFranchise
        }
      })
      toast({
        variant: "success",
        title: "店舗を更新しました",
      })
      router.push("/offices/list")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(e: any) {
      const errorMessage = e.message ?? "店舗更新に失敗しました";
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
                            {"フランチャイズ"}
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
