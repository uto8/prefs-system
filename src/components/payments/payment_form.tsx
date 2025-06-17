"use client";

import { Dialog, DialogBackdrop, DialogPanel, } from '@headlessui/react'
import { zodResolver } from '@hookform/resolvers/zod';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from '@/components/ui/form';
import { Input } from '../ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { ja } from "date-fns/locale";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createPayment } from '@/app/(authed)/payment/list/actions';
import { useAppDispatch } from '@/stores';
import { addPayment } from '@/stores/reducers/paymentReducer';

const formSchema = z.object({
  type: z.string().nonempty("タイプは必須項目です"),
  paymentPlanValue: z.string().nonempty("入金予定額は必須項目です"),
  paymentPlanDate:  z.date({
    required_error: '必須',
    message: '入金予定日を入力してください',
  }),
  billingDate: z.date().optional()
})

export default function PaymentForm({open, setOpen}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {

  const [issueId, setIssueId] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "",
      paymentPlanValue: "",
    },
  })

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setIssueId(searchParams.get("issue_id"))
  }, [])

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try{
      const payment = await createPayment({
        issueId: Number(issueId) ?? 0,
        type: data.type,
        paymentPlanValue: Number(data.paymentPlanValue),
        paymentPlanDate:  format(data.paymentPlanDate, "yyyy-MM-dd"),
        description: "",
        billingDate: data.billingDate? format(data.billingDate, "yyyy-MM-dd"): null,
      })
      dispatch(addPayment({
        type: data.type,
        paymentPlanValue: data.paymentPlanValue,
        paymentPlanDate: format(data.paymentPlanDate, "yyyy-MM-dd"),
        description: "",
        id: payment.id,
        billingDate: data.billingDate?? null,
        paymentChecks: []
      }));
      setOpen(false)

    }catch(e) {
      throw e;
    }
  }

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
    <DialogBackdrop
      transition
      className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
    />

    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <DialogPanel
          transition
          className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-4"
            >
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
                        <SelectTrigger className="">
                          <SelectValue placeholder="選択してください" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="契約金">契約金</SelectItem>
                            <SelectItem value="着手金">着手金</SelectItem>
                            <SelectItem value="中間金1">中間金1</SelectItem>
                            <SelectItem value="中間金2">中間金2</SelectItem>
                            <SelectItem value="中間金3">中間金3</SelectItem>
                            <SelectItem value="完工金">完工金</SelectItem>
                            <SelectItem value="追加工事金">追加工事金</SelectItem>
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
                name="paymentPlanValue"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>
                    入金予定額
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="paymentPlanDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>入金予定日</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "yyyy-MM-dd")
                            ) : (
                              <span>日付を選択してください</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          locale={ja}
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="billingDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>請求日</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "yyyy-MM-dd")
                            ) : (
                              <span>日付を選択してください</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          locale={ja}
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mt-4">
                <Button className='w-full' type="submit">
                  登録
                </Button>
              </div>
            </form>
          </Form>
        </DialogPanel>
      </div>
    </div>
  </Dialog>
  )
}
