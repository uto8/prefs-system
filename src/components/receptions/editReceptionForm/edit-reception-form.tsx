'use client';

import { useParams, useRouter } from 'next/navigation';
import { useForm, useWatch } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from '@/components/ui/form';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import SelectField, { OptionFields } from '@/components/ui/select-field';
import { useToast } from '@/hooks/use-toast';
import { Reception } from '@/types/Reception';
import { editReception } from '@/app/(authed)/receptions/[id]/edit/actions';


const formSchema = z.object({
  name: z.string().nonempty("名前は必須項目です"),
  email: z.string().email().nonempty("メールアドレスは必須項目です"),
  phoneNumber: z.string().optional(),
  officeId: z.string().nonempty("店舗を選択してください"),
})

export default function EditReceptionForm({
  reception: reception,
  offices: offices,
  userOfficeId: userOfficeId
}: {
  reception: Reception;
  offices: OptionFields;
  userOfficeId: string | null
}) {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const idString: string = id as string;
  const {toast} = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: reception.name,
      email: reception.email,
      phoneNumber: reception.phoneNumber,
      officeId: String(reception.officeId),
    },
  })

  const officeId = useWatch({ control: form.control, name: "officeId" });


  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try{
      await editReception({id: idString, reception:{
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber ?? "",
        officeId: data.officeId
      }})
      toast({
        variant: "success",
        title: "受付を更新しました",
      })
      router.push('/receptions/list')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(e: any) {
      const errorMessage = e.message ?? "受付更新に失敗しました";
      toast({
        variant: "destructive",
        title: `${errorMessage}`,
      })
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({field}) => (
              <FormItem>
                <FormLabel>
                受付名
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
            name="email"
            render={({field}) => (
              <FormItem>
                <FormLabel>
                メールアドレス
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
            name="phoneNumber"
            render={({field}) => (
              <FormItem>
                <FormLabel>
                電話番号
                </FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {(() => {
            if(!userOfficeId){
              return <FormField
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
            />
          }})()}
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
