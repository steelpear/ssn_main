import connectDB from '../../../middleware/mongodb'
import Review from '../../../models/Review'

const handler = async (req, res) => {
  const response = await Review.find({public: true}).sort({public: -1})
  res.json(response)
}

export default connectDB(handler)
