"use client"

import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form"
import { Issue } from "@/types/Issue";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from '@/components/ui/form';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
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
import ApiPut from '@/lib/useApi/put';

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
})

export default function EditIssueForm({issue}: {issue: Issue}) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentAddress: issue.currentAddress,
      preferredDate: issue.preferredDate,
      type: issue.type,
      contactContent: issue.contactContent,
      constructionSite: issue.constructionSite,
      budget: issue.budget,
      clientName: issue.client.name,
      clientNameKana: issue.client.nameKana,
      clientEmail: issue.client.email,
      clientPhoneNumber: issue.client.phoneNumber,
    },
  })

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try{

      const body = {
        currentAddress: data.currentAddress ?? '',
        preferredDate: data.preferredDate ?? '',
        type: data.type,
        contactContent: data.contactContent ?? '',
        budget: data.budget ?? '',
        constructionSite: data.constructionSite ?? '',
        clientId: issue.clientId,
        clientName: data.clientName,
        clientNameKana: data.clientNameKana,
        clientEmail: data.clientEmail ?? '',
        clientPhoneNumber: data.clientPhoneNumber ?? '',
      }

      await ApiPut(`/issues/${issue.id}` ,body)

      router.push('/issues/list')
    }catch(e) {
      throw e;
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
            name="preferredDate"
            render={({field}) => (
              <FormItem>
                <FormLabel>
                工事予定日
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
            name="clientEmail"
            render={({field}) => (
              <FormItem>
                <FormLabel>
                顧客メールアドレス
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
