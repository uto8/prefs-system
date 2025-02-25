"use client"

import { Dialog, DialogBackdrop, DialogPanel, } from '@headlessui/react'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button'
import { ScrollArea } from "@/components/ui/scroll-area"
import { searchIssues } from './actions';
import { useAppDispatch } from '@/stores';
import { setValue } from '@/stores/reducers/issueReducer';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
  id: z.string().optional(),
  clientName: z.string().optional(),
  type: z.string().optional(),
  saleName: z.string().optional(),
  status: z.string().optional(),
})

export default function SearchModal({
  open: open,
  setOpen: setOpen
}:{
  open: boolean;
  setOpen: (value: boolean) => void
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    },
  })
  const dispatch = useAppDispatch();
  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try{
      const issues = await searchIssues({
        id: data.id ?? null,
        client_name: data.clientName ?? null,
        type: data.type ?? null,
        sale_name: data.saleName ?? null,
        status: data.status ?? null,
      })
      dispatch(setValue(issues));
    }catch(e) {
      throw e;
    }
    setOpen(false)
  }
  return <>
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
                  name="id"
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
                  name="saleName"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>
                      担当者名
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
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <div className="mt-4">
                  <Button type="submit" className='w-full'>
                    登録
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
