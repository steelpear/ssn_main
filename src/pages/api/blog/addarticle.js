import connectDB from '../../../middleware/mongodb'
import Article from '../../../models/Article'

const handler = async (req, res) => {
  const article = new Article(req.body)
  await article.save()
  res.json(article._id)
}

export default connectDB(handler)
