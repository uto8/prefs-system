'use client';

import { useRouter } from 'next/navigation';
import { Controller, useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import TitleComponent from '@/components/layout/title';
import { createIssue } from '@/app/(authed)/issues/add/actions';
import { Office } from '@/types/Office';
import SelectField from '@/components/ui/select-field';
import { Sale } from '@/types/Sale';

const formSchema = z.object({
  currentAddress: z.string().optional(),
  preferredDate: z.string().max(160, {
    message: "160文字以内で入力してください",
  }).optional(),
  type: z.string().nonempty("種別を選択してください"),
  contactContent: z.string().max(160, {
    message: "160文字以内で入力してください",
  }).optional(),
  constructionSite: z.string().optional(),
  budget: z.string().max(160, {
    message: "160文字以内で入力してください",
  }).optional(),
  clientName: z.string().nonempty("顧客名は必須項目です"),
  clientNameKana: z.string().nonempty("顧客名カナは必須項目です"),
  clientEmail: z.string().optional(),
  clientPhoneNumber: z.string().optional(),
  officeId: z.string().nonempty("店舗を選択してください"),
  saleId: z.string().nonempty("担当者を選択してください"),
  isFranchise: z.boolean(),
})


export default function EditIssueForm({offices =[], sales=[]}: {offices: Office[], sales: Sale[]}) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentAddress: "",
      preferredDate: "",
      type: "",
      contactContent: "",
      constructionSite: "",
      budget: "",
      clientName: "",
      clientNameKana: "",
      clientEmail: "",
      clientPhoneNumber: "",
      saleId: "1",
      isFranchise: false,
    },
  })


  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try{
      console.log("==data", data)
      await createIssue({
        currentAddress: data.currentAddress ?? '',
        officeId: Number(data.officeId),
        preferredDate: data.preferredDate ?? '',
        type: data.type,
        contactContent: data.contactContent ?? '',
        budget: data.budget ?? '',
        saleId: Number(data.saleId),
        constructionSite: data.constructionSite ?? '',
        clientName: data.clientName,
        clientNameKana: data.clientNameKana,
        clientEmail: data.clientEmail ?? "",
        clientPhoneNumber: data.clientPhoneNumber ?? "",
        isFranchise: data.isFranchise?1:0
      })
      router.push('/issues/list')
    }catch(e) {
      throw e;
    }
  }


  return (
    <>
      <TitleComponent title="案件追加"/>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4">
            <FormField
            control={form.control}
            name="clientName"
            render={({field}) => (
              <FormItem>
                <FormLabel>
                  顧客名
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
            name="clientNameKana"
            render={({field}) => (
              <FormItem>
                <FormLabel>
                顧客名カナ
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
            name="currentAddress"
            render={({field}) => (
              <FormItem>
                <FormLabel>
                現住所
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
            name="constructionSite"
            render={({field}) => (
              <FormItem>
                <FormLabel>
                工事住所
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
            name="clientPhoneNumber"
            render={({field}) => (
              <FormItem>
                <FormLabel>
                顧客電話番号
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
            name="clientEmail"
            render={({field}) => (
              <FormItem>
                <FormLabel>
                顧客メールアドレス
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
            name="type"
            render={({field}) => (
              <FormItem>
                <FormLabel>
                タイプ
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="新築">新築</SelectItem>
                        <SelectItem value="リフォーム">リフォーム</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isFranchise"
            render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Sidebar</FormLabel>
              </div>
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
          <Controller name="officeId" control={form.control} render={({ field }) => (
            <>
              <SelectField
                  variant='vertical'
                  label='店舗'
                  placeholder='選択してください'
                  options={offices.map((office) => ({ value: office.id, label: office.name }))}
                  value={field.value ?? ''}
                  onChange={field.onChange}
              />
            </>
          )}>
          </Controller>
          <Controller name="saleId" control={form.control} render={({ field }) => (
            <>
              <SelectField
                  variant='vertical'
                  label='担当者'
                  placeholder='選択してください'
                  options={sales.map((sale) => ({ value: sale.id, label: sale.name }))}
                  value={field.value ?? ''}
                  onChange={field.onChange}
              />
            </>
          )}>
          </Controller>
          <FormField
            control={form.control}
            name="contactContent"
            render={({field}) => (
              <FormItem>
                <FormLabel>
                備考
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="備考を入力してください"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="budget"
            render={({field}) => (
              <FormItem>
                <FormLabel>
                予算
                </FormLabel>
                <FormControl>
                 <Textarea
                    placeholder="予算を入力してください"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="preferredDate"
            render={({field}) => (
              <FormItem>
                <FormLabel>
                工事予定日
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="工事予定日を入力してください"
                    className="resize-none"
                    {...field}
                  />
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
