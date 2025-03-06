import { auth } from "@/auth"
import TitleComponent from "@/components/layout/title"
import CreateOfficeForm from "@/components/office/createOfficeForm/create-office-form"
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth()
  if(!session?.user.companyId){
    redirect('/')
  }
  return (
    <>
      <TitleComponent title="店舗追加"/>
      <CreateOfficeForm companyId={session?.user.companyId}/>
    </>
  )
}
