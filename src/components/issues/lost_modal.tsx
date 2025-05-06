'use client'

import React from 'react'
import { Dialog, DialogBackdrop, DialogPanel, } from '@headlessui/react'
import { Button } from '../ui/button'
import { Issue } from '@/types/Issue'
import ApiPut from '@/lib/useApi/put'
import { useAppDispatch } from '@/stores'
import { updateStatusValue } from '@/stores/reducers/issueReducer'

export default function LostModal({
  editModal: editModal,
  setEditModal: setEditModal,
  issue: issue,
}: {
  editModal: boolean,
  setEditModal:(value: boolean) => void,
  issue: Issue | null
}) {

  const dispatch = useAppDispatch();

  const handleLost = async ({status}: {
    status: string;
  }) => {
    if(!issue) return
    const result = confirm("本当に失注にしますか？")
    if(!result) return

    try{
      await ApiPut(`/issues/${issue.id}/status`, {
        status: status
      })
      dispatch(updateStatusValue({id:issue.id, status: status}));
      setEditModal(false)
    }catch(e){
      console.log("e", e)
      throw e
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
            <div className='block'>
              <Button onClick={() => {
                handleLost({status: "打ち合わせ前失注"})
              }} className='block w-full bg-indigo-600 font-bold mb-4'>打ち合わせ前失注</Button>
              <Button onClick={() => {
                handleLost({status: "打ち合わせ後失注"})
              }} className='block w-full font-bold mb-4'>打ち合わせ後失注</Button>
              <Button onClick={() => {
                setEditModal(false)
              }} className='block w-full bg-white font-bold' variant="outline">閉じる</Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
