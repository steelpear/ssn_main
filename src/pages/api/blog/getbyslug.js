import connectDB from '../../../middleware/mongodb'
import Article from '../../../models/Article'

const handler = async (req, res) => {
  const response = await Article.find({public: true, slug: req.body.slug})
  res.json(response)
}

export default connectDB(handler)
