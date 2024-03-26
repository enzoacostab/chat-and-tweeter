import mongoose, { Schema } from "mongoose";
import User from "./user";

const commentSchema = new Schema({
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
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
  likesCount: {
    type: Number,
    default: 0
  },
})

const Comment = mongoose.models?.Comment || mongoose.model('Comment', commentSchema)

export default Comment;