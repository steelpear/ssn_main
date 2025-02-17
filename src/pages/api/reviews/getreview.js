import connectDB from '../../../middleware/mongodb'
import Review from '../../../models/Review'

const handler = async (req, res) => {
  const {id} = req.body
  res.json(await Review.findById(id))
}

export default connectDB(handler)
