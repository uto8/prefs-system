'use client'

import { Meeting } from '@/types/Meeting'
import { format } from 'date-fns'
import ApiDelete from '@/lib/useApi/delete'
import { useAppDispatch } from '@/stores'
import { updateDatetimeValue } from '@/stores/reducers/issueReducer'
import { removeMeetingValue } from '@/stores/reducers/meetingReducer'

export default function MeetingHistories({meetings}:{meetings: Meeting[]}) {

  const dispatch = useAppDispatch();

  const handleDelete = async (id: number) => {
    const result = window.confirm('本当に削除しますか？');
    if(!result) return
    try{
      await ApiDelete(`/meetings/${id}`)
      dispatch(updateDatetimeValue({id: id, datetime: ""}));
      dispatch(removeMeetingValue(id))
    }catch(e){
      throw e
    }
  }

  return (
    <>
      <ul role="list" className="space-y-6">
        {meetings.map((meeting) => (
          <li key={meeting.id} className="relative flex gap-x-4">
            <div
              className="absolute left-0 top-0 flex w-6 justify-center"
            >
              <div className="w-px bg-gray-200" />
            </div>
            <>
              <div className="relative flex size-6 flex-none items-center justify-center bg-white">
                <div className="size-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
              </div>
              <p className="flex-auto py-0.5 text-xs/5 text-gray-500">
                <span className="font-medium text-gray-900">{`${format(meeting.datetime, "MM月dd日 HH時mm分")}`}</span>
              </p>
              <button onClick={()=>{handleDelete(meeting.id)}} className="flex-none py-0.5 text-xs/5 text-gray-500">
                削除
              </button>
            </>
          </li>
        ))}
      </ul>

    </>
  )
}
