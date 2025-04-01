import connectDB from '../../../middleware/mongodb'
import Article from '../../../models/Article'

const handler = async (req, res) => {
  await Article.findByIdAndDelete(req.body.id)
  res.json({ state: true })
}

export default connectDB(handler)
