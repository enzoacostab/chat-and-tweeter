'use server'

import { z } from "zod";
import { connectDb } from "../db";
import Message from "@/models/message";
import { pusherServer } from "../pusher";
import Channel from "@/models/channel";
import { getUser } from "../data";

const CreateMessage = z.object({
  channelId: z.string(),
  content: z.string().min(1),
})

export const createMessage = async (prevState: string | undefined, formData: FormData) => {
  await connectDb()

  const validatedFields = CreateMessage.safeParse({
    content: formData.get('content'),
    channelId: formData.get('channelId')
  })
  
  if (!validatedFields.success) {
    return `Error seending message: ${validatedFields.error.message}`
  }

  const user = await getUser()
  const { content, channelId } = validatedFields.data
  const message = {
    content,
    createdAt: new Date(),
    user: user._id
  }
  
  try {
    const savedMessage = await Message.create(message)

    await Channel.findByIdAndUpdate(channelId, {
      $push: { messages: savedMessage._id.toString() }
    })
    
    await pusherServer.trigger(channelId, 'new-message', { ...savedMessage._doc, user })
  } catch (error: any) {
    console.log(error);
    return `Database error: ${error.message}`
  }
}