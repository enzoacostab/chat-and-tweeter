import mongoose, { Schema } from "mongoose";
import User from "./user";
import Tweet from "./tweet";

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
  likes: [{
    type: Schema.Types.ObjectId,
    ref: User
  }],
}, { 
  versionKey: false,
  toJSON: {
    transform: function (doc, ret) {
      ret._id = ret._id.toString()
    }
  }
})

delete mongoose.models?.Comment
const Comment = mongoose.models?.Comment || mongoose.model('Comment', commentSchema)

export default Comment;