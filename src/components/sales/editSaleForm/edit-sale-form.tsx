'use client';

import { useParams, useRouter } from 'next/navigation';
import { useForm, useWatch } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from '@/components/ui/form';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { editSale } from '@/app/(authed)/sales/[id]/edit/actions';
import { Sale } from '@/types/Sale';
import SelectField, { OptionFields } from '@/components/ui/select-field';
import { useToast } from '@/hooks/use-toast';


const formSchema = z.object({
  name: z.string().nonempty("名前は必須項目です"),
  email: z.string().email().nonempty("メールアドレスは必須項目です"),
  phoneNumber: z.string().nonempty("電話番号は必須項目です"),
  officeId: z.string().nonempty("店舗を選択してください"),
})

export default function EditSaleForm({
  sale: sale,
  offices: offices,
  userSaleId: userSaleId
}: {
  sale: Sale;
  offices: OptionFields;
  userSaleId: string | null
}) {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const idString: string = id as string;
  const {toast} = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: sale.name,
      email: sale.email,
      phoneNumber: sale.phoneNumber,
      officeId: String(sale.officeId),
    },
  })

  const officeId = useWatch({ control: form.control, name: "officeId" });


  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try{
      await editSale({id: idString, sale:{
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        officeId: data.officeId
      }})
      toast({
        variant: "success",
        title: "営業を更新しました",
      })
      router.push('/sales/list')
    }catch(e) {
      throw e;
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
                営業名
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
            if(!userSaleId){
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
