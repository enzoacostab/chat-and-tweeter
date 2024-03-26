export interface UserType {
  _id: string
  name?: string
  email: string
  photo?: string
  bio?: string
  phone?: string
  password: string
  followers: UserType[]
  following: UserType[]
  header: string
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

export interface TrendType {
  _id: string,
  name: string,
  tweetsCount: number,
}

export interface TweetType {
  _id: string,
  text: string
  media?: string
  user: UserType
  createdAt: Date
  canReply: 'everyone' | 'only followed'
  comments?: CommentType[]
  likes: UserType[]
  retweets: UserType[]
  saved: UserType[]
}

export interface CommentType {
  _id: string,
  text: string
  media?: string
  user: UserType
  createdAt: Date
  likesCount: number
}