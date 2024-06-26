import mongoose, { Schema } from "mongoose";
import User from "./user";

const messageSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: User
  }
}, { 
  versionKey: false,
  toJSON: {
    transform: function (doc, ret) {
      ret._id = ret._id.toString()
    }
  }
})

const Message = mongoose.models?.Message || mongoose.model('Message', messageSchema)

export default Message;