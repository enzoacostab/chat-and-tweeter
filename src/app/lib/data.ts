import { auth } from "@/auth"
import { AuthUser, ChannelType, TweetType, UserType } from "./definitions"
import Channel from "@/models/channel"
import { unstable_noStore as noStore } from "next/cache"
import { connectDb } from "./db"
import Tweet from "@/models/tweet"
import User from "@/models/user"
import Comment from "@/models/comment"

export const getUser = async () => {
  const session = await auth()
  const user: AuthUser | undefined = session?.user as AuthUser
  return user
}

export const getUserById = async (id: string) => {
  const data = await User.findById(id)
  const user = data.toJSON()
  return user as UserType
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

export const getUserTweets = async (userId: string) => {
  noStore()
  
  try {
    await connectDb()
    const data = await Tweet.find({ user: { _id: userId} })
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

export const getUserReplies = async (userId: string) => {
  noStore()
  
  try {
    await connectDb()
    const comments = await Comment.find({ user: userId }).select('tweetId')
    const tweetsIds = comments.map((e: any) => e.tweetId.toString())
    const data = await Tweet.find({ _id: { $in: tweetsIds }})
      .populate('user', 'name photo _id')
      .populate({ 
        path: 'comments',
        model: 'Comment',
        populate: {
          path: 'user',
          select: 'name photo _id'
        },
      })
    const tweets = data.map((tweet: any) => tweet.toJSON())
    return tweets as TweetType[]
  } catch (error) {
    console.log(error);
  }
}

export const getUserMedia = async (userId: string) => {
  noStore()
  
  try {
    await connectDb()
    const data = await Tweet.find({ media: { $ne: undefined }})
      .populate('user', 'name photo _id')
      .populate({ 
        path: 'comments',
        model: 'Comment',
        populate: {
          path: 'user',
          select: 'name photo _id'
        },
      })
    const tweets = data.map((tweet: any) => tweet.toJSON())
    return tweets as TweetType[]
  } catch (error) {
    console.log(error);
  }
}

export const getUserLikes = async (userId: string) => {
  noStore()
  
  try {
    await connectDb()
    const data = await Tweet.find({ likes: userId })
      .populate('user', 'name photo _id')
      .populate({ 
        path: 'comments',
        model: 'Comment',
        populate: {
          path: 'user',
          select: 'name photo _id'
        },
      })
    const tweets = data.map((tweet: any) => tweet.toJSON())
    return tweets as TweetType[]
  } catch (error) {
    console.log(error);
  }
}

export const attributes = ['photo', 'name', 'bio', 'phone', 'email']
