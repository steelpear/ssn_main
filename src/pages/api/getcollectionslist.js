import mongoose from 'mongoose'

const handler = async (req, res) => {

  mongoose.connect("mongodb://ssnsport:2tqbv1BfUZGZ@185.151.240.199:31017/ssnsport?authSource=admin")

  if (mongoose.connection.readyState === 1) {
    const list = await mongoose.connection.listCollections()
    res.send(list)
  } else {res.send(false)}
}

export default handler
