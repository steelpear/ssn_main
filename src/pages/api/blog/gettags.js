import connectDB from '../../../middleware/mongodb'
import Article from '../../../models/Article'

const handler = async (req, res) => {
  const response = await Article.find({public: true}, {tags: 1})
  res.json(response)
}

export default connectDB(handler)
