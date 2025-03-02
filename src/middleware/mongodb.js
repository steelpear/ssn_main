import mongoose from 'mongoose'

const connectDB = handler => async (req, res) => {
  if (mongoose.connection.readyState) {return handler(req, res)}
    mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URL)
  return handler(req, res)
}

export default connectDB
