import mongoose, { Schema } from "mongoose";

const trendSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  tweetsCount: {
    type: Number,
    default: 1
  }
})

const Trend = mongoose.models?.Trend || mongoose.model('Trend', trendSchema)

export default Trend;