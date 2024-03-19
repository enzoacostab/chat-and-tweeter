import { z } from "zod"

export interface UserType {
  _id: string
  name?: string
  email: string
  photo?: string
  bio?: string
  phone?: string
  password: string
}

export interface ChannelType {
  _id: string,
  name: string
  description: string
  members: UserType[] 
  messages: MessageType[] 
}

export interface MessageType {
  _id: string,
  content: string,
  createdAt: Date,
  user: UserType
}

export interface Err {
  message: string
}