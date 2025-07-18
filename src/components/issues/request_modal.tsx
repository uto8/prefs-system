'use client'

import React, { useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, } from '@headlessui/react'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import ApiPost from '@/lib/useApi/post'
import SelectField, { OptionFields } from '../ui/select-field'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { useToast } from '@/hooks/use-toast'
import ApiGet from '@/lib/useApi/get';
import { Sale } from '@/types/Sale';

const formSchema = z.object({
  saleId: z.string().optional(),
  officeId: z.string().nonempty("店舗は必須です"),
})

export default function RequestModal({
  editModal: editModal,
  setEditModal: setEditModal,
  issueId: issueId,
  offices,
}: {
  editModal: boolean,
  setEditModal:(value: boolean) => void,
  issueId: number,
  offices: OptionFields
}) {

  const [saleOptions, setSaleOptions] = useState<OptionFields>([]);
  const {toast} = useToast();

  // const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      saleId: "",
      officeId: "",
    },
  })

  const officeId = useWatch({ control: form.control, name: "officeId" });

  async function fetchData() {
    if(officeId){
      const sales = await ApiGet("/sales",{"officeId": officeId})
      const saleOption: OptionFields = sales.data.map((sale: Sale) => {return {value: sale.id, label: sale.name}})
      setSaleOptions(saleOption)
      // const receptions = await ApiGet("/receptions",{"officeId": officeId})
      // const receptionOption: OptionFields = receptions.data.map((reception: Reception) => {return {value: reception.id, label: reception.name}})
      // setReceptionOptions(receptionOption)
    }
  }
  useEffect(() => {
    fetchData()
  }, [officeId]);

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try{
      await ApiPost(`/issue_requests`, {
        issue_id: issueId,
        office_id: data.officeId,
        sale_id: data.saleId !== ""? data.saleId: null,
      })
      toast({
        title: "リクエストを送信しました",
        description: "リクエストが正常に送信されました。",
        variant: "success"
      })
    }catch(e){
      toast({
        title: "リクエストの送信に失敗しました",
        description: "リクエストの送信に失敗しました。もう一度お試しください。",
        variant: "destructive"
      })
    }
  }

  return (
    <Dialog open={editModal} onClose={setEditModal} className="relative z-10">
      <DialogBackdrop
        transition
        className="w-full fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className='block'>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="flex flex-col gap-4">
                    <FormField
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
                    />
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
                    <div className="mt-4">
                      <Button type="submit" className='w-full'>
                        リクエストを送信
                      </Button>
                    </div>
                </form>
              </Form>
              <Button onClick={() => {
                setEditModal(false)
              }} className='block w-full bg-white font-bold mt-4' variant="outline">閉じる</Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
