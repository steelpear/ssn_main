import connectDB from '../../../middleware/mongodb'
import Tour from '../../../models/Tour'

const handler = async (req, res) => {
  const tour = new Tour(req.body)
  await tour.save()
  res.json(tour._id)
}

export default connectDB(handler)
