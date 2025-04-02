'use client';

import { useRouter } from 'next/navigation';
import { useForm, useWatch } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from "@/components/ui/textarea"
import SelectField, { OptionFields } from '@/components/ui/select-field';
import { Issue } from '@/types/Issue';
import ApiPut from '@/lib/useApi/put';
import { useToast } from '@/hooks/use-toast';
import RadioField from '@/components/ui/radio-field';
import ApiGet from '@/lib/useApi/get';
import { useEffect, useState } from 'react';
import { Sale } from '@/types/Sale';
import { Reception } from '@/types/Reception';

const formSchema = z.object({
  currentAddress: z.string().optional(),
  issueCode: z.string().optional(),
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
  receptionId: z.string().optional(),
  isFranchise: z.string().optional(),
})


export default function EditIssueForm({
  offices =[],
  sales=[],
  receptions=[],
  issue,
  userOfficeId,
  userSaleId
}: {
  offices: OptionFields,
  sales: OptionFields,
  receptions: OptionFields,
  issue: Issue,
  userOfficeId: string | null,
  userSaleId: string | null,
}) {
  const router = useRouter();
  const {toast} = useToast();

  const [saleOptions, setSaleOptions] = useState<OptionFields>(sales);
  const [receptionOptions, setReceptionOptions] = useState<OptionFields>(receptions);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentAddress: issue.currentAddress,
      issueCode: issue.issueCode,
      preferredDate: issue.preferredDate,
      type: issue.type,
      contactContent: issue.contactContent,
      constructionSite: issue.constructionSite,
      budget: issue.budget,
      clientName: issue.client.name,
      clientNameKana: issue.client.nameKana,
      clientEmail: issue.client.email,
      clientPhoneNumber: issue.client.phoneNumber,
      officeId: String(issue.officeId),
      saleId: String(issue.sale.id),
      receptionId: issue.reception? String(issue.reception.id): undefined,
      isFranchise: issue.isFranchise ? "1": "0",
    },
  })

  const officeId = useWatch({ control: form.control, name: "officeId" });
  const saleId = useWatch({ control: form.control, name: "saleId" });
  const receptionId = useWatch({ control: form.control, name: "receptionId" });
  const type = useWatch({ control: form.control, name: "type" });

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
        officeId: data.officeId,
        saleId: data.saleId,
        isFranchise: data.isFranchise === "1"? 1: 0,
        issueCode: data.issueCode,
        receptionId: data.receptionId? Number(data.receptionId) ?? null: null
      }

      await ApiPut(`/issues/${issue.id}` ,body)
      toast({
        variant: "success",
        title: "案件更新しました",
      })
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
                  <SelectField options={[{label: "新築", value:"新築"},{label: "リフォーム", value:"リフォーム"}]} value={type} placeholder="選択してください" onChange={field.onChange}/>
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
                          <RadioField value={issue.isFranchise?"1": "0"} options={[{label: "自社", value: "0"}, {label: "別元請", value: "1"}]} onChange={field.onChange}/>
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
                        <SelectField options={offices} value={officeId} placeholder="店舗を選択してください" label='店舗' onChange={field.onChange}/>
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
                        <SelectField options={saleOptions} value={saleId} placeholder="担当者を選択してください" label='担当者' onChange={field.onChange}/>
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
                        <SelectField options={receptionOptions} value={receptionId} placeholder="受付を選択してください" label='受付' onChange={field.onChange}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                </>
                }}
          )()}
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
