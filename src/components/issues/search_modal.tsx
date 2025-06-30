"use client"

import { Dialog, DialogBackdrop, DialogPanel, } from '@headlessui/react'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button'
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from 'react';
import ApiGet from '@/lib/useApi/get';
import SelectField, { OptionFields } from '../ui/select-field';
import { Office } from '@/types/Office';
import { Sale } from '@/types/Sale';
import { auth } from '@/auth';
import { useRouter, useSearchParams } from 'next/navigation';

const formSchema = z.object({
  issueCode: z.string().optional(),
  clientName: z.string().optional(),
  type: z.string().optional(),
  saleName: z.string().optional(),
  officeName: z.string().optional(),
  saleId: z.string().optional(),
  officeId: z.string().optional(),
  status: z.string().optional(),
  createdAtFrom: z.string().optional(),
  createdAtTo: z.string().optional(),
  clientNameKana: z.string().optional(),
  address: z.string().optional(),
  constructionSite: z.string().optional(),
})

export default function SearchModal({offset}: {offset: number}) {
  const searchParams = useSearchParams();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      issueCode: searchParams.get("issue_code") ?? undefined,
      clientName: searchParams.get("client_name") ?? undefined,
      type: searchParams.get("type") ?? undefined,
      saleName: searchParams.get("sale_name") ?? undefined,
      officeName: searchParams.get("office_name") ?? undefined,
      saleId: searchParams.get("sale_id") ?? undefined,
      officeId: searchParams.get("office_id") ?? undefined,
      status: searchParams.get("status") ?? undefined,
      createdAtFrom: searchParams.get("created_at_from") ?? undefined,
      createdAtTo: searchParams.get("created_at_to") ?? undefined,
      clientNameKana: searchParams.get("client_name_kana") ?? undefined,
      address: searchParams.get("address") ?? undefined,
      constructionSite: searchParams.get("construction_site") ?? undefined,
    },
  })
  const [offices, setOffices] = useState<OptionFields>([]);
  const [sales, setSales] = useState<OptionFields>([]);
  const [userOfficeId, setUserOfficeId] = useState<string | null>(null);
  const [userSaleId, setUserSaleId] = useState<string | null>(null);
  const officeId = form.watch("officeId");
  const saleId = form.watch("saleId");
  useEffect(() => {
    const fetchData = async () => {
      const res = await ApiGet("/offices");
      const officeOption: OptionFields = res.map((office: Office) => {return {value: office.id, label: office.name}})
      setOffices(officeOption)
      const session = await auth();

      const officeId: string | null = session?.user.officeId? String(session?.user.officeId): null
      setUserOfficeId(officeId)
      const saleId: string | null = session?.user.saleId? String(session?.user.saleId): null
      setUserSaleId(saleId)
    }
    fetchData()
  }, [])
  useEffect(() => {
    if (!officeId) return;
    const fetchData = async () => {
      const res = await ApiGet("/sales", {officeId: officeId});
      const saleOption: OptionFields = res.data.map((sale: Sale) => {return {value: sale.id, label: sale.name}})
      setSales(saleOption)
    }
    fetchData()
  }, [officeId])
  const [open, setOpen] = useState(false)
  const router = useRouter();

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try{
      let url = '/issues/list?';
      if (data.clientName) {
        url += `client_name=${data.clientName}&`;
      }
      if (data.type) {
        url += `type=${data.type}&`;
      }
      // if (saleName !== null) {
      //   url += `sale_name=${saleName}&`;
      // }
      // if (officeName !== null) {
      //   url += `office_name=${officeName}&`;
      // }
      if (data.status) {
        url += `status=${data.status}&`;
      }
      if (data.issueCode) {
        url += `issue_code=${data.issueCode}&`;
      }
      if (data.createdAtFrom) {
        url += `created_at_from=${data.createdAtFrom}&`;
      }
      if (data.createdAtTo) {
        url += `created_at_to=${data.createdAtTo}&`;
      }
      if(data.officeId){
        url += `office_id=${data.officeId}&`;
      }
      if(data.saleId){
        url += `sale_id=${data.saleId}&`;
      }
      if(data.clientNameKana){
        url += `client_name_kana=${data.clientNameKana}&`;
      }
      if(data.address){
        url += `address=${data.address}&`;
      }
      if(data.constructionSite){
        url += `construction_site=${data.constructionSite}&`;
      }
      url += `limit=20&offset=${offset}`

      router.push(url);

    }catch(e) {
      throw e;
    }
    setOpen(false)
  }
  return <>
  <button
            onClick={()=>setOpen(true)}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>

          </button>
  {/* 検索ポップアップ */}
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">

        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-xl sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <ScrollArea className="h-[70vh] w-full rounded-md">

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col gap-4">
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
                  name="clientName"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>
                      お客様名
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
                      お客様名カナ
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
                              <SelectField options={sales} value={saleId} placeholder="担当者を選択してください" label='担当者' onChange={field.onChange}/>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  }})()}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ステータス</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-[280px]">
                          <SelectValue placeholder="ステータスを選択してください" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>ステータス</SelectLabel>
                            <SelectItem value="お問い合わせ">お問い合わせ</SelectItem>
                            <SelectItem value="確定済">確定済</SelectItem>
                            <SelectItem value="入金予定確定済">入金予定確定済</SelectItem>
                            <SelectItem value="未入金">未入金</SelectItem>
                            <SelectItem value="入金済">入金済</SelectItem>
                            <SelectItem value="完了済">完了済</SelectItem>
                            <SelectItem value="打ち合わせ前失注">打ち合わせ前失注</SelectItem>
                            <SelectItem value="打ち合わせ後失注">打ち合わせ後失注</SelectItem>
                            <SelectItem value="未確定">未確定</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <div className='flex gap-4'>
                  <FormField
                    control={form.control}
                    name="createdAtFrom"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>
                        登録日
                        </FormLabel>
                        <FormControl>
                          <Input {...field} type="date" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="createdAtTo"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>〜登録日
                        </FormLabel>
                        <FormControl>
                          <Input {...field} type="date" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mt-4">
                  <Button type="submit" className='w-full'>
                    検索
                  </Button>
                </div>
              </form>
            </Form>
            </ScrollArea>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
    {/* 検索ポップアップ */}
  </>
}
