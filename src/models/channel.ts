import mongoose, { Schema } from "mongoose";
import Message from "./message";
import User from "./user";

const channelSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: User
  }],
  messages: [{
    type: Schema.Types.ObjectId,
    ref: Message
  }],
})

const Channel = mongoose.models?.Channel || mongoose.model('Channel', channelSchema)

export default Channel;