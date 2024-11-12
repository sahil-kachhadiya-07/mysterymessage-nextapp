'use client'

import { CrossIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '../Button'
import { Modal } from '../Modal'
import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/types/ApiResponseType'
import { toast } from 'react-toastify'
import { Message } from '@/model/User'
  interface MessageCardProps {
    message:Message;
    onMessageDelete:(messageId:any)=>void
  }
  const MessageCard:React.FC<MessageCardProps> = ({message,onMessageDelete}) => {
    const [open , setOpen] = useState(false)
  const handleDelete = async () =>{
     try {
      const response =  await axios.delete<ApiResponse>(`api/delete-message/${message._id}`)
      toast(response.data.message)
      onMessageDelete(message._id)
     } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast(axiosError.response?.data.message || 'Failed to delete message')
     }
     finally{
      setOpen(false)
     }
  }
  return (
    <div className='shadow-lg flex  flex-col max-w-[600px] w-full p-4'>
          <Modal forceHidden={open} handelDrawerClose={()=>setOpen(false)}>
            <h1 className='text-[24px] font-bold'>Delete Message</h1>
            <p className='text-[16px] py-4'>Are you sure to delete message?</p>
          <footer className='flex justify-end gap-4 '>
            <Button onClick={handleDelete}>delete</Button>
            <Button onClick={()=>setOpen(false)}>cancel</Button>
          </footer>
        </Modal>
       <div className='flex justify-between'>
       <h1 className='font-bold text-[24px]'>
            {message.content}
        </h1>
        <Button onClick={()=>setOpen(true)}><CrossIcon/></Button>
       </div>
        <div>
           {message.createdAt}
        </div>
    </div>
  )
}

export default MessageCard