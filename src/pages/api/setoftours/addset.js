import connectDB from '../../../middleware/mongodb'
import SetOfTour from '../../../models/SetOfTour'

const handler = async (req, res) => {
  const review = new SetOfTour(req.body)
  await review.save()
  res.json(review._id)
}

export default connectDB(handler)
