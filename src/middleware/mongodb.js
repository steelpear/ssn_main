import mongoose from 'mongoose'

const connectDB = handler => async (req, res) => {
  if (mongoose.connection.readyState) {return handler(req, res)}
    mongoose.connect("mongodb://ssnsport:2tqbv1BfUZGZ@185.151.240.199:31017/ssnsport?authSource=admin")
  return handler(req, res)
}

export default connectDB
