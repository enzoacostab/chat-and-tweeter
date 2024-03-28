'use server'

import { z } from "zod";
import { connectDb } from "../db";
import { revalidatePath } from "next/cache";
import Comment from "@/models/comment";
import Tweet from "@/models/tweet";

const CreateComment = z.object({
  text: z.string().max(100),
  media: z.string().optional(),
  user: z.string(),
  tweetId: z.string()
})

export const createComment = async (prevState: string | undefined, formData: FormData) => {
  await connectDb()
  const validatedFields = CreateComment.safeParse(Object.fromEntries(formData))

  if (!validatedFields.success) {
    return `Error creating comment: ${validatedFields.error.message}`
  }

  const data = validatedFields.data
  
  try {
    const newComment = await Comment.create(data);
    await Tweet.findByIdAndUpdate(data.tweetId, { $push: { comments: newComment._id.toString() } })
  } catch (error: any) {
    return `Database error: ${error.message}`
  }
  
  revalidatePath('/tweet')
}

export const likeComment = async (commentId: string, userId: string) => {
  await connectDb()

  try {
    await Comment.updateOne({ _id: commentId }, { 
      $push: { likes: userId } 
    })
  } catch (error: any) {
    return `Database error: ${error.message}`
  }

  revalidatePath('/tweets')
}

export const dislikeComment = async (commentId: string, userId: string) => {
  await connectDb()

  try {
    await Comment.updateOne({ _id: commentId }, { 
      $pull: { likes: userId } 
    })
  } catch (error: any) {
    return `Database error: ${error.message}`
  }

  revalidatePath('/tweets')
}