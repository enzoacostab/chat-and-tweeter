import { auth } from "@/auth"
import { ChannelType, Err, MessageType, UserType } from "./definitions"
import Channel from "@/models/channel"
import { unstable_noStore as noStore } from "next/cache"
import { connectDb } from "./db"

export const getUser = async () => {
  const session = await auth()
  const user: UserType | undefined = session?.user as UserType
  
  return user
}

export const getChannels = async () => {
  noStore()
  try {
    await connectDb()
    const data = await Channel.find({}).select('name _id')
    const channels = data.map(channel => ({ ...channel._doc, _id: channel._id.toString() }))
    return channels as ChannelType[]
  } catch (error) {    
    console.error('Failed to fetch channels:', error);
  }
}

export const getChannel = async (id: string) => {
  noStore()
  
  try {
    await connectDb()
    const data = await Channel
      .findById(id)
      .populate([{
        path: 'members', 
        select: 'name photo _id'
      }])
      .select('-messages')

    const channel = {
      ...data._doc,
      members: data.members.map((e: any) => ({ ...e._doc }))
    }
    
    return channel as ChannelType
  } catch (error) {
    console.log(error);
  }
}

export const getMessages = async (id: string) => {
  noStore()
  
  try {
    await connectDb()
    const data = await Channel
      .findById(id)
      .select('name messages')
      .populate({
        path: 'messages',
        model: 'Message',
        populate: { 
          path: 'user', 
          model: 'User',  
          select: 'photo name' 
        },
      })

    const channel = {
      name: data.name,
      messages: data.messages.map((message: any) => ({ 
        ...message._doc,
        _id: message._id.toString(),
        user: {
          ...message.user._doc,
          _id: message.user._id.toString()
        }
      }))
    }

    return channel as ChannelType
  } catch (error) {
    console.log(error);
  }
}

export const attributes = ['photo', 'name', 'bio', 'phone', 'email']
