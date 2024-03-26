import mongoose, { Schema } from "mongoose";
import User from "./user";
import Tweet from "./tweet";

const retweetSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: User
  },
  tweet: {
    type: Schema.Types.ObjectId,
    ref: Tweet
  }
})

const Retweet = mongoose.models?.Retweet || mongoose.model('Retweet', retweetSchema)

export default Retweet;