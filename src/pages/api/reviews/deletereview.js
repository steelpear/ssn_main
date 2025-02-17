import connectDB from '../../../middleware/mongodb'
import Review from '../../../models/Review'

const handler = async (req, res) => {
  await Review.findByIdAndDelete(req.body.id)
  res.json({ state: true })
}

export default connectDB(handler)
