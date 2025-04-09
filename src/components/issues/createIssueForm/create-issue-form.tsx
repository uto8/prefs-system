'use client';

import { useRouter } from 'next/navigation';
import { useForm, useWatch } from "react-hook-form";
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
import { createIssue } from '@/app/(authed)/issues/add/actions';
import SelectField, { OptionFields } from '@/components/ui/select-field';
import { useToast } from '@/hooks/use-toast';
import RadioField from '@/components/ui/radio-field';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import ApiGet from '@/lib/useApi/get';
import { Sale } from '@/types/Sale';
import { Reception } from '@/types/Reception';

const formSchema = z.object({
  currentAddress: z.string().optional(),
  issueCode: z.string().optional(),
  preferredDate: z.string().max(160, {
    message: "160文字以内で入力してください",
  }).optional(),
  type: z.string().nonempty("種別を選択してください"),
  contactContent: z.string().optional(),
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
  receptionId: z.string().optional(),
  isFranchise: z.string().optional(),
})

export default function CreateIssueForm({
  offices =[],
  sales=[],
  receptions=[],
  userOfficeId,
  userSaleId,
  receptionId
}: {
  offices: OptionFields,
  sales: OptionFields,
  receptions: OptionFields,
  userOfficeId: string | null,
  userSaleId: string | null,
  receptionId: string | null,
}) {
  const router = useRouter();
  const {toast} = useToast();
  const [disabled, setDisabled] = useState(false);
  const [saleOptions, setSaleOptions] = useState<OptionFields>(sales);
  const [receptionOptions, setReceptionOptions] = useState<OptionFields>(receptions);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      issueCode: "",
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
      officeId: userOfficeId ?? "",
      saleId: userSaleId ?? "",
      receptionId: "",
      isFranchise: "",
    },
  })

  const officeId = useWatch({ control: form.control, name: "officeId" });

  async function fetchData() {
    const sales = await ApiGet("/sales",{"officeId": officeId})
    const saleOption: OptionFields = sales.data.map((sale: Sale) => {return {value: sale.id, label: sale.name}})
    setSaleOptions(saleOption)
    const receptions = await ApiGet("/receptions",{"officeId": officeId})
    const receptionOption: OptionFields = receptions.data.map((reception: Reception) => {return {value: reception.id, label: reception.name}})
    setReceptionOptions(receptionOption)
  }
  useEffect(() => {
    fetchData()
  }, [officeId]);

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try{
      setDisabled(true)
      await createIssue({
        issueCode: data.issueCode ?? "",
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
        isFranchise: data.isFranchise === "1"? 1: 0,
        receptionId: data.receptionId? Number(data.receptionId): null
      })
      toast({
        variant: "success",
        title: "案件確定しました",
      })
      router.push('/issues/list')
    }catch(e) {
      setDisabled(false)
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
            name="issueCode"
            render={({field}) => (
              <FormItem>
                <FormLabel>
                  案件番号
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
                          <RadioField options={[{label: "自社", value: "0"}, {label: "別元請", value: "1"}]} onChange={field.onChange}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
              </FormItem>
            )}
          />
          {(() => {
            if(!userSaleId){
              return <>
                {!userOfficeId ?<FormField
                  control={form.control}
                  name="officeId"
                  render={({field}) => (
                    <FormItem>
                      <FormControl>
                        <SelectField options={offices} placeholder="店舗を選択してください" label='店舗' onChange={field.onChange}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />: null}
                <FormField
                  control={form.control}
                  name="saleId"
                  render={({field}) => (
                    <FormItem>
                      <FormControl>
                        <SelectField options={saleOptions} placeholder="担当者を選択してください" label='担当者' onChange={field.onChange}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="receptionId"
                  render={({field}) => (
                    <FormItem>
                      <FormControl>
                        <SelectField options={receptionOptions} value={receptionId??""} placeholder="受付を選択してください" label='受付担当者' onChange={field.onChange}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
          }})()}

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
            <Button disabled={disabled} type="submit">
              {disabled&&<Loader2 className="animate-spin" />}
              登録
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
