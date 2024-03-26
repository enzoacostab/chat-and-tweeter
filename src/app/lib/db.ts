import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDb() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

/*import mongoose from "mongoose";

export const connectDb: any = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!)
    console.log('connected to DB');
  } catch (error) {
    console.log(error);
  }
}*/
