'use server'

import { z } from "zod";
import { connectDb } from "../db";
import { revalidatePath } from "next/cache";
import Tweet from "@/models/tweet";
import Trend from "@/models/trend";

const CreateTweet = z.object({
  text: z.string().max(100),
  media: z.string().optional(),
  canReply: z.enum(['everyone', 'only followed']),
  user: z.string()
})

export const createTweet = async (prevState: string | undefined, formData: FormData) => {
  await connectDb()
  const validatedFields = CreateTweet.safeParse(Object.fromEntries(formData))

  if (!validatedFields.success) {
    return `Error creating tweet: ${validatedFields.error.message}`
  }

  const { data } = validatedFields
  
  try {
    const hashtag = data.text.split(' ').find(e => e.startsWith('#'))
    const tweet = await Tweet.create(data)

    if (hashtag && hashtag.length > 1) {
      await Trend.findOneAndUpdate({ 
        name: hashtag 
      }, { 
        $push: { tweets: tweet._id } 
      }, { 
        upsert: true
      })
    }
  } catch (error: any) {
    return `Database error: ${error.message}`
  }
  
  revalidatePath('/tweet')
}

export const like = async (tweetId: string, userId: string) => {
  await connectDb()

  try {
    await Tweet.updateOne({ _id: tweetId }, { 
      $push: { likes: userId } 
    })
  } catch (error: any) {
    return `Database error: ${error.message}`
  }

  revalidatePath('/tweets')
}

export const retweet = async (tweetId: string, userId: string) => {
  await connectDb()

  try {
    await Tweet.updateOne({ _id: tweetId }, { 
      $push: { retweets: userId } 
    })
  } catch (error: any) {
    return `Database error: ${error.message}`
  }

  revalidatePath('/tweets')
}

export const save = async (tweetId: string, userId: string) => {
  await connectDb()
  
  try {
    await Tweet.updateOne({ _id: tweetId }, { 
      $push: { saved: userId } 
    })
  } catch (error: any) {
    return `Database error: ${error.message}`
  }

  revalidatePath('/tweets')
}

export const dislike = async (tweetId: string, userId: string) => {
  await connectDb()

  try {
    await Tweet.updateOne({ _id: tweetId }, { 
      $pull: { likes: userId } 
    })
  } catch (error: any) {
    return `Database error: ${error.message}`
  }

  revalidatePath('/tweets')
}

export const unretweet = async (tweetId: string, userId: string) => {
  await connectDb()

  try {
    await Tweet.updateOne({ _id: tweetId }, { 
      $pull: { retweets: userId } 
    })
  } catch (error: any) {
    return `Database error: ${error.message}`
  }

  revalidatePath('/tweets')
}

export const unsave = async (tweetId: string, userId: string) => {
  await connectDb()
  
  try {
    await Tweet.updateOne({ _id: tweetId }, { 
      $pull: { saved: userId } 
    })
  } catch (error: any) {
    return `Database error: ${error.message}`
  }

  revalidatePath('/tweets')
}