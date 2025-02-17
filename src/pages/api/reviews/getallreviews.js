import connectDB from '../../../middleware/mongodb'
import Review from '../../../models/Review'

const handler = async (req, res) => {
  const response = await Review.find().sort({public: -1})
  res.json(response)
}

export default connectDB(handler)
