import mongoose from 'mongoose'

const handler = async (req, res) => {

  mongoose.connect(process.env.MONGODB_URL)

  if (mongoose.connection.readyState === 1) {
    const list = await mongoose.connection.listCollections()
    res.send(list)
  } else {res.send(false)}
}

export default handler
