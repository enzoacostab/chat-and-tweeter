import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minLength: 6,
  },
  photo:{
    type: String,
  },
  name: {
    type: String,
  },
  bio: {
    type: String,
  },
  phone: {
    type: String,
  },
  followers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  following: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  header: {
    type: String
  }
}, { 
  versionKey: false,
  toJSON: {
    transform: function (doc, ret) {
      ret._id = ret._id.toString()
      ret.followers = ret.followers?.map((e: Schema.Types.ObjectId) => e.toString())
      ret.following = ret.following?.map((e: Schema.Types.ObjectId) => e.toString())
    }
  }
})

const User = mongoose.models?.User || mongoose.model('User', userSchema)

export default User;