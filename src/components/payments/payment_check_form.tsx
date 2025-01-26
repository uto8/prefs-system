import React, { Dispatch, SetStateAction } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, } from '@headlessui/react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Textarea } from '../ui/textarea';
import { createPaymentCheck } from '@/app/(authed)/payment/list/actions';
import { useAppDispatch } from '@/stores';
import { addPaymentCheck } from '@/stores/reducers/paymentReducer';

const formSchema = z.object({
  paymentCheckValue: z.string().nonempty("入金予定額は必須項目です"),
  paymentCheckDate:  z.date({
    required_error: '必須',
    message: '入金予定日を入力してください',
  }),
  description: z.string().nonempty("備考欄は必須項目です"),
})

export default function PaymentCheckForm({depositOpen, setDepositOpen, paymentId}: {
  depositOpen: boolean;
  setDepositOpen: Dispatch<SetStateAction<boolean>>;
  paymentId: number;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paymentCheckValue: "",
      description: "",
    },
  })

  const dispatch = useAppDispatch();

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try{
      setDepositOpen(false)
      const paymentCheck = await createPaymentCheck({
        paymentId: paymentId,
        paymentCheckValue: Number(data.paymentCheckValue),
        paymentCheckDate: format(data.paymentCheckDate, "yyyy-MM-dd"),
        description: data.description
      })

      dispatch(addPaymentCheck({
        id: paymentCheck.id,
        paymentCheckValue: data.paymentCheckValue,
        paymentCheckDate: format(data.paymentCheckDate, "yyyy-MM-dd"),
        description: data.description,
        createdAt: '',
        paymentId: paymentId
      }))

    }catch(e) {
      throw e;
    }
  }

  return (
    <Dialog open={depositOpen} onClose={setDepositOpen} className="relative z-10">
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
            <div>
              <div className="relative mb-4">
                <label htmlFor="text" className="leading-7 text-sm text-gray-600">種別</label>
                <div>契約金</div>
              </div>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col gap-4"
              >
                <FormField
                  control={form.control}
                  name="paymentCheckValue"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>
                      入金確認額
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
                  name="paymentCheckDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>入金予定額</FormLabel>
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
