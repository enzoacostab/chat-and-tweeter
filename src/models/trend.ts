import mongoose, { Schema } from "mongoose";
import Tweet from "./tweet";

const trendSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  tweets: [{
    type: Schema.Types.ObjectId,
    ref: Tweet
  }]
}, { 
  versionKey: false,
  toJSON: {
    transform: function (doc, ret) {
      ret._id = ret._id.toString()
      ret.tweets = ret.tweets?.map((e: Schema.Types.ObjectId) => e.toString())
    }
  }
})

const Trend = mongoose.models?.Trend || mongoose.model('Trend', trendSchema)

export default Trend;