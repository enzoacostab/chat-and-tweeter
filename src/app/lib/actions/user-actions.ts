'use server'

import cloudinary from 'cloudinary'
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { connectDb } from '../db';
import User from '@/models/user';
import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation';
import { AuthError } from 'next-auth';
import { signIn } from '../../../auth';
import { getUser } from '../data';

cloudinary.v2.config({
  cloud_name: 'dpmlgj0rm',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const authenticate = async (prevState: string | undefined, formData: FormData) => {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          console.log('Invalid credentials.');
          return 'Invalid credentials.';
        default:
          console.log('Something went wrong.');
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

const UserSchema = z.object({
  photo: z.string().url().optional(),
  name: z.string().optional(),
  bio: z.string().optional(),
  phone: z.string().length(10).optional(),
  email: z.string().email('Invalid Email'),
  password: z.string().min(6).optional()
})

export const updateInfo = async (prevState: string | undefined, formData: FormData) => {
  await connectDb()

  const formDataObject = Object.fromEntries(
    Object.entries(
      Object.fromEntries(formData)
    ).filter(e => e[1] != '')
  )

  const validatedFields = UserSchema.safeParse(formDataObject)

  if (!validatedFields.success) {
    return 'Missing fields. Failed to update user'
  }

  const { data } = validatedFields

  try {
    const verifyEmail = await User.findOne({ email: data.email })
    const { _id } = await getUser()

    if (verifyEmail && verifyEmail._id != _id) {
      return 'Another account already exists with that email'
    }

    await User.findByIdAndUpdate(_id, data)
  } catch (error: any) {
    return 'Database error. Failed to update user'
  }

  revalidatePath('/')
  redirect('/')
}

export const uploadImage = async (formData: FormData) => {
  const file = formData.get('fileUpload') as File
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const response: string | undefined = await new Promise((resolve) => {
    cloudinary.v2.uploader.upload_stream((err, result) => {
      return resolve(result?.secure_url)
    }).end(buffer)
  })
  
  return response
}

const CreateUser = UserSchema.pick({ email: true }).extend({ password: z.string().min(6) })

export const createUser = async (prevState: string | undefined, formData: FormData) => {
  await connectDb()
  
  const validatedFields = CreateUser.safeParse(Object.fromEntries(formData))
  
  if (!validatedFields.success) {
    return 'Missing fields. Failed to create user'
  }

  const { data } = validatedFields

  try {
    const alreadyExists = await User.findOne({ email: data.email })
    
    if (alreadyExists) {
      return 'A user already exists with that email'
    }

    const passwordHash = await bcrypt.hash(data.password!, 10)
    data.password = passwordHash

    await User.create(data)
  } catch (error: any) {
    return 'Database error. Failed to create user';
  }

  redirect('/login')
}