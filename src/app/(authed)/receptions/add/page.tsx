'use server';

import TitleComponent from "@/components/layout/title";
import CreateReceptionForm from "@/components/receptions/createReceptionForm/create-reception-form";

export default async function Page() {
  return(
    <>
      <TitleComponent title="受付追加"/>
      <CreateReceptionForm/>
    </>
  )
}

