'use server'

import Channel from "@/models/channel";
import { z } from "zod";
import { connectDb } from "../db";
import { UserType } from '../definitions';
import { revalidatePath } from "next/cache";
import User from "@/models/user";
import { getUser } from "../data";

const CreateChannel = z.object({
  name: z.string().min(1),
  description: z.string().optional()
})

export const createChannel = async (prevState: string | undefined, formData: FormData) => {
  await connectDb()

  const validatedFields = CreateChannel.safeParse(Object.fromEntries(formData))

  if (!validatedFields.success) {
    return `Error creating channel: ${validatedFields.error.message}`
  }

  const { data } = validatedFields
  
  try {
    const alreadyExists = await Channel.findOne({ name: data.name })

    if (alreadyExists) {
      return 'There is already a channel with that name'
    }

    await Channel.create(data)
  } catch (error: any) {
    return `Database error: ${error.message}`
  }
  revalidatePath('/chat')
}

const AddMember = z.object({
  channelId: z.string()
})

export const addMember = async (prevState: string | undefined, formData: FormData) => {
  await connectDb()
  
  const validatedFields = AddMember.safeParse(Object.fromEntries(formData))

  if (!validatedFields.success) {
    return `Error adding member: ${validatedFields.error.message}`
  }

  const { _id: userId } = await getUser() 
  const { channelId } = validatedFields.data
  
  try {
    const channel = await Channel.findById(channelId).populate('members')
    const userExist = await User.findById(userId)    
    
    if (!userExist) {
      return "User doesn't exist"
    }
    
    const alreadyMember = channel.members.find((member: UserType) => member._id.toString() === userId)
    
    if (!alreadyMember) {
      channel.members.push(userId)
      await channel.save()
    }
  } catch (error: any) {
    return `Database error: ${error.message}`
  }

  revalidatePath('/chat')
}
