import connectDB from '../../../middleware/mongodb'
import Article from '../../../models/Article'

const handler = async (req, res) => {
  const filter = req.body
  const response = await Article.find(filter).sort({_id:-1})
  res.json(response)
}

export default connectDB(handler)
