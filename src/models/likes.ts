import mongoose, { Schema } from "mongoose";
import User from "./user";
import Tweet from "./tweet";

const likeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: User
  },
  tweet: {
    type: Schema.Types.ObjectId,
    ref: Tweet
  }
})

const Like = mongoose.models?.Like || mongoose.model('Like', likeSchema)

export default Like;