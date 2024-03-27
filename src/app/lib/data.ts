import { auth } from "@/auth"
import { ChannelType, TweetType, UserType } from "./definitions"
import Channel from "@/models/channel"
import { unstable_noStore as noStore } from "next/cache"
import { connectDb } from "./db"
import Tweet from "@/models/tweet"
import Comment from "@/models/comment"

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
    const channels = data.map((channel: any) => channel.toJSON())
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
    const channel = data.toJSON()
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

    const channel = data.toJSON()
    return channel as ChannelType
  } catch (error) {
    console.log(error);
  }
}

export const getTweets = async (ids: string[] | undefined) => {
  noStore()
  
  try {
    await connectDb()
    const data = await Tweet.find({})
      .populate('user', 'name photo _id')
      .populate({ 
        path: 'comments',
        model: 'Comment',
        populate: {
          path: 'user',
          select: 'name photo'
        },
        
      })
    const tweets = data.map((tweet: any) => tweet.toJSON())
    return tweets as TweetType[]
  } catch (error) {
    console.log(error);
  }
}

export const attributes = ['photo', 'name', 'bio', 'phone', 'email']
