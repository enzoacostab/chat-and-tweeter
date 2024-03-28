import mongoose, { Schema } from "mongoose";
import User from "./user";
import Comment from "./comment";

const tweetSchema = new Schema({
  text: {
    type: String,
    required: true,
    maxLength: 100
  },
  media: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: true
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
  canReply: {
    type: String,
    enum: ['everyone', 'only followed'],
    default: 'everyone'
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: Comment
  }],
  likes: [{
    type: Schema.Types.ObjectId,
    ref: User
  }],
  saved: [{
    type: Schema.Types.ObjectId,
    ref: User
  }],
  retweets: [{
    type: Schema.Types.ObjectId,
    ref: User
  }],
}, { 
  versionKey: false,
  toJSON: {
    transform: function (doc, ret) {
      ret._id = ret._id.toString(),
      ret.retweets = ret.retweets.map((e: Schema.Types.ObjectId) => e.toString())
      ret.likes = ret.likes.map((e: Schema.Types.ObjectId) => e.toString())
      ret.saved = ret.saved.map((e: Schema.Types.ObjectId) => e.toString())
    }
  } 
})

const Tweet = mongoose.models?.Tweet || mongoose.model('Tweet', tweetSchema)

export default Tweet;