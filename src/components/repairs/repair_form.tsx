import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, } from '@headlessui/react'
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Textarea } from '../ui/textarea';
import { createRepair } from '@/app/(authed)/payment/list/actions';
import { useAppDispatch } from '@/stores';
import { addRepair } from '@/stores/reducers/repairReducer';

const formSchema = z.object({
  supplier: z.string().nonempty("発注先は必須項目です"),
  repairPlanValue: z.string().nonempty("発注予定額は必須項目です"),
  withdrawalPlanDate:  z.date({
    required_error: '必須',
    message: '発注予定日を入力してください',
  }),
  type: z.string().nonempty("タイプは必須項目です"),
  description: z.string().nonempty("備考欄は必須項目です"),
})

export default function RepairForm({repairOpen, setRepairOpen}: {
  repairOpen: boolean;
  setRepairOpen: Dispatch<SetStateAction<boolean>>;
}) {

  const [issueId, setIssueId] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setIssueId(searchParams.get("issue_id"))
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      supplier: "",
      type: "",
      repairPlanValue: "",
      description: "",
    },
  })

  const dispatch = useAppDispatch();

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try{
      const repair = await createRepair({
        issueId: Number(issueId) ?? 0,
        supplier: data.supplier,
        repairPlanValue: Number(data.repairPlanValue),
        withdrawalPlanDate: format(data.withdrawalPlanDate, "yyyy-MM-dd"),
        type: data.type,
        description: data.description,
      })
      dispatch(addRepair({
        supplier: data.supplier,
        repairPlanValue: Number(data.repairPlanValue),
        withdrawalPlanDate: data.withdrawalPlanDate,
        type: data.type,
        description: data.description,
        repairChecks: [],
        id: repair.id
      }))

      setRepairOpen(false)
    }catch(e) {
      throw e;
    }
  }


  return (
    <Dialog open={repairOpen} onClose={setRepairOpen} className="relative z-10">
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
                  name="supplier"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>
                      発注先
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
                  name="repairPlanValue"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>
                      発注予定額
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
                  name="withdrawalPlanDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>工事予定日</FormLabel>
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
                  name="description"
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
                  name="type"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>
                      種別
                      </FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className="">
                            <SelectValue placeholder="選択してください" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="未処理">未処理</SelectItem>
                              <SelectItem value="打診中">打診中</SelectItem>
                              <SelectItem value="エビ待">エビ待</SelectItem>
                              <SelectItem value="依頼中">依頼中</SelectItem>
                              <SelectItem value="依頼済">依頼済</SelectItem>
                              <SelectItem value="発注済">発注済</SelectItem>
                              <SelectItem value="請求済">請求済</SelectItem>
                              <SelectItem value="済IV無">済IV無</SelectItem>
                              <SelectItem value="自社">自社</SelectItem>
                              <SelectItem value="現金">現金</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    onClick={() => setaddPaymentOpen(false)}
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    発注追加
                  </button>
                </div> */}
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
