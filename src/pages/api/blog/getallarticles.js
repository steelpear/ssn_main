import connectDB from '../../../middleware/mongodb'
import Article from '../../../models/Article'

const handler = async (req, res) => {
  const response = await Article.find().sort({_id:-1})
  res.json(response)
}

export default connectDB(handler)
