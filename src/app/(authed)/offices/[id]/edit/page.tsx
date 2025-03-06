import { auth } from "@/auth"
import TitleComponent from "@/components/layout/title"
import EditOfficeForm from "@/components/office/editOfficeForm/edit-office-form";
import { redirect } from 'next/navigation';
import { getOffice } from "./actions";

export default async function Page(
  props: {
    params: Promise<{ id: string }>
  }
) {
  const params = await props.params;
  const { id } = params;
  const [session, office] = await Promise.all([
    auth(),
    getOffice(id)
  ])
  if(!session?.user.companyId){
    redirect('/')
  }
  return (
    <>
      <TitleComponent title="店舗編集"/>
      <EditOfficeForm office={office} companyId={session?.user.companyId}/>
    </>
  )
}
