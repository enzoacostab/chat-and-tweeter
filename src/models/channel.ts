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
}, { 
  versionKey: false,
  toJSON: {
    transform: function (doc, ret) {
      ret._id = ret._id.toString()
    }
  }
})

const Channel = mongoose.models?.Channel || mongoose.model('Channel', channelSchema)

export default Channel;