'use server'

import { z } from "zod";
import { connectDb } from "../db";
import { revalidatePath } from "next/cache";
import Tweet from "@/models/tweet";

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
    await Tweet.create(data)
  } catch (error: any) {
    return `Database error: ${error.message}`
  }
  
  revalidatePath('/tweet')
}

export const likeTweet = async (userId: string, tweetId: string) => {
  await connectDb()

  try {
    const like = await Tweet.findOne({ likes: { $include: userId }, _id: tweetId });
    
    if (like) {
      await Like.deleteOne({ user: userId, tweet: tweetId})
    
    } else {
      await Like.create({ user: userId, tweet: tweetId })
    }
  } catch (error: any) {
    return `Database error: ${error.message}`
  }

  revalidatePath('/tweets')
}