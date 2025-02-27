'use server';

import TitleComponent from "@/components/layout/title";
import CreateSaleForm from "@/components/sales/createSaleForm/create-sale-form";

export default async function Page() {
  return(
    <>
      <TitleComponent title="営業追加"/>
      <CreateSaleForm/>
    </>
  )
}

