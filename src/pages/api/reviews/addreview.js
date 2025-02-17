import connectDB from '../../../middleware/mongodb'
import Review from '../../../models/Review'

const handler = async (req, res) => {
  const review = new Review(req.body)
  await review.save()
  res.json(review._id)
}

export default connectDB(handler)
