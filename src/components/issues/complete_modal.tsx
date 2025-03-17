'use client'

import React, { useEffect } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, } from '@headlessui/react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '../ui/button'
import { ja } from "date-fns/locale";
import { Issue } from '@/types/Issue'
import ApiPut from '@/lib/useApi/put'
import { useToast } from '@/hooks/use-toast'


const formSchema = z.object({
  finishDate: z.date({
    required_error: '必須',
    message: '契約完了日を入力してください',
  }),
})

export default function CompleteModal({
  editModal: editModal,
  setEditModal: setEditModal,
  issue: issue,
}: {
  editModal: boolean,
  setEditModal:(value: boolean) => void,
  issue: Issue | null
}) {

  const {toast} = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    },
  })

  useEffect(() => {
    if (issue?.issueConfirmed.id) {
      form.reset({
        finishDate: issue.issueConfirmed.finishDate ? new Date(issue.issueConfirmed.finishDate) : undefined,
      });
    }
  },[issue])

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    if(!issue)return
    try{
      await ApiPut(`/issue_confirmed/${issue.issueConfirmed.id}/complete`, {
        finishDate: format(data.finishDate, "yyyy-MM-dd")
      })
      toast({
        variant: "success",
        title: "契約を完了しました",
      })
      setEditModal(false)
    }catch(e) {
      toast({
        variant: "destructive",
        title: `契約の完了に失敗しました`,
      })
      throw e;
    }
  }

  return (
    <Dialog open={editModal} onClose={setEditModal} className="relative z-10">
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
                className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="finishDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>契約完了日</FormLabel>
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
                  <Button type="submit">
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
