import mongoose, { Schema } from "mongoose";
import Tweet from "./tweet";
import User from "./user";

const saveSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: User
  },
  tweet: {
    type: Schema.Types.ObjectId,
    ref: Tweet
  }
})

const Save = mongoose.models?.Save || mongoose.model('Save', saveSchema)

export default Save;